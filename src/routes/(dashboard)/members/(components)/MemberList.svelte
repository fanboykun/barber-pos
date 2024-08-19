<script lang="ts">
	import * as Table from '$lib/components/ui/table';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import type { Customers } from '@prisma/client';
	import type { ActionData } from '../$types';
	import AddMember from './AddMember.svelte';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import InputError from '$lib/components/ui/InputError.svelte';
	import { enhance } from '$app/forms';
	import Input from '$lib/components/ui/input/input.svelte';

	export let members: Customers[];
	export let form: ActionData;

	let isOpen = false;
	let isAlertDeleteOpen = false;
	let selectedMember: Customers | null = null;
    let search = ''

	const changeDialogState = (
		dialog: 'form' | 'delete',
		state: boolean,
		member: Customers | null = null
	) => {
		selectedMember = member;
		if (dialog == 'form') {
			isOpen = state;
		} else if (dialog == 'delete') {
			isAlertDeleteOpen = state;
		}
	};

    $: memberList = members
    $: {
        if(search != '') { searchMember(search) }
        else { memberList = members }
    }

    /** client side data searching based on treatment name */
    function searchMember(s: string) {
        const f = members.filter((v) => {
            return v.name.toLowerCase().includes(s.toLowerCase())
        })
        memberList = f
    }
</script>

    <div class="grid grid-cols-1 gap-x-2 w-full px-8 py-2 rounded-md bg-gray-50">
        <Input placeholder="search member by name" type="search" bind:value={search} />
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-4">
            {#each memberList as member}
            <div class="w-auto bg-gray-100 border border-gray-200 rounded-lg shadow mr-4 mt-4">
                <div class="flex w-full justify-end gap-x-2 px-4 pt-4 pb-2">
                    <Button type="button" variant="outline">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>                      
                    </Button>

                    <DropdownMenu.Root>
                        <DropdownMenu.Trigger asChild let:builder>
                            <Button variant="outline" builders={[builder]}>
                                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                                    <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
                                </svg>
                            </Button>
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Content class="w-56">
                        <DropdownMenu.Label>Action</DropdownMenu.Label>
                        <DropdownMenu.Separator />
                            <DropdownMenu.Item>
                                <Button type="button" class="w-full" on:click={() => changeDialogState("form", true, member)}>Edit</Button>
                            </DropdownMenu.Item>
                            <DropdownMenu.Item>
                                <Button type="button" class="w-full" variant="destructive" on:click={() => changeDialogState("delete", true, member)}>Delete</Button>
                            </DropdownMenu.Item>
                        </DropdownMenu.Content>
                    </DropdownMenu.Root>
                </div>

                <div class="flex flex-col items-center pb-10">
                    <!-- <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50">
                        <path d="M 25 2.0078125 C 12.309296 2.0078125 2.0000002 12.317108 2 25.007812 C 2 37.112262 11.38131 47.043195 23.259766 47.935547 C 23.283185 47.93745 23.306613 47.939576 23.330078 47.941406 C 23.882405 47.981205 24.437631 48.007812 25 48.007812 C 25.562369 48.007812 26.117595 47.981205 26.669922 47.941406 C 26.693387 47.939576 26.716815 47.93745 26.740234 47.935547 C 38.61869 47.043195 48 37.112262 48 25.007812 C 48 12.317108 37.690704 2.0078125 25 2.0078125 z M 25 4.0078125 C 36.609824 4.0078125 46 13.397988 46 25.007812 C 46 30.739515 43.704813 35.924072 39.990234 39.710938 C 38.401074 38.55372 36.437194 37.863387 34.677734 37.246094 C 32.593734 36.516094 30.622172 35.824094 30.076172 34.621094 C 29.990172 33.594094 29.997859 32.792094 30.005859 31.871094 L 30.007812 31.480469 C 30.895813 30.635469 32.012531 28.852078 32.394531 27.205078 C 33.054531 26.853078 33.861516 26.009281 34.103516 23.988281 C 34.224516 22.985281 33.939062 22.2085 33.539062 21.6875 C 34.079062 19.8325 35.153484 15.136469 33.271484 12.105469 C 32.475484 10.824469 31.274313 10.016266 29.695312 9.6972656 C 28.808312 8.5992656 27.134484 8 24.896484 8 C 21.495484 8.063 19.002234 9.1047031 17.490234 11.095703 C 15.707234 13.445703 15.370328 16.996297 16.486328 21.654297 C 16.073328 22.175297 15.775438 22.963328 15.898438 23.986328 C 16.141438 26.007328 16.945469 26.851125 17.605469 27.203125 C 17.987469 28.852125 19.103188 30.635469 19.992188 31.480469 L 19.994141 31.861328 C 20.002141 32.786328 20.009828 33.590094 19.923828 34.621094 C 19.375828 35.827094 17.394781 36.526625 15.300781 37.265625 C 13.551886 37.88319 11.599631 38.574586 10.013672 39.716797 C 6.2962191 35.929504 4 30.742023 4 25.007812 C 4.0000002 13.397989 13.390176 4.0078125 25 4.0078125 z"></path>
                    </svg> -->
                    <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">{member?.name}</h5>
                    <span class="text-sm text-gray-500 dark:text-gray-400">{member?.phone}</span>
                        <div class="flex mt-4 md:mt-6">
                            <a href="/members" class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-black rounded-lg ">Point : {member?.total_point}</a>
                        </div>
                </div>
            </div>
            {/each}
        </div>    

<AddMember {isOpen} member={selectedMember} {form} onClose={() => changeDialogState("form", false)} formAction={"?/editMember"} />

<AlertDialog.Root open={isAlertDeleteOpen} onOpenChange={() => changeDialogState('delete', false)}>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
			<AlertDialog.Description>
				This action cannot be undone. This will permanently the member data
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
			<form action="?/deleteMember" method="POST" use:enhance>
				<input type="text" name="id" id="id" class="hidden" value={selectedMember?.id} />
				<AlertDialog.Action type="submit" class="bg-destructive">Continue</AlertDialog.Action>
			</form>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
