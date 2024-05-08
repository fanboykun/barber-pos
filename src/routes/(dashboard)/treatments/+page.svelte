<script lang="ts">
	import { toast } from 'svelte-sonner';
    import PageHeading from './(components)/PageHeading.svelte'
	import TreatmentList from './(components)/TreatmentList.svelte';
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

    <div class="grid gap-4 p-4 sm:grid-cols-2">
    
        {#await data.treatments}
            <p>... waiting</p>
        {:then treatments}
            {#if treatments}
                {#each treatments as treatment}
                    <TreatmentList {treatment} {form} />
                {/each}
            {/if}
        {:catch}
            <p>Error</p>
        {/await}
        
    </div>
</section>