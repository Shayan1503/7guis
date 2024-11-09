<script>
    let { text, clickEvent } = $props();
</script>

<button onclick={clickEvent}
        class="bg-gray-100 text-gray-700 border border-gray-300 rounded px-4 py-1 hover:bg-gray-200 transition">
    {text}
</button>