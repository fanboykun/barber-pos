<script lang="ts">
	import { toast } from 'svelte-sonner';
    import PageHeading from './(components)/PageHeading.svelte'
	import LoadingSpinner from '$lib/components/ui/LoadingSpinner.svelte';
	import TransactionList from './(components)/TransactionList.svelte';
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
    <PageHeading />

    
    {#await data.transactions}
       <LoadingSpinner />
    {:then transactions}
        {#if transactions}
            <TransactionList {transactions} {form} />
        {/if}
    {:catch}
        <p>Error</p>
    {/await}
        
</section>