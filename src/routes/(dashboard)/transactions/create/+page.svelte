<script lang="ts">
	import type { Treatments } from "@prisma/client";
	import type { Customers } from "@prisma/client";
  import type { User } from "@prisma/client";
  import type { Points } from "@prisma/client";

	import LoadingSpinner from '$lib/components/ui/LoadingSpinner.svelte';
  
  import Button from "$lib/components/ui/button/button.svelte";
  import { enhance } from "$app/forms";
	import { createGradientAvatar } from "$lib/client/utils";
	import SelectStylist from './(components)/SelectStylist.svelte';
	import SelectTreatments from './(components)/SelectTreatments.svelte';
	import SelectCustomer from './(components)/SelectCustomer.svelte';
	import SelectDiscount from './(components)/SelectDiscount.svelte';
	import type { SubmitFunction } from "@sveltejs/kit";
	import { goto } from "$app/navigation";
  
  export let data
  export let form
  let isTransactionSubmitable = false


  let selectedStylist: User|null
  let selectedTreatment: Treatments|null
  let selectedCustomer: Customers|null
  let selectedPoint: Points|null
  let totalPrice: number = 0
  let normalPrice: number = 0
  let totalDiscount: number = 0
  
  let currentPoint: number = 0

  function setStylist(stylist: User|null) {
    selectedStylist = stylist
  }

  function setTreatment(treatment: Treatments|null) {
    selectedTreatment = treatment
    if(treatment == null) return
    normalPrice = treatment.price
    totalPrice = treatment.price
    calculateDiscount()
  }

  function setCustomer(customer: Customers|null) {
    selectedCustomer = customer
    if(!customer) {
      currentPoint = 0  // reset point when customer resetted
      totalDiscount = 0 // reset discount when customer resetted
      totalPrice = normalPrice  // reset the price
      setDiscount(null) // reset the selected point 
    } else {
      currentPoint  = customer?.total_point
    }
    calculateDiscount()
  }

  function setDiscount(point: Points|null) {
    selectedPoint = point
    if(!point) {
      totalDiscount = 0 // reset discount when point/discount resetted
      totalPrice = normalPrice  // reset the price after point/discount resetted
    }
    calculateDiscount()
  }

  function calculateDiscount() {
    if(currentPoint == 0) return
    if(normalPrice == 0 || totalPrice == 0 || selectedPoint == null) return
    totalDiscount = normalPrice * selectedPoint.discount / 100
    totalPrice = normalPrice - totalDiscount
  }

  const handleCreateTransaction: SubmitFunction = ( { formData, cancel } ) => {
    if(selectedStylist == null && selectedTreatment == null && normalPrice == 0 && totalPrice == 0) { return cancel() } 
    if(selectedStylist != null) {
      formData.append('stylistId', selectedStylist.id as string)
    }
    if(selectedCustomer != null) {
      formData.append('customerId', selectedCustomer.id as string)
    }
    if(selectedTreatment != null) {
      formData.append('treatmentId', selectedTreatment.id as string)
      formData.append('totalPoint', selectedTreatment.point as unknown as string)
    }
    if(selectedPoint != null) {
      formData.append('pointId', selectedPoint.id as string)
    }
    formData.append('normalPrice', normalPrice as unknown as string)
    formData.append('totalDiscount', totalDiscount as unknown as string)
    formData.append('totalPrice', totalPrice as unknown as string)

    return async ( {result} ) => {
      if(result.type == "error" || result.type == "failure" ) return
      return goto('/transactions')
    }
  }

  $: if(selectedStylist != null && selectedTreatment != null && normalPrice != 0 && totalPrice != 0) { isTransactionSubmitable = true }


</script>

