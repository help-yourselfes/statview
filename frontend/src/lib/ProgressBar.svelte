<script lang="ts">
    export let min = 0;
    export let max = 100;
    export let value = 50;
    export let color: ThemeColor = "foreground";
    $: valuePercent = ((value - min) / max) * 100;
</script>

<div class="progress-bar">
    <div class="progress-bar__background" />
    <div
        class="progress-bar__overlay"
        style={`
    width:${valuePercent}%;
    background:var(--${color});
    `}
    />
</div>

<style>
    .progress-bar {
        width: 100%;
        height: 0.75rem;
        position: relative;
    }
    .progress-bar__background,
    .progress-bar__overlay {
        position: absolute;
        height: 100%;
        border-radius: 999px;
    }

    .progress-bar__background {
        width: 100%;
        background: rgba(0,0,0,0.5);
    }
    .progress-bar__overlay {
        position: absolute;
    }
</style>
