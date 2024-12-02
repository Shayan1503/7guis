<script>
    let { text, clickEvent, isDisabled=false } = $props();
</script>

<button onclick={clickEvent}
        disabled={isDisabled}
        class:isDisabled
        class="bg-gray-100 text-gray-700 border border-gray-300 rounded px-4 py-1 hover:bg-gray-200 transition">
    {text}
</button>

<style lang="postcss" >

    button {
        @apply transition-colors;
    }

    .isDisabled {
        @apply bg-gray-400 cursor-not-allowed
    }

</style>