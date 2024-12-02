<script>
    import Header from '$lib/components/Header.svelte';
    import Frame from '$lib/components/Frame.svelte';
    import Button from "$lib/components/Button.svelte";
    import {onDestroy} from "svelte";

    let duration = $state(15000);
    let start = $state(Date.now());
    let currentTime = $state(Date.now());
    let elapsed = $derived.by(() => {
        const time = currentTime - start;
        return time <= 0 ? 0 : time >= duration ? duration : time;
    });

    const interval = setInterval(() => {
        currentTime = Date.now();
    }, 100);

    const timerInfo = {
        title: "Timer",
        source: "timer",
        content: timer
    }

    function reset() {
        start = new Date().getTime();
    }

    function formatTime(time) {
        return (time / 1000).toFixed(1) + "s";
    }

    onDestroy(() => {
        clearInterval(interval);
    });
</script>

<Header title="Timer"/>

{#snippet timer()}
    <div class="flex flex-col justify-center items-center">
        <label class="w-full flex flex-grow gap-2">
            <span class="text-custom-color-500">Elapsed Time: </span>
            <progress class="progress-bar" max={duration} value={elapsed}></progress>
        </label>

        <div>{formatTime(elapsed)}</div>

        <label class="w-full flex gap-2">
            <span class="text-custom-color-500">Duration: </span>
            <input type="range" bind:value={duration} min="0" max="30000" class="range-input">
        </label>
        <Button clickEvent={reset} text="Reset"/>
    </div>
{/snippet}

<Frame {...timerInfo}/>

<style lang="postcss">
    .progress-bar {
        @apply appearance-none border-[1px] border-solid border-white rounded bg-white;
    }

    .progress-bar::-webkit-progress-bar {
        @apply bg-white rounded;
    }

    .progress-bar::-webkit-progress-value {
        @apply bg-custom-color-300 rounded;
    }

    .range-input {
        @apply appearance-none flex-grow h-4 rounded-[0.25rem];
    }

    .range-input::-webkit-slider-thumb {
        @apply appearance-none h-4 w-4 bg-custom-color-500 rounded-[50%] cursor-pointer;
    }

    .range-input::-webkit-slider-runnable-track {
        @apply h-4 bg-custom-color-200 rounded-[0.25rem];
    }

</style>