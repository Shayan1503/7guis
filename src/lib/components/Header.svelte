<script>
    import {fade} from 'svelte/transition';

    let {title = 'Title', content} = $props();
</script>

<header in:fade class="text-center py-[1rem]">
    <h1 class="text-5xl font-bold text-custom-color-200 mb-4">{title}</h1>
    {#if content}
        <p class="text-lg max-w-md mx-auto text-custom-color-100">{content}</p>
    {/if}
</header>