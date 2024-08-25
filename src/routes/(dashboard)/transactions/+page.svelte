<script lang="ts">
	import { toast } from 'svelte-sonner';
  import PageHeading from './(components)/PageHeading.svelte'
	import LoadingSpinner from '$lib/components/ui/LoadingSpinner.svelte';
	import TransactionList from './(components)/TransactionList.svelte';
	import { goto } from '$app/navigation';

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
    <PageHeading />

    
    {#await data.transactions}
       <LoadingSpinner />
    {:then transactions}
        {#if transactions}
            <TransactionList {transactions} {form} >
                 <!-- Footer -->
             {#if data.transactionCount && data.transactionCount > 0}
             <div class="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-t border-gray-200 dark:border-neutral-700">
               <div>
                 <p class="text-sm text-gray-600 dark:text-neutral-400">
                  showing 
                  <span class="font-semibold text-gray-800 dark:text-neutral-200">{data.pagination.showing.from}</span>
                  to
                  <span class="font-semibold text-gray-800 dark:text-neutral-200">{data.pagination.showing.to}</span>
                  of
                  <span class="font-semibold text-gray-800 dark:text-neutral-200">{data.pagination.showing.of}</span>
                  results
                 </p>
               </div>
   
               <div>
                 <div class="inline-flex gap-x-2">
                   <button type="button" on:click={() => goto(data.pagination.prevPageUrl)} disabled={!data.pagination.canGoPrev} class="py-1.5 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800">
                     <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                     Prev
                   </button>
   
                   <button type="button" on:click={() => goto(data.pagination.nextPageUrl) } disabled={!data.pagination.canGoNext} class="py-1.5 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800">
                     Next
                     <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                   </button>
                 </div>
               </div>
             </div>
             {/if}
            <!-- End Footer -->
            </TransactionList>
        {/if}
    {:catch}
        <p>Error</p>
    {/await}
        
</section>