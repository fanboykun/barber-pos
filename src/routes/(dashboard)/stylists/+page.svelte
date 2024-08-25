<script lang="ts">
	import { toast } from 'svelte-sonner';
    import PageHeading from './(components)/PageHeading.svelte'
	import StylistList from './(components)/StylistList.svelte';
	import LoadingSpinner from '$lib/components/ui/LoadingSpinner.svelte';
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