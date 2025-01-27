<script>
    import Frame from '$lib/components/Frame.svelte';
    import Header from '$lib/components/Header.svelte';
    import Button from '$lib/components/Button.svelte';

    const circleDrawerInfo = {
        title: 'Circle Drawer',
        source: 'circle_drawer',
        content: circle_drawer
    }
    let circles = $state([]);
    let mouseX = $state(0);
    let mouseY = $state(1);
    let sliderValue = $state(30);
    let showSlider = $state(false);
    let selectedCircle = $state(null);
    let undoStack = $state([]);
    let redoStack = $state([]);
    let oldRadius = -1;

    function handleLeftClick(event) {
        if(showSlider) {
            showSlider = false;
            return;
        }

        if (event.target.nodeName === 'circle') {
            return;
        }

        const rect = event.target.getBoundingClientRect();
        const cx = event.clientX - rect.left;
        const cy = event.clientY - rect.top;

        const circle = {
            x: cx,
            y: cy,
            radius: 30
        }

        circles.push(circle);
        undoStack.push({type: "add", element: circle});
    }

    function handleRightClick(circle, event) {
        event.preventDefault();
        mouseX = event.clientX;
        mouseY = event.clientY;
        showSlider = true;
        sliderValue = circle.radius;
        selectedCircle = circle;
        oldRadius = selectedCircle.radius;
    }

    function changeCircleRadius(event) {
        selectedCircle.radius = event.target.value;
    }

    function undo() {
        const action = undoStack.pop();
        redoStack.push(action);

        if(action.type === "add") {
            removeCircle(action.element);
        }
        if(action.type === "change_radius") {
            action.element.radius = action.oldRadius;
        }
    }

    function redo() {
        const action = redoStack.pop();
        undoStack.push(action);

        if(action.type === "add") {
            circles.push(action.element);
        }
        if(action.type === "change_radius") {
            action.element.radius = action.newRadius;
        }
    }

    function removeCircle(circle) {
        const index = circles.findIndex(c => c.x === circle.x && c.y === circle.y);

        if(index > -1) {
            circles.splice(index, 1);
        }
    }

    function closeSlider() {
        if (oldRadius !== selectedCircle.radius) {
            undoStack.push({
                type: 'change_radius',
                element: selectedCircle,
                oldRadius,
                newRadius: selectedCircle.radius
            });
        }
        showSlider = false;
    }

    $inspect(undoStack);
</script>

<Header title="Circle Drawer"/>

{#snippet circle_drawer()}
    <div class="flex flex-col items-center justify-center">
        <div class="grid grid-cols-2 items-center justify-center p-2">
            <Button text="Undo" clickEvent={undo} isDisabled={undoStack.length === 0}/>
            <Button text="Redo" clickEvent={redo} isDisabled={redoStack.length === 0}/>
        </div>
        <svg
                role="presentation"
                height="450"
                width="500"
                onclick={handleLeftClick}
        >
            <rect
                    width="100%"
                    height="100%"
                    class="canvas"
            />
            {#each circles as circle}
                <circle
                        role="presentation"
                        class="custom-circle"
                        cx={circle.x}
                        cy={circle.y}
                        r={circle.radius}
                        oncontextmenu={(event) => handleRightClick(circle, event)}
                />
            {/each}
        </svg>
    </div>

    {#if showSlider}
        <div
                role="button"
                tabindex="0"
                class="backdrop"
                onclick={closeSlider}/>
        <div
                class="slider-container p-4 bg-custom-color-100 rounded-xl shadow-lg"
                style="top: {mouseY}px; left: {mouseX}px">
            <label class="block text-custom-color-500 font-medium mb-2 text-center">
                Adjust Diameter

            <input
                    class="slider-input w-full h-2 rounded-lg bg-custom-color-300 appearance-none"
                    type="range"
                    bind:value={sliderValue}
                    oninput={changeCircleRadius}
                    onblur={closeSlider}
                    min="0"
                    max="200"/>
            </label>
        </div>
    {/if}
{/snippet}

<Frame {...circleDrawerInfo}/>

<style lang="postcss">

    .canvas {
        @apply fill-white stroke-[2.5px] stroke-custom-color-500
    }

    .custom-circle {
        @apply fill-transparent stroke-2 stroke-custom-color-500 transition-all duration-200 ease-linear
    }

    .custom-circle:hover {
        @apply fill-gray-400
    }

    .slider-container {
        @apply absolute flex flex-col items-center bg-white border-2 border-custom-color-500 rounded-lg shadow-md transition-all;
    }

    .slider-input {
        @apply appearance-none h-2 rounded-lg bg-custom-color-300;
    }

    .slider-input::-webkit-slider-thumb {
        @apply appearance-none w-4 h-4 bg-custom-color-500 rounded-full shadow-md cursor-pointer;
    }

    .slider-input::-moz-range-thumb {
        @apply w-4 h-4 bg-custom-color-500 rounded-full shadow-md cursor-pointer;
    }

    .slider-input:hover::-webkit-slider-thumb {
        @apply bg-custom-color-500;
    }

    .slider-input:hover::-moz-range-thumb {
        @apply bg-custom-color-500;
    }

    .backdrop {
        @apply fixed inset-0 bg-black bg-opacity-50;
    }
</style>