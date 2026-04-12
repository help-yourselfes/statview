<script lang="ts">
  import logo from "./assets/images/logo-universal.png";
  import { onMount } from "svelte";
  import { cpuHistory, ramHistory, startMonitoring } from "./statStore";
  const cpu = cpuHistory.array;
  const ram = ramHistory.array;
  import Graph from "./lib/Graph.svelte";

  onMount(() => startMonitoring(1000));
</script>

<main>
  <div class="stats">
    <div class="stat-block cpu">
      <span class="stats-block__title">CPU {$cpu.at(-1)}%</span>
      <Graph color="green" history={$cpu} width={500} height={100} />
    </div>

    <div class="stat-block ram">
      <span class="stats-block__title">RAM {$ram.at(-1)}%</span>
      <Graph color="red" history={$ram} width={500} height={100} />
    </div>
  </div>
</main>

<style>
  .cpu {
    color: var(--green);
  }

  .ram {
    color: var(--red);
  }
</style>
