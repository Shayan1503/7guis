<script>
    import "../app.css";
    import Navbar from "./_components/Navbar.svelte";

    let {children} = $props();

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

<Navbar items={guis}/>

{@render children()}

<style lang="postcss">

    :global(body) {
        background-color: theme(colors.custom-color.500);
        color: theme(colors.custom-color.200);
        font-family: "Anek Devanagari", sans-serif;
    }
</style>