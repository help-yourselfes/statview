<script lang="ts">
  import logo from "./assets/images/logo-universal.png";
  import { onMount } from "svelte";
  import { cpuHistory, ramHistory, startMonitoring } from "./statStore";
  const cpu = cpuHistory.array;
  const ram = ramHistory.array;

  const cpuValue = derived(cpu, (cpu) => cpu[0]);

  import Graph from "./lib/Graph.svelte";
  import { derived } from "svelte/store";
  import { activeGraph } from "./appStore";
  import StatBlock from "./lib/StatBlock.svelte";

  onMount(() => startMonitoring(1000));
</script>

<main>
  <div class="stats">
    <StatBlock type="cpu" value={$cpuValue}/>
    <StatBlock type="ram" value={$ram.at(-1)}/>
  <div>
    <span>Active graph: {$activeGraph}</span>
  </div>
</main>

<style>
  .graph {
    width: 100%;
    height: 40px;
  }
</style>
