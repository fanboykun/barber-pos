<script lang="ts">
	import { toast } from 'svelte-sonner';
    import PageHeading from './(components)/PageHeading.svelte'
	import StylistList from './(components)/StylistList.svelte';
	import LoadingSpinner from '$lib/components/ui/LoadingSpinner.svelte';
    export let data
    export let form

    $: {
        if(form?.success) {
            let isSuccess = form?.success == true
            toast(isSuccess ? 'Success' : 'Failed', {
                description: isSuccess ? "The Action Executed Successfully" : "The Action Failed to Execute",
            })
        }
    }
</script>

<section>
    <PageHeading {form} />

    
    {#await data.stylists}
       <LoadingSpinner />
    {:then stylists}
        {#if stylists}
            <StylistList {stylists} {form}/>
        {/if}
    {:catch}
        <p>Error</p>
    {/await}
        
</section>