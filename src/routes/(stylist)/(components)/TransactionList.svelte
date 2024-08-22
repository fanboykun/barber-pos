<script lang="ts">
    import { formatCurrency, formatDay, formatTime } from "$lib/client/utils";
    import type { AllTransactionWithPagination } from "$lib/types";
    import { enhance } from "$app/forms";
    import type { ActionData } from "../stylist/$types";

    export let transactions: Exclude<AllTransactionWithPagination, null>

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




