<script lang="ts">
	import LoadingSpinner from '$lib/components/ui/LoadingSpinner.svelte';
  import SelectStylist from './(components)/SelectStylist.svelte'
  import SelectCustomer from './(components)/SelectCustomer.svelte'
  
  import Button from "$lib/components/ui/button/button.svelte";
  import { enhance } from "$app/forms";
	import Input from "$lib/components/ui/input/input.svelte";
	import Label from "$lib/components/ui/label/label.svelte";
	import { createGradientAvatar } from "$lib/client/utils";


    export let data
    export let form


</script>

{#await data.all}
    <LoadingSpinner />
{:then all}

  <!-- <div class="w-full h-full flex gap-2">
    <form action="" class="w-full h-full">
      <div class="w-full h-full grid grid-cols-3 py-8 px-6 gap-2">
          {#if all.stylists}
            <SelectStylist stylists={all.stylists} />
          {/if}
          <SelectCustomer />
      </div>
    </form>
  </div> -->

<div class="flex flex-col gap-2 sm:gap-0 sm:flex-row sm:justify-between px-4 sm:px-8 pt-4 pb-2 bg-gray-50">
  <div>
      <h3 class="text-lg font-medium">Add New Transaction</h3> 
      <p class="text-sm text-muted-foreground">Fill the form to add new transaction</p>
  </div>
</div>

<div class="bg-gray-50 w-full h-full">
  <!-- <div class="flex w-full max-w-screen-md h-fit border-b pt-4 pb-6 px-4 flex-col"> -->
  <div class="flex w-full h-fit border-b pt-4 pb-6 px-4 flex-col">
    <div class="grid grid-cols-1 xl:grid-cols-6 h-full w-full bg-white rounded-xl">

        <div class="w-full col-span-4 py-4 px-8 max-w-screen-md">
            <form class="w-full" method="POST" action="?/updateUserProfile" use:enhance>
                <div class="flex flex-col items-center space-y-4 w-full">
                    <div class="grid w-full  items-center gap-1.5">
                        <Label for="stylist">Stylist</Label>
                        <Input type="text" id="stylist" name="stylist" placeholder="Stylist" autocomplete="stylist"  required />

                        <div class="flex flex-grow gap-2 overflow-x-auto whitespace-nowrap pt-1 pb-2">
                          <div class="relative grid select-none items-center whitespace-nowrap rounded-full bg-gray-50 border px-4 py-2.5 font-sans text-xs font-bold uppercase text-gray-900">
                            <div class="absolute top-2/4 left-2 h-5 w-5 -translate-y-2/4">
                              <img alt="Tania Andrew"
                                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1480&amp;q=80"
                                class="relative inline-block h-full w-full -translate-x-0.5 !rounded-full  object-cover object-center" />
                            </div>
                            <span class="ml-[18px]">
                              <p class="block font-sans text-sm antialiased font-medium leading-none text-gray-900 capitalize">
                                Tania Andrew
                              </p>
                            </span>
                          </div> 

                          <div class="relative grid select-none items-center whitespace-nowrap rounded-full bg-gray-900 px-4 py-2.5 font-sans text-xs font-bold uppercase text-white">
                            <div class="absolute top-2/4 left-2 h-5 w-5 -translate-y-2/4">
                              <img alt="Tania Andrew"
                                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1480&amp;q=80"
                                class="relative inline-block h-full w-full -translate-x-0.5 !rounded-full  object-cover object-center" />
                            </div>
                            <span class="ml-[18px]">
                              <p class="block font-sans text-sm antialiased font-medium leading-none text-white capitalize">
                                Gojo Sitorus
                              </p>
                            </span>
                          </div> 
                        </div>

                    </div>
                    <div class="grid w-full  items-center gap-1.5">
                        <Label for="name">Treatment</Label>
                        <Input type="text" id="treatment" name="treatment" placeholder="Treatment" />

                        <div class="flex flex-grow gap-2 overflow-x-auto whitespace-nowrap pt-1 pb-2">
                          <div class="relative grid select-none items-center whitespace-nowrap rounded-xl bg-gray-50 border px-4 py-2.5 font-sans text-xs font-bold text-gray-900">
                            <div class="">
                              <h3 class="text-sm font-semibold text-blue-600 ">
                                Pangkas-1
                              </h3>
                              <div class="flex items-center mt-1 justify-start gap-2">
                                <p class="flex items-center gap-x-1 mt-1 text-sm text-gray-800 font-semibold">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-lime-600">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                                    </svg>                  
                                    100.000
                                <!-- {treatment.price.toLocaleString("id-ID", { style: 'currency', currency: 'IDR' }).split(',').at(0)} -->
                                </p>
                                <p class="flex items-center gap-x-1 mt-1 text-sm text-gray-600 font-semibold">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-pink-500">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                                    </svg>                  
                                10 Point
                                </p>
                            </div>
                            </div>
                          </div> 

                          <div class="relative grid select-none items-center whitespace-nowrap rounded-xl bg-gray-900 border px-4 py-2.5 font-sans text-xs font-bold text-gray-900">
                            <div class="">
                              <h3 class="text-sm font-semibold text-blue-300 ">
                                Pangkas-2
                              </h3>
                              <div class="flex items-center mt-1 justify-start gap-2">
                                <p class="flex items-center gap-x-1 mt-1 text-sm text-white font-semibold">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-lime-400">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                                    </svg>                  
                                    150.000
                                </p>
                                <p class="flex items-center gap-x-1 mt-1 text-sm text-white font-semibold">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-pink-300">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                                    </svg>                  
                                20 Point
                                </p>
                            </div>
                            </div>
                          </div> 


                        </div>

                    </div>
                    <div class="grid w-full  items-center gap-1.5">
                        <Label for="name">Customer</Label>
                      <div class="flex justify-between">
                        <div class="flex flex-col rounded-xl py-2 px-4 bg-white border border-gray-200 w-fit">
                          <div class="flex items-center gap-x-4">
                            <img class="rounded-full size-8" src={createGradientAvatar()} alt="stylist avatar">
                            <div class="grow">
                              <h3 class="font-medium text-sm text-gray-800">
                                Customer
                              </h3>
                              <div class="grid grid-cols-2 gap-1.5">
                                <p class="text-xs text-gray-500">
                                  cust-id
                                </p>
                                <p class="text-xs text-gray-500">
                                  081677661129
                                </p>
                                <p class="text-xs text-gray-500">
                                  80 Point
                                </p>
                                <p class="text-xs text-gray-500">
                                  4 Transactions
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <Button type="button" variant="secondary" class="underline" > Search </Button>
                      </div>

                    </div>
                    <div class="grid w-full  items-center gap-1.5">
                        <Label for="name">Discount by Point</Label>
                        <Input type="number" id="discount" name="discount" placeholder="Discount" />

                        <div class="flex flex-grow gap-2 overflow-x-auto whitespace-nowrap pt-1 pb-2">
                          <div class="relative grid select-none items-center whitespace-nowrap rounded-xl bg-gray-50 border px-4 py-2.5 font-sans text-xs font-bold text-gray-900">
                            <div class="">
                              <h3 class="text-sm font-semibold text-indigo-600">
                                Potongan Harga 30%
                              </h3>
                              <div class="flex items-center mt-1 justify-start gap-2">
                                <p class="flex items-center gap-x-1 mt-1 text-sm text-gray-600 font-semibold">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4 text-gray-600">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                  </svg>                                                
                                10 Point
                                </p>
                            </div>
                            </div>
                          </div> 

                          <div class="relative grid select-none items-center whitespace-nowrap rounded-xl bg-gray-900 border px-4 py-2.5 font-sans text-xs font-bold text-gray-900">
                            <div class="">
                              <h3 class="text-sm font-semibold text-indigo-300">
                                Potongan Harga 30%
                              </h3>
                              <div class="flex items-center mt-1 justify-start gap-2">
                                <p class="flex items-center gap-x-1 mt-1 text-sm text-gray-100 font-semibold">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4 text-gray-200">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                  </svg>                                                
                                10 Point
                                </p>
                            </div>
                            </div>
                          </div> 

                        </div>

                    </div>
                </div>
            </form>
        </div>

        <div class="w-full col-span-2 py-4 px-8 gap-y-2 flex flex-col border rounded-lg bg-gray-50">

          <div class="flex flex-col rounded-xl p-2 bg-white border border-gray-200">
            <div class="flex items-center gap-x-4">
              <img class="rounded-full size-8" src={createGradientAvatar()} alt="stylist avatar">
              <div class="grow">
                <h3 class="font-medium text-sm text-gray-800">
                  Gojo Sitorus
                </h3>
                <p class="text-xs text-gray-500">
                  Stylist-2
                </p>
              </div>
            </div>
          </div>

          <div class="flex flex-col rounded-xl p-2 bg-white border border-gray-200">
            <div class="flex items-center gap-x-4">
              <img class="rounded-full size-8" src={createGradientAvatar()} alt="stylist avatar">
              <div class="grow">
                <h3 class="font-medium text-sm text-gray-800">
                  Customer
                </h3>
                <p class="text-xs text-gray-500">
                  cust-id
                </p>
              </div>
            </div>
          </div>

          <div class="flex flex-col rounded-xl p-4 gap-y-2 bg-white border border-gray-200">
            <p class="font-semibold text-sm flex justify-between">
              Normal Price
              <span>Rp 100.000</span>
            </p>
            <hr>
            <p class="font-semibold text-sm flex justify-between">
              Total Discount
              <span>Rp 20.000</span>
            </p>
            <hr>
            <p class="font-semibold text-sm flex justify-between">
              Total Price
              <span>Rp 80.000</span>
            </p>
          </div>

          <div class="w-full">
            <Button class="w-full" type="submit">Submit</Button>
          </div>

        </div>
        
    </div>
</div>
</div>



{:catch}
    <p>error..</p>
{/await}