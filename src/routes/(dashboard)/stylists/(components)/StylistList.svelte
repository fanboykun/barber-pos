<script lang="ts">
	import type { User } from "@prisma/client";
	import type { ActionData } from "../$types";
    
	import * as AlertDialog from "$lib/components/ui/alert-dialog";
	import AddStylist from "./AddStylist.svelte";
	import InputError from "$lib/components/ui/InputError.svelte";
	import { enhance } from "$app/forms";
	import Input from "$lib/components/ui/input/input.svelte";
	import { createGradientAvatar } from "$lib/client/utils";
	import UpdateStylistPassword from "./UpdateStylistPassword.svelte";

    export let stylists: User[]
    export let form: ActionData
    
    let selectedStylist: User|null = null   // treatment to edit or delete
    let isOpen = false  // treatment form state
    let isAlertDeleteOpen = false   // delete treatment dialog state
    let isEditPasswordOpen = false // edit password form state
    let search = '' // search treatment input binding

    /** function to manipulate state and data for form and delete dialog/modal */
    const changeDialogState = (dialog: "form"|"delete"|"password", state: boolean, stylist: User|null = null) => {
        selectedStylist = stylist
        if(dialog == "form") { isOpen = state } 
        else if(dialog == "delete") { isAlertDeleteOpen = state }
        else if(dialog == "password") { isEditPasswordOpen = state }
    }

    $: stylistList = stylists
    $: {
        if(search != '') { searchTreatment(search) }
        else { stylistList = stylists }
    }

    /** client side data searching based on treatment name */
    function searchTreatment(s: string) {
        const f = stylists.filter((v) => {
            return v.name?.toLowerCase().includes(s.toLowerCase())
        })
        stylistList = f
    }

</script>
 <!-- Search -->
 <div class="flex gap-x-2 w-full px-4 sm:px-8 py-2 rounded-md bg-gray-50">
    <Input placeholder="search stylist by name" type="search" bind:value={search} />
 </div>
 
<div class="w-full py-4 px-4 mx-auto">
  <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
      {#each stylistList as stylist}
          <div class="flex flex-col rounded-xl p-4 md:p-6 bg-white border border-gray-200">
              <div class="flex items-center gap-x-4">
                <img class="rounded-full size-10" src={createGradientAvatar()} alt="stylist avatar">
                <div class="grow">
                  <h3 class="font-medium text-gray-800">
                    {stylist.name}
                  </h3>
                  <p class="text-xs uppercase text-gray-500">
                    Stylist
                  </p>
                </div>
              </div>
        
              <p class="mt-3 text-gray-500">
                {stylist.email}
              </p>
        
              <!-- Social Brands -->
              <div class="mt-3 flex items-center justify-between">
                <button type="button" on:click={() => changeDialogState("password", true, stylist)}>
                  <span class="py-1 px-2 inline-flex items-center gap-x-1 text-xs font-medium bg-teal-100 text-teal-800 rounded-full dark:bg-teal-500/10 dark:text-teal-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="flex-shrink-0 size-3">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                    </svg>                       
                    update password
                  </span>
                </button>
                <div class="flex space-x-1 justify-end">
                  <button type="button" on:click={() => changeDialogState("form", true, stylist)} class="inline-flex justify-center items-center size-8 text-sm font-semibold rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                      <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                  </svg>                  
                  </button>
                  <button type="button"  on:click={() => changeDialogState("delete", true, stylist)} class="inline-flex justify-center items-center size-8 text-sm font-semibold rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                      <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>                               
                  </button>
                  <a href={`stylists/${stylist.id}`} class="inline-flex justify-center items-center size-8 text-sm font-semibold rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>                  
                  </a>
                </div>
              </div>
              <!-- End Social Brands -->
          </div>
        {/each}
    </div>
</div> 

<AddStylist {isOpen} stylist={selectedStylist} {form} onClose={() => changeDialogState("form", false)} formAction={"?/editStylist"} />

<UpdateStylistPassword {form} isOpen={isEditPasswordOpen} stylist={selectedStylist} onClose={() => changeDialogState("password", false)} />

<AlertDialog.Root open={isAlertDeleteOpen} onOpenChange={() => changeDialogState("delete", false) }>
    <AlertDialog.Content>
        <AlertDialog.Header>
        <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
        <AlertDialog.Description>
            This action cannot be undone. This will permanently the stylist data
        </AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
            <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
            <form action="?/deleteStylist" method="POST" use:enhance>
                <input type="text" name="id" id="id" class="hidden" value={selectedStylist?.id}>
                <AlertDialog.Action type="submit" class="bg-destructive">
                    Continue
                </AlertDialog.Action>
            </form>
        </AlertDialog.Footer>
        <AlertDialog.Footer>
            {#if form?.errors?.message}
                <div class="w-full flex items-center justify-center">
                    <InputError messages={form?.errors?.message} />
                </div>
            {/if}
        </AlertDialog.Footer>
    </AlertDialog.Content>
</AlertDialog.Root>


