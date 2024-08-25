<script lang="ts">
	import { createGradientAvatar } from "$lib/client/utils";
	import Input from "$lib/components/ui/input/input.svelte";
	import Label from "$lib/components/ui/label/label.svelte";
  import type { User } from "@prisma/client";
  
  export let stylists: User[]
  export let setStylist: Function
  export let stylist: User | undefined = undefined
  let selectedStylist: User|null

  if(stylist) {
    selectedStylist = stylist
    setStylist(stylist)
  }



</script>

<div class="grid w-full  items-center gap-1.5">
  <Label for="stylist">Stylist</Label>
  <!-- <Input type="text" id="stylist" name="stylist" placeholder="Search Stylist" autocomplete="stylist"  required /> -->

  <div class="flex flex-grow gap-2 overflow-x-auto whitespace-nowrap pt-1 pb-2">

    {#each stylists as stylist}
    <button type="button" on:click={() => { setStylist(stylist); selectedStylist = stylist } } class="relative grid select-none items-center whitespace-nowrap rounded-full border px-4 py-2.5 font-sans text-xs font-bold uppercase transition-all {selectedStylist?.id == stylist.id ? 'bg-gray-900' : 'bg-gray-50'}">
      <div class="absolute top-2/4 left-2 h-5 w-5 -translate-y-2/4">
        <img alt="Tania Andrew"
          src="{createGradientAvatar()}"
          class="relative inline-block h-full w-full -translate-x-0.5 !rounded-full  object-cover object-center" />
      </div>
      <span class="ml-[18px]">
        <p class="block font-sans text-sm antialiased font-medium leading-none capitalize transition-all {selectedStylist?.id == stylist.id ? 'text-white' : 'text-gray-900'}">
          {stylist.name}
        </p>
      </span>
    </button> 
    {/each}

  </div>

</div>

