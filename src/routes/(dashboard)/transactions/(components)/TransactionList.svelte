<script lang="ts">
	import type { Transactions } from "@prisma/client";
	import type { ActionData } from "../$types";
	import { page } from "$app/stores";
	import { formatCurrency, formatDay, formatTime } from "$lib/client/utils";
	// import type { getAllTransactionsWithPagination } from "$lib/server/functions/transaction";

    export let transactions: typeof $page.data.transactions
    // export let transactions: typeof getAllTransactionsWithPagination
    // export let count: number|null = 0
    export let form: ActionData

    let selectedTransaction: Transactions|null = null   // transaction to edit or delete
    let isOpen = false  // transaction form state
    let isAlertDeleteOpen = false   // delete transaction dialog state

    /** function to manipulate state and data for form and delete dialog/modal */
    const changeDialogState = (dialog: "form"|"delete", state: boolean, transaction: Transactions|null = null) => {
        selectedTransaction = transaction
        if(dialog == "form") { isOpen = state } 
        else if(dialog == "delete") { isAlertDeleteOpen = state }
    }




</script>

<!-- Table Section -->
<div class="max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto py-4">
    <!-- Card -->
    <div class="flex flex-col">
      <div class="-m-1.5 overflow-x-auto">
        <div class="p-1.5 min-w-full inline-block align-middle">
          <div class="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-neutral-800 dark:border-neutral-700">
  
            <!-- Table -->
            <table class="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">

              <thead class="bg-gray-50 dark:bg-neutral-800">
                <tr>
                  
  
                  <th scope="col" class="px-6 pe-6 py-3 text-start">
                    <div class="flex items-center gap-x-2">
                      <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                        Stylist
                      </span>
                    </div>
                  </th>
  
                  <th scope="col" class="px-6 py-3 text-start">
                    <div class="flex items-center gap-x-2">
                      <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                        Treatment
                      </span>
                    </div>
                  </th>
  
                  <th scope="col" class="px-6 py-3 text-start">
                    <div class="flex items-center gap-x-2">
                      <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                        Customer
                      </span>
                    </div>
                  </th>

                  <th scope="col" class="px-6 py-3 text-start">
                    <div class="flex items-center gap-x-2">
                      <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                        Discount
                      </span>
                    </div>
                  </th>
  
                  <th scope="col" class="px-6 py-3 text-start">
                    <div class="flex items-center gap-x-2">
                      <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                        Price
                      </span>
                    </div>
                  </th>
  
                  <th scope="col" class="px-6 py-3 text-start">
                    <div class="flex items-center gap-x-2">
                      <span class="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                        Created
                      </span>
                    </div>
                  </th>
  
                  <th scope="col" class="px-6 py-3 text-end"></th>
                </tr>
              </thead>
  
              <tbody class="divide-y divide-gray-200 dark:divide-neutral-700">
                {#each transactions as transaction}
                <tr>


                  <td class="size-px whitespace-nowrap">
                    <div class="px-6 py-3">
                      <div class="flex items-center gap-x-3">
                        <img class="inline-block size-[38px] rounded-full" src="https://images.unsplash.com/photo-1531927557220-a9e23c1e4794?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80" alt="Image Description">
                        <div class="grow">
                          <span class="block text-sm font-semibold text-gray-800 dark:text-neutral-200">{transaction.stylist.name}</span>
                          <span class="block text-sm text-gray-500 ">{transaction.stylist?.code ?? ''}</span>
                        </div>
                      </div>
                    </div>
                  </td>

                  <td class="h-px w-72 whitespace-nowrap">
                    <div class="px-6 py-3">
                      {#each transaction.transactionDetails as detail }
                      <span class="block text-sm font-semibold text-gray-800 dark:text-neutral-200">{detail.treatment.name}</span>
                      <span class="block text-xs text-gray-500 ">{detail.treatment.price.toLocaleString('id-ID', {  style: 'currency', currency: 'IDR' }).split(',').at(0)} <span>&#9702;</span> {detail.treatment.point} Point</span>
                      {/each}
                    </div>
                  </td>

                  <td class="size-px whitespace-nowrap">
                    <div class="px-6 py-3">
                      {#if transaction.customer}
                      <span class="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium bg-teal-100 text-teal-800 rounded-full">
                        {transaction.customer.name}
                      </span>
                      {:else}
                      <span class="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium bg-red-100 text-red-600 rounded-full">
                        Guest
                      </span>
                      {/if}
                    </div>
                  </td>

                  <td class="h-px w-72 whitespace-nowrap">
                    <div class="px-6 py-3">
                      <span class="block text-sm font-semibold text-gray-800 dark:text-neutral-200">{ formatCurrency(transaction.totalDiscount)}</span>
                      {#if transaction.point }
                      <span class="block text-xs text-gray-500 ">{transaction.point?.minimum} Point <span>&#9702;</span> {transaction.point?.discount} %</span>
                      {/if}
                    </div>
                  </td>

                  <td class="size-px whitespace-nowrap">
                    <div class="px-6 py-3">
                      <div class="flex items-center gap-x-3">
                        <span class="text-sm text-gray-900 font-semibold">
                          {formatCurrency(transaction.totalPrice)}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td class="h-px w-72 whitespace-nowrap">
                    <div class="px-6 py-3">
                      <span class="block text-xs text-gray-500 ">{formatDay(transaction.createdAt)}</span>
                      <span class="block text-xs text-gray-500 ">{formatTime(transaction.createdAt)}</span>
                    </div>
                  </td>
                  
                  <td class="size-px whitespace-nowrap">
                    <div class="px-6 py-1.5 flex gap-x-2">
                      <button type="button" class="flex text-sm p-2 bg-blue-100 rounded-xl text-blue-600 decoration-2 hover:underline font-medium dark:text-blue-500" >
                        Edit
                      </button>
                      <button type="button" class="text-sm p-2 bg-red-100 rounded-xl text-red-600 decoration-2 hover:underline font-medium flex items-center justify-center" >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                          <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                      </button>
                    </div>
                  </td>

                </tr>
                {/each}
  
              </tbody>
            </table>
            <!-- End Table -->
  
           <slot />
          </div>
        </div>
      </div>
    </div>
    <!-- End Card -->
  </div>
  <!-- End Table Section -->




