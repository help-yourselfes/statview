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

type InfoCPU struct {
	Name  string  `json:"name"`
	Cores int32   `json:"cores"`
	Mhz   float64 `json:"mhz"`
}

type Info struct {
	CPU    InfoCPU
	MaxRAM float64 `json:"ram-max"`
}

// App struct
type App struct {
	ctx    context.Context
	info   *Info
	ticker *time.Ticker
}

// NewApp creates a new App application struct
func NewApp() *App {

	return &App{
		ticker: time.NewTicker(1000 * time.Millisecond),
	}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx

	go func() {
		for range a.ticker.C {
			stats := a.GetStats()
			runtime.EventsEmit(a.ctx, "monitor:update-stats", stats)
		}
	}()
}

func (a *App) Exit() {
	a.ticker.Stop()
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

func (a *App) GetInfo() *Info {
	cpuInfo, err := cpu.Info()
	if err != nil {
		a.Error(err)
	}
	memInfo, err := mem.VirtualMemory()
	if err != nil {
		a.Error(err)
	}

	a.info = &Info{
		CPU: InfoCPU{
			Name:  cpuInfo[0].ModelName,
			Cores: cpuInfo[0].Cores,
			Mhz:   cpuInfo[0].Mhz,
		},
		MaxRAM: float64(memInfo.Total) / GB,
	}
	return a.info
}

func (a *App) Error(err error) {
	runtime.LogErrorf(a.ctx, "%s", err)
	runtime.EventsEmit(a.ctx, "app:error", err)
}
