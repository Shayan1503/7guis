<script>
    import '../app.css';
    import img from '$lib/images/favicon_dark_transparent.png'

    let guis = [
        {link: 'counter', name: 'Counter'},
        {link: 'temperature_converter', name: 'Temperature Converter'},
        {link: 'flight_booker', name: 'Flight Booker'},
        {link: 'timer', name: 'Timer'},
        {link: 'crud', name: 'CRUD'},
        {link: 'circle_drawer', name: 'Circle Drawer'},
        {link: 'cells', name: 'Cells'}
    ];
</script>

<nav class="navbar">
    <a href="/" id="logo">
        <img class='h-10 mr-[0.5rem] px-1' src={img} alt="Logo">
    </a>
    {#each guis as gui}
        <a href="/{gui.link}">{gui.name}</a>
    {/each}
</nav>

<slot/>

<style lang="postcss">
    :global(*) {
        @apply m-0 p-0 box-border;
    }

    :global(body) {
        @apply min-h-[100vh];
        background-color: theme(colors.custom-color.500);
        color: theme(colors.custom-color.100);
    }

    .navbar {
        @apply flex justify-start items-center py-2 h-auto bg-custom-color-200 text-custom-color-400;
    }

    .navbar a {
        @apply relative mr-4 font-[500]
    }

    .navbar a:not(#logo)::before {
        @apply content-[''] absolute top-full left-0 w-0 h-[2px] bg-custom-color-400 duration-[.3s];
    }

    .navbar a:not(#logo):hover::before {
        @apply w-full
    }

</style>