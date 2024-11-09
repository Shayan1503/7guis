<script>
    let {title = 'Title', source, content, w='w-50'} = $props();
</script>

<div class="bg-custom-color-100 rounded-lg shadow-md border border-gray-300 overflow-hidden {w}">
    <div class="title-bar bg-gray-200 text-center text-gray-700 text-sm font-semibold px-4 py-1 flex justify-between items-center">
        <span>{title}</span>
        <div>
            <button onclick={() => location.reload()}
                    aria-label="Refresh page"
                    class="button">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-4 h-4" viewBox="0 -960 960 960">
                    <path d="M480-160q-134 0-227-93t-93-227q0-134 93-227t227-93q69 0 132 28.5T720-690v-110h80v280H520v-80h168q-32-56-87.5-88T480-720q-100 0-170 70t-70 170q0 100 70 170t170 70q77 0 139-44t87-116h84q-28 106-114 173t-196 67Z"/>
                </svg>
            </button>
            <button onclick={() => window.open(source, '_blank')}
                    aria-label="Source Code"
                    class="button">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-4 h-4" viewBox="0 -960 960 960">
                    <path d="M320-240 80-480l240-240 57 57-184 184 183 183-56 56Zm320 0-57-57 184-184-183-183 56-56 240 240-240 240Z"/>
                </svg>
            </button>
        </div>
    </div>
    <div class="flex items-center justify-between p-4">
        {@render content()}
    </div>
</div>

<style lang="postcss">
    .button {
        @apply text-gray-500 hover:text-gray-700 p-0.5
    }
</style>