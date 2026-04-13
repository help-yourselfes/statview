<script lang="ts">
    export let history: number[] = [];
    export let color: ThemeColor = "cyan";
    export let width: string = "300px";
    export let height: string = "80px";

    $: strokePath = history
        .map((val, i) => {
            const x = (i / (history.length - 1)) * 100;
            const y = 100 - val;
            return `${i === 0 ? "M" : "L"} ${x} ${y ? y : 100}`;
        })
        .join(" ");
    $: fillPath = "M 0 100 L" + strokePath.substring(1) + " L 100 100";
</script>

<div class="graph" style={`width:${width}; height:${height}`}>
    <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        overflow="clip"
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
</div>

<style>
    svg {
        display: block;
        overflow: visible;
        filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.2));
    }
</style>
