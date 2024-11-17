<script>
    import Header from '../_components/Header.svelte';
    import Frame from '../_components/Frame.svelte';
    import Button from '../_components/Button.svelte';

    let selected = $state('one-way');
    let departure = $state(getToday());
    let destination = $state(getToday());

    const flightBookerInfo = {
        title: 'Flight Booker',
        source: 'flight_booker',
        content: booker,
        w: 'w-96'
    }

    function getToday() {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();

        return `${dd}.${mm}.${yyyy}`;
    }

    function book() {
        let message = `You just booked a ${selected} flight`;
        if (selected === 'one-way') {
            message += ` for ${departure}!`;
        } else {
            message += ` from ${departure} to ${destination}!`;
        }

        alert(message);
    }

    function isBookable() {
        if (!isValidDate(departure) || !isValidDate(destination)) {
            return false;
        }

        const departureDate = getDate(departure);
        const destinationDate = getDate(destination);

        if (departureDate < getDate(getToday())) {
            return false;
        }

        if (selected === 'return') {
            return departureDate <= destinationDate;
        }

        return true;
    }

    function isValidDate(dateString) {
        const dateRegex = /^\d{2}[.]\d{2}[.]\d{4}$/;

        if (!dateRegex.test(dateString)) {
            return false;
        }

        return getDate(dateString) !== null;
    }

    function getDate(dateString) {
        const [dd, mm, yyyy] = dateString.split('.').map(Number);
        const date = new Date(yyyy, mm - 1, dd);

        if (date.getFullYear() === yyyy && date.getMonth() === mm - 1 && date.getDate() === dd) {
            return date;
        }

        return null;
    }

</script>

<Header title="Flight Booker"/>

{#snippet booker()}
    <div class="flex flex-col items-center justify-center gap-4">
        <select bind:value={selected} aria-label="Flight type" class="w-64">
            <option value="one-way">one-way flight</option>
            <option value="return">return flight</option>
        </select>

        <div class="grid grid-cols-2 items-center gap-4 w-64">
            <label for="departure">Departure</label>
            <input type="text"
                   id="departure"
                   bind:value={departure}
                   class:invalid={!isValidDate(departure)}
                   aria-invalid="{!isValidDate(departure)}"
                   aria-label="Departure date"
            />
            {#if !isValidDate(departure)}
                <p class="error col-span-2 text-center">Invalid date format. Use <code>DD.MM.YYYY</code>.</p>
            {/if}

            <label for="return">Return</label>
            <input type="text"
                   id="return"
                   bind:value={destination}
                   class:invalid={!isValidDate(destination)}
                   disabled="{selected !== 'return'}"
                   aria-invalid="{!isValidDate(destination)}"
                   aria-label="Return date"
            />
            {#if !isValidDate(destination)}
                <p class="error col-span-2 text-center">Invalid date format. Use <code>DD.MM.YYYY</code>.</p>
            {/if}
        </div>

        <Button isDisabled={!isBookable()} text="Book" clickEvent={book} class="w-64"/>
    </div>
{/snippet}

<Frame {...flightBookerInfo}/>

<style lang="postcss">
    input, select {
        @apply border rounded text-center p-2;
    }

    input[disabled] {
        @apply bg-gray-200 text-gray-500;
    }

    label {
        @apply text-custom-color-400 text-base font-medium;
    }

    .invalid {
        @apply bg-red-400 border-red-600;
    }

    .error {
        @apply text-red-600 text-sm mt-1;
    }
</style>