{#await data.all}
    <LoadingSpinner />
{:then all}


<div class="flex flex-col gap-2 sm:gap-0 sm:flex-row sm:justify-between px-4 sm:px-8 pt-4 pb-2 bg-gray-50">
  <div>
      <h3 class="text-lg font-medium">Add New Transaction</h3> 
      <p class="text-sm text-muted-foreground">Fill the form to add new transaction</p>
  </div>
</div>

<div class="bg-gray-50 w-full h-full">
  <div class="flex w-full h-fit border-b pt-4 pb-6 px-4 flex-col">
    <div class="grid grid-cols-1 xl:grid-cols-6 h-full w-full bg-white rounded-xl">

        <div class="w-full col-span-4 py-4 px-8 max-w-screen-md">
            <div class="w-full">
                <div class="flex flex-col items-center space-y-4 w-full">
                  {#if all.stylists}
                    <SelectStylist stylists={all.stylists} {setStylist} />
                  {/if}
                  {#if all.treatments}
                    <SelectTreatments treatments={all.treatments} {setTreatment}/>
                  {/if}
                  <SelectCustomer {setCustomer} />
                   {#if all.points}
                    <SelectDiscount points={all.points} {currentPoint} {setDiscount} {selectedPoint} />
                   {/if}
                </div>
            </div>
        </div>

        <div class="w-full col-span-2 py-4 px-8 gap-y-2 flex flex-col border rounded-lg bg-gray-50">

          <h3 class="font-semibold">Transaction Summary</h3>

          {#if selectedStylist}
          <div class="flex flex-col rounded-xl p-2 bg-white border border-gray-200">
            <div class="flex items-center gap-x-4">
              <img class="rounded-full size-8" src={createGradientAvatar()} alt="stylist avatar">
              <div class="grow">
                <h3 class="font-medium text-sm text-gray-800">
                  {selectedStylist.name}
                </h3>
                <p class="text-xs text-gray-500">
                  {selectedStylist.code ?? ''}
                </p>
              </div>
            </div>
          </div>
          {/if}

          {#if selectedCustomer}
          <div class="flex flex-col rounded-xl p-2 bg-white border border-gray-200">
            <div class="flex items-center gap-x-4">
              <img class="rounded-full size-8" src={createGradientAvatar()} alt="stylist avatar">
              <div class="grow">
                <h3 class="font-medium text-sm text-gray-800">
                  {selectedCustomer.name}
                </h3>
                <p class="text-xs text-gray-500">
                  {selectedCustomer.phone}
                </p>
              </div>
            </div>
          </div>
          {:else}
          <div class="flex flex-col rounded-xl p-2 bg-white border border-gray-200">
            <div class="flex items-center gap-x-4">
              <img class="rounded-full size-8" src={createGradientAvatar()} alt="stylist avatar">
              <div class="grow">
                <h3 class="font-medium text-sm text-gray-800">
                  Guest
                </h3>
              </div>
            </div>
          </div>
          {/if}

          {#if selectedTreatment}
          <div class="flex flex-col rounded-xl p-2 bg-white border border-gray-200">
            <div class="flex items-center gap-x-4">
              <div class="flex flex-col grow px-2 gap-y-2">
                <h3 class="font-medium text-sm text-gray-800">
                  {selectedTreatment.name}
                </h3>
                <p class="text-xs font-semibold text-gray-500 flex gap-x-1">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-pink-500">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                  </svg>    
                  {selectedTreatment.point} Point
                </p>
              </div>
            </div>
          </div>
          {/if}

          <div class="flex flex-col rounded-xl p-4 gap-y-2 bg-white border border-gray-200">
            <p class="font-semibold text-sm flex justify-between">
              Normal Price
              <span>
                {normalPrice.toLocaleString("id-ID", { style: 'currency', currency: 'IDR' }).split(',').at(0)}
              </span>
            </p>
            <hr>
            <p class="font-semibold text-sm flex justify-between">
              Total Discount
              <span>
                {totalDiscount.toLocaleString("id-ID", { style: 'currency', currency: 'IDR' }).split(',').at(0)}
              </span>
            </p>
            <hr>
            <p class="font-semibold text-sm flex justify-between">
              Total Price
              <span>
                {totalPrice.toLocaleString("id-ID", { style: 'currency', currency: 'IDR' }).split(',').at(0)}
              </span>
            </p>
          </div>

          <div class="w-full">
            <form action="?/createTransaction" method="post" use:enhance={handleCreateTransaction}>
              <Button class="w-full disabled:cursor-not-allowed" type="submit" disabled={!isTransactionSubmitable} >Submit</Button>
            </form>
          </div>

        </div>
        
    </div>
</div>
</div>



{:catch}
    <p>error..</p>
{/await}