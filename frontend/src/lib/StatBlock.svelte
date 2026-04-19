<script lang="ts">
    import { t } from "../i18n";
    import { activeGraphType, graphColor } from "../appStore";
    import ProgressBar from "./ProgressBar.svelte";
    import { derived } from "svelte/store";

    export let type: graphType = "cpu";
    export let value = 50;
    export let progress = undefined;

    $: progressbarValue = progress ?? value

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
        <span class="stats-block__title">{t(type)}</span>
        <div class="progress-bar">
            <ProgressBar value={progressbarValue} {color} />
        </div>
    </div>
    <div class={`stat-block__value ${$isActive ? "active" : ""}`}>
        {value}{type === "ram" ? "ГБ" : "%"}
    </div>
</button>

<style>
    .progress-bar {
        height: 1rem;
        width: 100%;
        min-width: 5rem;
    }
    .stat-block {
        background: none;
        border: none;
        display: flex;
        flex-direction: row;
        align-items: center;
        position: relative;
        gap: 4px;
        color: inherit;
        cursor: pointer;
    }
    .stat-block__back {
        box-sizing: content-box;
        z-index: -1;
        position: absolute;
        display: block;
        content: "";
        width: 100%;
        height: 100%;
        border-radius: 12px;
        top: 4px;
        left: 4px;
        padding: 0px;
        background-color: color-mix(
            in srgb,
            var(--color) 10%,
            transparent 100%
        );
        opacity: 0;
        transition: padding 100ms;
    }
    .stat-block__back.active {
        top: -4px;
        left: -4px;
        padding: 4px;
        opacity: 1;
    }

    .stat-block__text {
        display: flex;
        flex-direction: column;
        width: min-content;
    }

    .stats-block__title {
        font-size: 1rem;
        text-align: left;
    }

    .stat-block__value {
        font-size: 3rem;
        color: var(--color);
        font-weight: 500;
        min-width: 3ch;
    }

    .stat-block__value.active {
        font-weight: 700;
    }
</style>
