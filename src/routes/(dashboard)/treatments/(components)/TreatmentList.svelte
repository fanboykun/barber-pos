<script lang="ts">
	import type { Treatments } from "@prisma/client";
	import type { ActionData } from "../$types";
    
	import Button from "$lib/components/ui/button/button.svelte";
	import * as AlertDialog from "$lib/components/ui/alert-dialog";
	import AddTreatment from "./AddTreatment.svelte";
	import InputError from "$lib/components/ui/InputError.svelte";
	import { enhance } from "$app/forms";
	import Input from "$lib/components/ui/input/input.svelte";

    export let treatments: Treatments[]
    export let form: ActionData
    
    let selectedTreatment: Treatments|null = null   // treatment to edit or delete
    let isOpen = false  // treatment form state
    let isAlertDeleteOpen = false   // delete treatment dialog state
    let search = '' // search treatment input binding

    /** function to manipulate state and data for form and delete dialog/modal */
    const changeDialogState = (dialog: "form"|"delete", state: boolean, treatment: Treatments|null = null) => {
        selectedTreatment = treatment
        if(dialog == "form") { isOpen = state } 
        else if(dialog == "delete") { isAlertDeleteOpen = state }
    }

    $: treatmentList = treatments
    $: {
        if(search != '') { searchTreatment(search) }
        else { treatmentList = treatments }
    }

    /** client side data searching based on treatment name */
    function searchTreatment(s: string) {
        const f = treatments.filter((v) => {
            return v.name.toLowerCase().includes(s.toLowerCase())
        })
        treatmentList = f
    }

</script>
 <!-- Search -->
 <div class="flex gap-x-2 w-full px-4 sm:px-8 py-2 rounded-md bg-gray-50">
    <Input placeholder="search treatment by name" type="search" bind:value={search} />
 </div>
<div class="grid gap-4 px-4 sm:grid-cols-2">
    {#each treatmentList as treatment}
        <!-- Card List -->
        <div class="relative mt-4">
        
            <div class="bg-white h-full p-4 mt-4 transition duration-300 rounded-lg shadow border-t hover:bg-gray-50 hover:shadow-md ">
                <div class="flex">
                <div class="mt-1.5 flex justify-center flex-shrink-0 rounded-s-xl">
                    <svg class="size-5 text-gray-800" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M3 4.5h10a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1H3zM1 2a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 2zm0 12a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 14z"></path>
                    </svg>
                </div>
                <Button variant="outline" type="button" class="absolute top-0 -right-0 p-2" on:click={() => changeDialogState("form", true, treatment)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />
                    </svg>          
                </Button>
                <div class="grow ms-2 md:ms-4 lg:ms-6">
                    <h3 class="text-sm font-semibold text-blue-600 ">
                    {treatment.name}
                    </h3>
                    {#if treatment.sub_service != null}
                        <p class="flex gap-1 items-center text-sm text-gray-600">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                            </svg>                      
                            {treatment.sub_service}
                        </p>
                    {:else}
                        <p class="flex gap-1 items-center text-sm text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636" />
                            </svg>                      
                            No sub treatment
                        </p>
                    {/if}
                    <div class="flex items-center mt-1 justify-start gap-2">
                        <p class="flex items-center gap-x-1 mt-1 text-sm text-gray-800 font-semibold">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-lime-600">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                            </svg>                  
                        {treatment.price.toLocaleString("id-ID", { style: 'currency', currency: 'IDR' }).split(',').at(0)}
                        </p>
                        <p class="flex items-center gap-x-1 mt-1 text-sm text-gray-600 font-semibold">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-pink-500">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                            </svg>                  
                        {treatment.point} Point
                        </p>
                    </div>
                    <div class="flex items-center justify-between mt-1 gap-2">
                        <p class="flex items-center gap-x-1 mt-1 text-xs text-gray-500 font-semibold">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                            </svg>                      
                            {treatment.updatedAt.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                        <button type="button" class="bg-gray-200 rounded-lg shadow-lg px-1.5 py-1" on:click={() => changeDialogState("delete", true, treatment)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-red-500">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>                      
                        </button>
                    </div>
                </div>
                </div>
            </div>
        </div>
        <!-- End Card List -->
    {/each}
</div>  

<AddTreatment {isOpen} treatment={selectedTreatment} {form} onClose={() => changeDialogState("form", false)} formAction={"?/editTreatment"} />

<AlertDialog.Root open={isAlertDeleteOpen} onOpenChange={() => changeDialogState("delete", false) }>
    <AlertDialog.Content>
        <AlertDialog.Header>
        <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
        <AlertDialog.Description>
            This action cannot be undone. This will permanently the treatment data
        </AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
            <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
            <form action="?/deleteTreatment" method="POST" use:enhance>
                <input type="text" name="id" id="id" class="hidden" value={selectedTreatment?.id}>
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


