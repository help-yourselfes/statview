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
  import { activeGraph } from "./appStore";

  onMount(() => startMonitoring(1000));

  const setActiveGraph = (value: graphType) => {
    activeGraph.set(value);
  };
</script>

<main>

  <div class="stats">
    <button class="stat-block cpu active" on:click={() => activeGraph.set("cpu")}>
      <span class="stats-block__title">CPU</span>
      <div class="progress-bar">
        <ProgressBar value={$cpuValue} />
      </div>
    </button>

    <button class="stat-block ram" on:click={() => activeGraph.set("ram")}>
      <span class="stats-block__title">RAM {$ram.at(-1)}%</span>
    </button>
  </div>
  <div>
    <span>Active graph: {$activeGraph}</span>
  </div>
</main>

<style>
  .progress-bar {
    height: 1rem;
    width: 10rem;
  }
  .stat-block {
    background: none;
    border: none;
    display: flex;
    flex-direction: row;
    position: relative;
  }
  .stat-block.active::before {
    z-index: -1;
    position: absolute;
    display: block;
    content: "";
    width: 100%;
    height: 100%;
    background-color: color-mix(
      in srgb,
      var(--color) 100%,
      var(--background) 100%
    );
  }

  .cpu.active {
    --color: var(--green);
  }
  .ram.active {
    --color: var(--red);
  }
  .disk.active {
    --color: var(--cyan);
  }

  .graph {
    width: 100%;
    height: 40px;
  }
</style>
