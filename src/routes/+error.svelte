<!--this is the fallback error page-->
<!--the code is a direct inspiration of the official sveltekit page-->
<!--that code can be found here: https://github.com/sveltejs/svelte/blob/svelte-4/sites/svelte.dev/src/routes/%2Berror.svelte-->
<script>
    import {page} from '$app/stores';

    const online = typeof navigator !== "undefined" ? navigator.onLine : false;
</script>

<div class="container">
    {#if online}
        {#if $page.status === 404}
            <h1>Not found!</h1>
            <p>
                The page you are looking for could not be found.
            </p>
        {:else}
            <h1>Yikes!</h1>
            <p>Something went wrong when we tried to render this page.</p>
            {#if $page.error.message}
                <p class="error">{$page.status}: {$page.error.message}</p>
            {:else}
                <p class="error">Encountered a {$page.status} error.</p>
            {/if}
            <p>Please try reloading the page.</p>
            <!--            TODO add a nice message if the issue still persists-->
        {/if}
    {:else}
        <h1>It looks like you're offline</h1>
        <p>Reload the page once you've found the internet.</p>
    {/if}
</div>

<style lang="postcss">
    .container {
        @apply w-screen h-screen flex flex-col justify-center items-center text-custom-color-200;
    }

    h1, p {
        @apply my-0 mx-auto;
    }

    h1 {
        @apply text-[2.8em] font-[300] mt-0 mr-0 mb-[0.5em] ml-0;
    }

    p {
        @apply my-[1em] mx-auto;
    }

    .error {
        @apply text-red-500;
    }
</style>