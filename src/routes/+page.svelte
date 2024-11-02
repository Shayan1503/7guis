<script>
    import Header from './_components/Header.svelte';
    import Card from './_components/Card.svelte';

    let {data} = $props();

    let header_title = '7GUIs Implementation';
    let header_content = 'A modern take on the classic 7GUIs tasks, built with SvelteKit and Tailwind CSS.';
</script>

<Header title={header_title} content={header_content}/>

<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10 max-w-4xl mx-auto">
    {#each data.guis as content}
        <Card content={content}/>
    {/each}
</div>
