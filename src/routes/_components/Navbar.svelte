<script>
    import { base } from '$app/paths';
    import img from '$lib/images/favicon_dark_transparent.png';

    let default_items = [
        {link: "/", name: 'List'},
        {link: '/', name: 'Of'},
        {link: '/', name: 'Options'},
        {link: '/', name: 'To'},
        {link: '/', name: 'Show'}
    ];

    let {items = default_items} = $props();
</script>

{#snippet link(options)}
    {#each options as option}
        <a href={base + "/" + option.link}>{option.name}</a>
    {/each}
{/snippet}

<nav class="navbar">
    <a href={base || "/"} id="logo">
        <img class='h-10' src={img} alt="Logo">
    </a>
    {@render link(items)}
</nav>

<style lang="postcss">
    .navbar {
        @apply sticky top-0 left-0 z-[1] w-screen flex justify-start items-center py-2 h-auto bg-custom-color-200 text-custom-color-400;
    }

    .navbar a {
        @apply relative mx-2 font-[500]
    }

    .navbar a:not(#logo)::before {
        @apply content-[''] absolute top-full left-0 w-0 h-[2px] bg-custom-color-400 duration-[.3s];
    }

    .navbar a:not(#logo):hover::before {
        @apply w-full
    }
</style>