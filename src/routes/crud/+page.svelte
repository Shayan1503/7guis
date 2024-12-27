<script>
    import Header from "$lib/components/Header.svelte";
    import Frame from "$lib/components/Frame.svelte";
    import Button from "$lib/components/Button.svelte";

    const users = $state([]);
    users.push({
        id: crypto.randomUUID(),
        firstname: 'Hans',
        lastname: 'Emil'
    });
    users.push({
        id: crypto.randomUUID(),
        firstname: 'Max',
        lastname: 'Mustermann'
    });
    users.push({
        id: crypto.randomUUID(),
        firstname: 'Roman',
        lastname: 'Tisch'
    });
    let prefix = $state();
    let selected = $state();
    let firstname = $state('');
    let lastname = $state('');

    let filteredUsers = $derived.by(() => {
        if (prefix === undefined) {
            return users;
        }

        return users.filter((user) => {
            const firstname = user.firstname.toLowerCase();
            const lastname = user.lastname.toLowerCase();
            return firstname.includes(prefix.toLowerCase()) || lastname.includes(prefix.toLowerCase());
        });
    })

    $effect(() => {
        if (selected !== undefined) {
            const user = users.find((user) => user.id === selected);
            firstname = user ? user.firstname : '';
            lastname = user ? user.lastname : '';
        }
    })

    const crudInfo = {
        title: "CRUD",
        source: "crud",
        content: crud
    }

    function handleCreate() {
        users.push({
            id: crypto.randomUUID(),
            firstname: firstname.trim(),
            lastname: lastname.trim(),
        });
        firstname = '';
        lastname = '';
    }

    function handleUpdate() {
        const user = users.find((user) => user.id === selected);
        if (user) {
            user.firstname = firstname.trim();
            user.lastname = lastname.trim();
        }
        selected = undefined;
    }

    function handleDelete() {
        let index = -1;

        for (let i = 0; i < users.length; i++) {
            if (users[i].id === selected) {
                index = i;
            }
        }

        if (index < 0) {
            console.error(`User with id ${selected} not found.`);
            return;
        }


        users.splice(index, 1);
        selected = undefined;
    }

</script>

<Header title="CRUD"/>

{#snippet crud()}
    <div class="flex flex-col items-center justify-end">
        <label for="prefix">
            Filter prefix:
            <input id="prefix"
                   type="text"
                   placeholder="Type to filter"
                   aria-label="Filter prefix"
                   bind:value={prefix}
            />
        </label>
        <div class="grid grid-cols-2 items-center gap-4 p-3">
            <select size="4"
                    aria-label="users"
                    bind:value={selected}
            >
                {#each filteredUsers as user}
                    <option value={user.id}>{user.lastname}, {user.firstname}</option>
                {/each}
            </select>
            <fieldset class="border p-4 rounded flex flex-col gap-4">
                <legend class="text-custom-color-400 text-base font-medium">User Details</legend>
                <label for="firstname">
                    Name:
                    <input
                            id="firstname"
                            type="text"
                            aria-label="Name"
                            bind:value={firstname}
                    />
                </label>
                <label for="lastname">
                    Surname:
                    <input
                            id="lastname"
                            type="text"
                            aria-label="Surname"
                            bind:value={lastname}
                    />
                </label>
            </fieldset>
        </div>
        <div class="grid grid-cols-3 items-center gap-4 justify-center">
            <Button text="Create" clickEvent={handleCreate} isDisabled={firstname === '' || lastname === ''}/>
            <Button text="Update" clickEvent={handleUpdate}
                    isDisabled={selected === undefined || firstname === '' || lastname === ''}/>
            <Button text="Delete" clickEvent={handleDelete} isDisabled={selected === undefined}/>
        </div>
    </div>
{/snippet}

<Frame {...crudInfo}/>

<style lang="postcss">

    input {
        @apply border rounded px-2 py-1 text-sm w-full;
    }

    label {
        @apply text-custom-color-400 text-base font-medium;
    }

</style>