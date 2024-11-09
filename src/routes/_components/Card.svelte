<script>
    import {fly} from 'svelte/transition';
    import {goto} from "$app/navigation";

    let {content} = $props();

    function handleClick() {
        if (content.link) {
            goto(content.link);
        }
    }

    function handleKeydown(event) {
        if (content.link && (event.key === 'Enter' || event.key === ' ')) {
            event.preventDefault();
            goto(content.link);
        }
    }
</script>

<div
        role="button"
        aria-label="{content.name}"
        tabindex="{content.url ? 0 : undefined}"
        onclick={handleClick}
        onkeydown={handleKeydown}
        in:fly|global={{y: 50, delay: 100, duration: 1500}}
        class="bg-custom-color-200 shadow-sm rounded-lg p-6 text-center hover:shadow-xl transition-shadow duration-200 {content.link ? 'cursor-pointer' : ''}">
    <h2 class="text-2xl font-semibold text-gray-800 mb-2">{content.name}</h2>
    <p class="text-custom-color-400">{content.description}</p>
</div>