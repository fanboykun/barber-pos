<script lang="ts">
	import Input from "$lib/components/ui/input/input.svelte";
	import Label from "$lib/components/ui/label/label.svelte";
	import type { transactionDetails, Treatments } from "@prisma/client";

    export let treatments: Treatments[]
    export let setTreatment: Function
    export let treatment: Treatments | undefined = undefined
    
    let selectedTreatment: Treatments
    if(treatment) {
      selectedTreatment = treatment     
      setTreatment(selectedTreatment)
    }
</script>
<div class="grid w-full  items-center gap-1.5">
    <Label for="name">Treatment</Label>
    <!-- <Input type="text" id="treatment" name="treatment" placeholder="Treatment" /> -->

    <div class="flex flex-grow gap-2 overflow-x-auto whitespace-nowrap pt-1 pb-2">
        {#each treatments as treatment}
        <button type="button" on:click={() => { setTreatment(treatment); selectedTreatment = treatment } } class="relative grid select-none items-center whitespace-nowrap rounded-xl border px-4 py-2.5 font-sans text-xs font-bold shadow-md transition-all {selectedTreatment?.id == treatment.id ? 'text-white bg-gray-900' : 'text-gray-900 bg-gray-50'} ">
          <div>
            <h3 class="text-sm font-semibold text-left text-blue-600 {selectedTreatment?.id == treatment.id ? 'text-blue-300' : 'text-blue-600'}">
              {treatment.name}
            </h3>
            <div class="flex items-center mt-1 justify-start gap-2">
              <p class="flex items-center gap-x-1 mt-1 text-sm font-semibold">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-lime-600">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                </svg>                  
                {treatment.price.toLocaleString("id-ID", { style: 'currency', currency: 'IDR' }).split(',').at(0)}
              </p>
              <p class="flex items-center gap-x-1 mt-1 text-sm font-semibold">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-pink-500">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                </svg>                  
                {treatment.point} Point
              </p>
            </div>
          </div>
        </button> 
        {/each}
    </div>

</div>