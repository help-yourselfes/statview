<script lang="ts">
    import { activeGraphType, graphColor } from "../appStore";
    import ProgressBar from "./ProgressBar.svelte";
    import { derived } from "svelte/store";

    export let type: graphType = "cpu";
    export let value = 50;

    $: isActive = derived(activeGraphType, (active) => active === type);
    $: color = graphColor(type);
</script>

<button
    class={`stat-block no-drag ${type} ${$isActive ?? "active"}`}
    on:click={() => activeGraphType.set(type)}
>
    <div class="stat-block__text">
        <span class="stats-block__title">{type}</span>
        <div class="progress-bar">
            <ProgressBar {value} {color} />
        </div>
    </div>
    <div class={`stat-block__value ${$isActive ?? "active"}`}>
        {value}{type === "ram" ? "" : "%"}
    </div>
</button>

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
        gap: 4px;
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
    .stat-block__value {
        font-weight: 600;
    }

    .stat-block__value {
        font-weight: 900;
    }
</style>
