<script lang="ts">
    import { t } from "../i18n";
    import { activeGraphType, graphColor } from "../appStore";
    import ProgressBar from "./ProgressBar.svelte";
    import { derived } from "svelte/store";

    export let type: graphType = "cpu";
    export let value = 50;

    $: isActive = derived(activeGraphType, (active) => active === type);
    $: color = graphColor(type);
    $: colorCSS = "--color:var(--" + color + ")";
</script>

<button
    style={colorCSS}
    class={`stat-block no-drag ${type} `}
    on:click={() => activeGraphType.set(type)}
>
    <div class={`stat-block__back ${$isActive ? "active" : ""}`} />
    <div class="stat-block__text">
        <span class="stats-block__title">{$t(type)}</span>
        <div class="progress-bar">
            <ProgressBar {value} {color} />
        </div>
    </div>
    <div class={`stat-block__value ${$isActive ? "active" : ""}`}>
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
        color: inherit;
    }
    .stat-block__back {
        z-index: -1;
        position: absolute;
        display: block;
        content: "";
        width: 100%;
        height: 100%;
        border-radius: 12px;
        top: 4px;
        left: 4px;
        padding: -8px;
        background-color: color-mix(
            in srgb,
            var(--color) 10%,
            transparent 100%
        );
        opacity: 0;
        transition:
            opacity,
            padding,
            left,
            top 100ms;
    }
    .stat-block__back.active {
        top: -4px;
        left: -4px;
        padding: 8px;
        opacity: 1;
    }

    .stat-block__text {
        display: flex;
        flex-direction: column;
    }

    .stats-block__title {
        font-size: 1rem;
        text-align: left;
    }

    .stat-block__value {
        font-size: 3rem;
        color: var(--color);
        font-weight: 600;
    }

    .stat-block__value.active {
        font-weight: 900;
    }
</style>
