<script lang="ts">
	import Label from "$lib/components/ui/label/label.svelte";
	import type { Points } from "@prisma/client";

  export let points: Points[]
  export let currentPoint: number = 0
  export let setDiscount: Function

  let selectedPoint: Points|null
</script>

<div class="grid w-full  items-center gap-1.5">
    <Label for="name">Discount by Point</Label>
    <div class="flex flex-grow gap-2 overflow-x-auto whitespace-nowrap pt-1 pb-2">
      {#each points as point}
        <button type="button" on:click={() => { setDiscount(point); selectedPoint = point } } disabled={currentPoint < point.minimum} class="relative grid select-none items-center whitespace-nowrap rounded-xl border px-4 py-2.5 font-sans text-xs font-bold transition-all disabled:cursor-not-allowed {selectedPoint?.id == point.id ? 'text-white bg-gray-900' : 'text-gray-900 bg-gray-50' } {currentPoint < point.minimum ? 'opacity-50' : ''}">
          <div class="">
            <h3 class="text-sm font-semibold text-left {selectedPoint?.id == point.id ? 'text-indigo-300' : 'text-indigo-600' }">
              {point.name}
            </h3>
            <div class="flex items-center mt-1 justify-start gap-2">
              <p class="flex items-center gap-x-1 mt-1 text-sm font-semibold">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>                                                
              {point.minimum} Point
              </p>
          </div>
          </div>
        </button> 
      {/each}


    </div>
</div>