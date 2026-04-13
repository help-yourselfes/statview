package main

import (
	"context"
	"fmt"
	"time"

	"github.com/shirou/gopsutil/v4/cpu"
	"github.com/shirou/gopsutil/v4/mem"
	"github.com/wailsapp/wails/v2/pkg/runtime"
)

type Stats struct {
	CPU float64 `json:"cpu"`
	RAM float64 `json:"ram"`
}

// App struct
type App struct {
	ctx        context.Context
	state      Stats
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

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

func (a *App) GetStats() Stats {
	v, _ := mem.VirtualMemory()
	c, _ := cpu.Percent(0, false)
	return Stats{
		CPU: c[0],
		RAM: v.UsedPercent,
	}
}
