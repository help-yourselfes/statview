<script lang="ts">
    export let history: number[] = [];
    export let color: ThemeColor = "cyan";
    export let width: number = 300;
    export let height: number = 80;

    const padding = 10;

    $: pathData = history
        .map((val, i) => {
            const x =
                (i / (history.length - 1)) * (width - padding * 2) + padding;
            const y = height - (val / 100) * (height - padding * 2) - padding;
            return `${i === 0 ? "M" : "L"} ${x} ${y}`;
        })
        .join(" ");
</script>

<div class="graph">
    <svg {width} {height} viewBox="0 0 {width} {height}">
            <path
            d={pathData}
            fill="none"
            stroke={color}
            stroke-width="5px"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
    </svg>
</div>

<style>
    svg {
        display: block;
        overflow: visible;
        filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.2));
    }
</style>
