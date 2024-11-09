<script>
    import Header from '../_components/Header.svelte';
    import Frame from "../_components/Frame.svelte";
    import Button from '../_components/Button.svelte'

    let count = $state(0);

    function increment() {
        count += 1;
    }

    const counterinfo = {
        title: 'Counter',
        source: 'counter',
        content: counter,
        w: 'w-60'
    }
</script>

<Header title="Counter"/>

{#snippet counter()}
    <span class="text-center text-lg text-gray-800 p-5">{count}</span>
    <Button clickEvent={increment} text="Count"/>
{/snippet}

<Frame {...counterinfo}/>