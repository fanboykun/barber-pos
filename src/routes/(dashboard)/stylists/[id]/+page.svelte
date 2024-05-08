<script lang="ts">
	import LoadingSpinner from '$lib/components/ui/LoadingSpinner.svelte';
	import PageHeading from './(components)/PageHeading.svelte';
    export let data
</script>

<section>

    {#await data.stylist}
        <LoadingSpinner />
    {:then stylist}
        {#if stylist}
        <PageHeading>
            Stylist {stylist.name}'s Info
        </PageHeading>
        {/if}
    {:catch}
        <p>Error</p>
    {/await}

</section>
