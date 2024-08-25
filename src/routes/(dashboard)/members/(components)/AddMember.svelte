<script lang="ts">
      import * as Dialog from "$lib/components/ui/dialog";
      import Label from "$lib/components/ui/label/label.svelte";
      import Input from "$lib/components/ui/input/input.svelte";
      import Button from "$lib/components/ui/button/button.svelte";
      import { enhance } from "$app/forms";
      import type { Customers } from "@prisma/client";
      import type { ActionData } from "../$types";
      import InputError from "$lib/components/ui/InputError.svelte";
  
    export let isOpen: boolean
    export let onClose: CallableFunction
    export let form: ActionData
    export let formAction: string = '?/createMember'
    export let member: Customers|null = null
  
  </script>
  
  <Dialog.Root bind:open={isOpen} onOpenChange={() => { onClose() }}>
      <Dialog.Content class="sm:max-w-[425px]">
          <Dialog.Header>
            <Dialog.Title>{formAction == '?/createMember' ? 'Add' : formAction == '?/editMember' ? 'Edit' : 'Update Password'  } Member</Dialog.Title>
            <Dialog.Description>
              Click save when you're done.
            </Dialog.Description>
          </Dialog.Header>
          <form action="{formAction}" method="post" use:enhance>
              <div class="grid gap-4 py-4">
                {#if formAction == '?/editMember' || formAction == '?/updateMemberPassword'}
                <input type="text" class="hidden" name="id" id="id" value={member?.id}>
                {/if}
                {#if formAction != '?/updateMemberPassword'}
                  <div class="grid grid-cols-4 items-center gap-4">
                    <Label for="name" class="text-right">Name</Label>
                  <Input id="name" name="name" value={member?.name} type="text" class="col-span-3" required />
                  <div class="col-span-4">
                    {#if form?.errors?.name?.valid === false}
                    <InputError messages={form?.errors?.name?.message} />
                    {/if}
                  </div>
                  </div>
                  <div class="grid grid-cols-4 items-center gap-4">
                    <Label for="phone" class="text-right">Phone</Label>
                    <Input id="phone" name="phone" value={member?.phone} type="number" class="col-span-3" required />
                    <div class="col-span-4">
                      {#if form?.errors?.phone?.valid === false}
                      <InputError messages={form?.errors?.phone?.message} />
                      {/if}
                    </div>
                  </div>
                {:else}
                  <div class="grid grid-cols-4 items-center gap-4">
                    <Label for="password" class="text-right">Password</Label>
                    <Input id="password" name="password" type="password" min="0" class="col-span-3" />
                    <div class="col-span-4">
                      {#if form?.errors?.password?.valid === false}
                        <InputError messages={form?.errors?.password?.message} />
                      {/if}
                    </div>
                  </div>
                {/if}
              </div>
              <Dialog.Footer>
                  {#if formAction == '?/updateMemberPassword' || formAction == '?/editMember'}
                    <Button type="submit">Update</Button>
                  {:else if formAction == '?/createMember'}
                    <Button type="submit">Save</Button>
                  {/if}
              </Dialog.Footer>
          </form>
      </Dialog.Content>
  </Dialog.Root>