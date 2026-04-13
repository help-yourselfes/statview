<script lang="ts">
    export let history: number[] = [];
    export let color: ThemeColor = "cyan";

    $: strokePath = history
        .map((val, i) => {
            const x = (i / (history.length - 1)) * 100;
            const y = 100 - val;
            return `${i === 0 ? "M" : "L"} ${x} ${y ? y : 100}`;
        })
        .join(" ");
    $: fillPath = "M 0 100 L" + strokePath.substring(1) + " L 100 100";
</script>

    <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        width="100%"
        height="100%"
    >
        <path
            d={fillPath}
            fill={color}
            fill-opacity="0.2"
            stroke="none"
            stroke-width="5px"
            stroke-linecap="round"
            stroke-linejoin="round"
            vector-effect="non-scaling-stroke"
        />
        <path
            d={strokePath}
            fill="none"
            stroke={color}
            stroke-width="5px"
            stroke-linecap="round"
            stroke-linejoin="round"
            vector-effect="non-scaling-stroke"
        />
    </svg>

<style>
    svg {
        display: block;
        overflow: hidden;
    }
</style>
