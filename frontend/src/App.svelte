<script lang="ts">
  import logo from "./assets/images/logo-universal.png";
  import { onMount } from "svelte";
  import { cpuHistory, ramHistory, startMonitoring } from "./statStore";
  const cpu = cpuHistory.array;
  const ram = ramHistory.array;

  const cpuValue = derived(cpu, (cpu) => cpu[0]);

  import Graph from "./lib/Graph.svelte";
  import ProgressBar from "./lib/ProgressBar.svelte";
  import { derived } from "svelte/store";

  onMount(() => startMonitoring(1000));
</script>

<main>
  <div class="stats">
    <div class="stat-block cpu">
      <span class="stats-block__title">CPU</span>
      <div class="progress-bar">
        <ProgressBar value={$cpuValue} />
      </div>
      <div class="graph">
        <Graph color="green" history={$cpu} />
      </div>
    </div>

    <div class="stat-block ram">
      <span class="stats-block__title">RAM {$ram.at(-1)}%</span>
      <div class="graph">
        <Graph color="red" history={$ram} />
      </div>
    </div>
  </div>
</main>

<style>
  .progress-bar {
    height: 1rem;
    width: 10rem;
  }
  .stat-block {
    display: flex;
    flex-direction: row;
  }
  .graph {
    width: 100%;
    height: 40px;
  }
</style>
