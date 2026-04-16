<script lang="ts">
  import logo from "./assets/images/logo-universal.png";
  import { onMount } from "svelte";
  import {
    cpuHistory,
    diskHistory,
    info,
    maxRam,
    ramHistory,
    setup,
    started,
  } from "./statStore";
  const cpu = cpuHistory;
  const ram = ramHistory;

  const cpuValue = derived(cpu, (cpu) => cpu.at(-1));
  const diskValue = derived(diskHistory, (disk) => disk.at(-1))

  import Graph from "./lib/Graph.svelte";
  import { derived } from "svelte/store";
  import { activeGraph, activeColor } from "./appStore";
  import StatBlock from "./lib/StatBlock.svelte";
  import AppOverlay from "./lib/AppOverlay.svelte";

  onMount(() => setup());
</script>

<main>
  {#if started}
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
      <StatBlock type="disk" value={$diskValue} />
      <StatBlock
        type="ram"
        value={Math.round($ram.at(-1) * 10) / 10}
        progressbarValue={($ram.at(-1) / $maxRam) * 100}
      />
    </div>
    <div class="overlay">
      <AppOverlay />
    </div>
  {/if}
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

  .stats {
    padding: 12px;
  }
</style>
