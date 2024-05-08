<script lang="ts">
    import * as Table from "$lib/components/ui/table"
	import Button from '$lib/components/ui/button/button.svelte';
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
	import type { Customers } from '@prisma/client';
	import type { ActionData } from "../$types";
	import AddMember from "./AddMember.svelte";
	import * as AlertDialog from "$lib/components/ui/alert-dialog";
	import InputError from "$lib/components/ui/InputError.svelte";
	import { enhance } from "$app/forms";

    export let member: Customers|null
    export let form: ActionData

    let isOpen = false
    let isAlertDeleteOpen = false

</script>

        <Table.Row>
          <Table.Cell class="font-medium">1</Table.Cell>
          <Table.Cell> {member?.name} </Table.Cell>
          <Table.Cell> {member?.phone} </Table.Cell>
          <Table.Cell class="font-bold"> {member?.total_point} </Table.Cell>
          <Table.Cell>
              <DropdownMenu.Root>
                  <DropdownMenu.Trigger asChild let:builder>
                        <Button variant="outline" builders={[builder]}>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />
                          </svg>
                      </Button>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content class="w-56">
                    <!-- <DropdownMenu.Label>Action</DropdownMenu.Label> -->
                    <DropdownMenu.Separator />
                    <DropdownMenu.RadioGroup>
                      <DropdownMenu.Item>
                          <Button type="button" class="w-full">Edit</Button>
                      </DropdownMenu.Item>

                      <form action="?/deleteMember" method="POST" use:enhance>
                          <DropdownMenu.Item>
                              <input type="text" name="id" id="id" class="hidden" value={member?.id}>
                              <Button type="button" class="w-full" variant="destructive">Delete</Button>
                            </DropdownMenu.Item>
                      </form>
                    </DropdownMenu.RadioGroup>
                  </DropdownMenu.Content>
              </DropdownMenu.Root>
          </Table.Cell>
        </Table.Row>


        <!-- <AddMember {isOpen} {member} {form} onClose={() => {isOpen = false}} formAction={"?/editMember"} /> -->

      <!-- <AlertDialog.Root open={isAlertDeleteOpen}>
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
                      <input type="text" name="id" id="id" class="hidden" value={member?.id}>
                      <AlertDialog.Action type="submit" class="bg-destructive">
                          Continue
                      </AlertDialog.Action>
                  </form>
              </AlertDialog.Footer>
              <AlertDialog.Footer>
                  {#if form?.errors}
                      <div class="w-full flex items-center justify-center">
                          <InputError messages={''} />
                      </div>
                  {/if}
              </AlertDialog.Footer>
          </AlertDialog.Content>
      </AlertDialog.Root> -->