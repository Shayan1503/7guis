<script>
    import Header from '$lib/components/Header.svelte';
    import Frame from '$lib/components/Frame.svelte';

    let celsius = $state('');
    let fahrenheit = $state('');

    let invalidCelsius = $derived(!isNumeric(celsius) && celsius !== '');
    let invalidFahrenheit = $derived(!isNumeric(fahrenheit) && fahrenheit !== '');

    const converterInfo = {
        title: 'Temperature Converter',
        source: 'temperature_converter',
        content: converter,
        w: 'w-96'
    }

    function isNumeric(number) {
        return !isNaN(parseFloat(number)) && isFinite(number);
    }

    function updateFahrenheit() {
        if (celsius === '') {
            fahrenheit = '';
        }

        if (isNumeric(celsius)) {
            const celsiusValue = parseFloat(celsius);
            fahrenheit = (celsiusValue * 9 / 5 + 32).toFixed(2);
        }
    }

    function updateCelsius() {
        if (fahrenheit === '') {
            celsius = '';
        }

        if (isNumeric(fahrenheit)) {
            const fahrenheitValue = parseFloat(fahrenheit);
            celsius = ((fahrenheitValue - 32) * 5 / 9).toFixed(2);
        }
    }

</script>

<Header title="Temperature Converter"/>

{#snippet converter()}
    <div class="flex flex-row items-center justify-center gap-7">
        <div class="input-group">
            <label for="celsius">Celsius</label>
            <input
                    id="celsius"
                    type="text"
                    bind:value={celsius}
                    class:invalid={invalidCelsius}
                    class:bg-gray-300={invalidFahrenheit}
                    oninput={updateFahrenheit}
                    aria-label="Celsius input"
            >
        </div>
        <div class="input-group">
            <label for="fahrenheit">Fahrenheit</label>
            <input
                    id="fahrenheit"
                    type="text"
                    bind:value={fahrenheit}
                    class:invalid={invalidFahrenheit}
                    class:bg-gray-300={invalidCelsius}
                    oninput={updateCelsius}
                    aria-label="Fahrenheit input"
            >
        </div>
    </div>
{/snippet}

<Frame {...converterInfo}/>

<style lang="postcss">
    .input-group {
        @apply flex flex-col items-center;
    }

    input {
        @apply m-2 border rounded px-2 py-1 text-center w-[100px]
    }

    label {
        @apply text-lg text-custom-color-400
    }

    .invalid {
        @apply bg-red-300 border-red-900 text-red-800;
    }
</style>