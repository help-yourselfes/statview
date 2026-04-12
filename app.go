package main

import (
	"context"
	"fmt"

	"github.com/shirou/gopsutil/v4/cpu"
	"github.com/shirou/gopsutil/v4/mem"
)

type Stats struct {
	CPU float64 `json:"cpu"`
	RAM float64 `json:"ram"`
}

// App struct
type App struct {
	ctx   context.Context
	state Stats
}

// NewApp creates a new App application struct
func NewApp() *App {

	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
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
