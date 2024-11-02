<script>
    import {fly} from 'svelte/transition';

    let {content} = $props();
    let hasLink = $derived(content.url || content.link);
</script>

<a href="{content.link || content.url}" transition:fly|global={{y: 50, delay: 100, duration: 1500}}
   class="bg-custom-color-200 shadow-sm rounded-lg p-6 text-center hover:shadow-xl transition-shadow duration-200 {hasLink ? 'cursor-pointer' : ''}">
    <h2 class="text-2xl font-semibold text-gray-800 mb-2">{content.name}</h2>
    <p class="text-custom-color-400">{content.description}</p>
</a>