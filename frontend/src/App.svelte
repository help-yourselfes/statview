<script lang="ts">
  import logo from "./assets/images/logo-universal.png";
  import { onMount } from "svelte";
  import { cpuHistory, ramHistory, startMonitoring } from "./statStore";
  const cpu = cpuHistory;
  const ram = ramHistory;

  const cpuValue = derived(cpu, (cpu) => cpu[0]);

  import Graph from "./lib/Graph.svelte";
  import { derived } from "svelte/store";
  import { activeGraph, activeColor } from "./appStore";
  import StatBlock from "./lib/StatBlock.svelte";
  import AppOverlay from "./lib/AppOverlay.svelte";

  onMount(() => connectMonitor());
</script>

<main>
  <div class="graph">
    <div class="graph__line-container hor">
      <div class="graph__line"></div>
      <div class="graph__line"></div>
      <div class="graph__line"></div>
    </div>
    <div class="graph__line-container ver">
      <div class="graph__line"></div>
      <div class="graph__line"></div>
    </div>
    <div class="graph__svg">
      <Graph history={$activeGraph} color={$activeColor} />
    </div>
  </div>
  <div class="stats">
    <StatBlock type="cpu" value={$cpuValue} />
    <StatBlock type="ram" value={$ram.at(-1)} />
  </div>
  <div class="overlay">
    <AppOverlay />
  </div>
</main>

<style>
  .overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
  }

  .graph {
    top: 0;
    left: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 30%;
  }

  .graph__line-container,
  .graph__svg {
    position: absolute;
    height: 100%;
    width: 100%;
  }

  .graph__line-container {
    display: flex;
    justify-content: space-evenly;
    opacity: 0.2;
  }

  .graph__line {
    background-color: var(--current);
  }

  .hor .graph__line {
    width: 4px;
    height: 100%;
  }

  .ver .graph__line {
    width: 100%;
    height: 4px;
  }
</style>
