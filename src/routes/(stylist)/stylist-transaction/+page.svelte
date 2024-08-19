<script lang="ts">
	import { goto } from '$app/navigation';
	import LoadingSpinner from '$lib/components/ui/LoadingSpinner.svelte';
	import { onMount } from 'svelte';
	import TransactionList from '../(components)/TransactionList.svelte';

	export let data
	export let form
	// onMount(async() => {
	// 	const p = await data.pagination
	// 	console.log(p)
	// 	if(p.currentPage > 1) {
	// 		return goto('/stylist-transaction')
	// 	}
	// })
  const movePagination = (direction: 'next'|'prev' = 'next') => {
    let destination = data.pagination.currentPage
    if( direction == 'next' && destination + 1 <= data.pagination.maxPages ) {
      destination += 1
    }else if( direction == 'prev' && destination - 1 > 1 ) {
      destination -= 1
    }else if(direction == 'prev' && destination - 1 <= 1) {
      return goto('/transactions')
    }
    return goto(`/transactions?page=${destination}`)
  }
</script>

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
			<button type="button" on:click={() => {movePagination('prev')}} disabled={data.pagination.currentPage - 1 == 0} class="py-1.5 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800">
			  <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
			  Prev
			</button>

			<button type="button" on:click={() => {movePagination('next')}} disabled={data.pagination.currentPage + 1 > data.pagination.maxPages} class="py-1.5 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800">
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

