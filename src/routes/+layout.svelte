<script>
    import "../app.css";
    import Navbar from "$lib/components/Navbar.svelte";
    import {page} from "$app/stores";

    let {data, children} = $props();
</script>

<svelte:head>
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />

    {#if $page.data.title}
        <title>{$page.data.title} | 7guis</title>
    {:else if $page.error}
        <title>{$page.status} {$page.error.message}</title>
    {:else}
        <title>7guis</title>
    {/if}
</svelte:head>

<Navbar items={data.links}/>

<section class="flex flex-col items-center justify-center">
    {@render children()}
</section>

<style lang="postcss">
    :global(*) {
        @apply m-0 p-0 box-border;
    }

    :global(body) {
        background-color: theme(colors.custom-color.500);
        font-family: "Anek Devanagari", sans-serif;

        @apply overflow-x-hidden;
    }
</style>
