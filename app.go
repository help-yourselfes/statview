package main

import (
	"context"
	"time"

	"github.com/shirou/gopsutil/v4/cpu"
	"github.com/shirou/gopsutil/v4/disk"
	"github.com/shirou/gopsutil/v4/mem"
	"github.com/wailsapp/wails/v2/pkg/runtime"
)

const GB = 1_073_741_824

type Stats struct {
	CPU  float64 `json:"cpu"`  // in %
	RAM  float64 `json:"ram"`  // in GB
	Disk float64 `json:"disk"` // in %
}

type Info struct {
	CPU    cpu.InfoStat
	MaxRAM float64 `json:"ram-max"`
}

// App struct
type App struct {
	ctx        context.Context
	info       *Info
	ticker     *time.Ticker
	tickerDone chan bool
}

// NewApp creates a new App application struct
func NewApp() *App {

	return &App{
		ticker:     time.NewTicker(1000 * time.Millisecond),
		tickerDone: make(chan bool),
	}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
	a.UpdateInfo()

	go func() {
		for range a.ticker.C {
			stats := a.GetStats()
			runtime.EventsEmit(a.ctx, "monitor:update-stats", stats)
		}
	}()
}

func (a *App) Exit() {
	a.ticker.Stop()
	a.tickerDone <- true
	runtime.Quit(a.ctx)
}

func (a *App) GetStats() Stats {
	v, _ := mem.VirtualMemory()
	c, _ := cpu.Percent(0, false)
	d, _ := disk.Usage("/")

	return Stats{
		CPU:  c[0],
		RAM:  float64(v.Used) / GB,
		Disk: d.UsedPercent,
	}
}

func (a *App) UpdateInfo() {
	cpuInfo, err := cpu.Info()
	if err != nil {
		a.Error(err)
		return
	}

	memInfo, err := mem.VirtualMemory()
	if err != nil {
		a.Error(err)
		return
	}

	a.info = &Info{
		CPU:    cpuInfo[0],
		MaxRAM: float64(memInfo.Total) / GB,
	}
}

func (a *App) GetInfo() *Info {
	if a.info == nil {
		a.UpdateInfo()
	}
	return a.info
}

func (a *App) Error(err error) {
	runtime.EventsEmit(a.ctx, "app:error", err)
}
