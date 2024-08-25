<script lang="ts">
    import { toast } from 'svelte-sonner';
	import MemberList from './(components)/MemberList.svelte';
    import PageHeading from './(components)/PageHeading.svelte'
    import * as Table from "$lib/components/ui/table"
	import LoadingSpinner from '$lib/components/ui/LoadingSpinner.svelte';
	import Input from '$lib/components/ui/input/input.svelte';

    export let data
    export let form

    $: {
        if(form?.success != undefined) {
            let isSuccess = form?.success == true
            let toastMessage = isSuccess ? 'The Action Executed Successfully' : 'The Action Failed to Execute'
            if(form.message && typeof form.message === 'string') toastMessage = form.message
            toast(isSuccess ? 'Success' : 'Failed', {
                description: toastMessage,
            })
        }
    }

    
</script>

<section>
  <PageHeading {form} />

  {#await data.members}
    <LoadingSpinner />
    {:then members}
        {#if members}
        <!-- <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-4"> -->
            <MemberList {members} {form}/>
        <!-- </div> -->
        {/if}
    {:catch}
    <p>Error</p>
  {/await}

</section>