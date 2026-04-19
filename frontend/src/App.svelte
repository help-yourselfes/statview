<script lang="ts">
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
  import Graph from "./lib/Graph.svelte";
  import { activeGraph, activeColor } from "./appStore";
  import StatBlock from "./lib/StatBlock.svelte";
  import AppOverlay from "./lib/AppOverlay.svelte";
  import { EventsOn } from "../wailsjs/runtime/runtime";
  import { t } from "./i18n";

  $: cpu = cpuHistory.current;
  $: ram = ramHistory.current;
  $: disk = diskHistory.current;

  EventsOn("app:error", (value) => console.error(value));

  onMount(() => setup());
</script>

<main>
  {#if $info}
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
      <StatBlock type="cpu" value={$cpu} />
      <StatBlock type="disk" value={$disk} />
      <StatBlock
        type="ram"
        value={Math.round($ram * 10) / 10}
        progress={$ramHistory.at(-1)}
      />
    </div>
    <div class="cpu">
      <span class="cpu__name">{$info.CPU.name}</span>
      <p class="info">
        <span class="info__name"> {$t("cpu_cores")} </span>
        <span class="info__value"> {$info.CPU.cores} </span>
      </p>
      <p class="info">
        <span class="info__name"> {$t("cpu_mhz")} </span>
        <span class="info__value"> {$info.CPU.mhz}{$t("mhz")}</span>
      </p>
    </div>
  {/if}
  <div class="overlay">
    <AppOverlay />
  </div>
</main>

<style>
  @media (max-width: 470px) {
    .cpu {
      transform: translateX(100%);
    }
  }
  @media (max-width: 689px) {
    main {
      flex-direction: row;
    }
    .stats {
      flex-direction: column !important;
    }
    .cpu {
      margin-top: 1rem;
      margin-right: 1rem;
    }
  }
  @media (min-width: 690px) and (max-width: 880px) {
    main {
      flex-direction: column;
    }
    .stats {
      gap: 1rem
    }
    .cpu {
      max-width: max-content;
    }
  }
  @media (min-width: 879px) {
    main {
      flex-direction: row;
      align-items: start;
    }
    .stats {
      gap: 1rem
    }
  }
  main {
    display: flex;
    justify-content: space-between;
  }
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
    z-index: -1;
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
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .cpu {
    padding: 1rem;
    background: color-mix(in srgb, var(--background) 100%, transparent 40%);
    font-weight: 500;
    gap: 0.25rem;
    height: max-content;
    border-radius: 1rem;
    min-width: max-content;
    transition: transform 200ms;
  }

  .cpu__name {
    font-size: 1rem;
    color: var(--current);
    font-weight: 600;
  }

  .cpu p {
    margin: 0;
  }

  .info {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 0.75rem;
  }

  .info__name {
    opacity: 0.5;
  }
</style>
