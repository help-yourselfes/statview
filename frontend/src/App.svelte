<script lang="ts">
  import logo from "./assets/images/logo-universal.png";
  import { onMount } from "svelte";
  import { cpuHistory, ramHistory, startMonitoring } from "./statStore";
  const cpu = cpuHistory;
  const ram = ramHistory;

  const cpuValue = derived(cpu, (cpu) => cpu[0]);

  import Graph from "./lib/Graph.svelte";
  import { derived } from "svelte/store";
  import { activeGraph, activeGraphType, activeColor } from "./appStore";
  import StatBlock from "./lib/StatBlock.svelte";

  
  onMount(() => startMonitoring(1000));
</script>

<main>
  <div class="graph">
    {$activeGraphType}
    <Graph history={$activeGraph} color={$activeColor}/>
  </div>
  <div class="stats">
    <StatBlock type="cpu" value={$cpuValue} />
    <StatBlock type="ram" value={$ram.at(-1)} />
  </div>
</main>

<style>
  .graph {
    top: 0; 
    left: 0;
    position: absolute;
    width: 100%;
    height: 100%;
  }
</style>
