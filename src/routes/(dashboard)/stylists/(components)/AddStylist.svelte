<script lang="ts">
    import * as Dialog from "$lib/components/ui/dialog";
    import Label from "$lib/components/ui/label/label.svelte";
    import Input from "$lib/components/ui/input/input.svelte";
    import Button from "$lib/components/ui/button/button.svelte";
    import { enhance } from "$app/forms";
    import type { User } from "@prisma/client";
    import type { ActionData } from "../$types";
    import InputError from "$lib/components/ui/InputError.svelte";

    export let isOpen: boolean
    export let onClose: CallableFunction
    export let form: ActionData
    export let formAction: string = '?/createStylist'
    export let stylist: User|null = null

    const closeFormOnSuccess = () => {
      if(form?.success == true) {
        isOpen = false
      } 
    }

    const closeDialog = () => {
      delete form?.errors; 
      return onClose()
    }
    
    $: if(form?.success) {
      closeFormOnSuccess()
    }

  </script>
  
  <Dialog.Root bind:open={isOpen} onOpenChange={closeDialog}>
      <Dialog.Content class="sm:max-w-[425px]">
          <Dialog.Header>
            <Dialog.Title>{formAction == '?/createStylist' ? 'Add' : 'Edit'} Stylist</Dialog.Title>
            <Dialog.Description>
              Click save when you're done.
            </Dialog.Description>
          </Dialog.Header>
          <form action="{formAction}" method="post" use:enhance>
              <div class="grid gap-4 py-4">
                  <input type="text" class="hidden" name="id" id="id" value={stylist?.id}>
                <div class="grid grid-cols-4 items-center gap-4">
                  <Label for="name" class="text-right" isRequired={true}>Name</Label>
                  <Input id="name" name="name" value={stylist?.name} type="text" class="col-span-3" />
                  <div class="col-span-4">
                    {#if form?.errors?.name?.valid === false}
                      <InputError messages={form?.errors?.name?.message} />
                    {/if}
                  </div>
                </div>
                <div class="grid grid-cols-4 items-center gap-4">
                  <Label for="email" class="text-right" isRequired={true}>Email</Label>
                  <Input id="email" name="email" value={stylist?.email} type="email" class="col-span-3" required />
                  <div class="col-span-4">
                    {#if form?.errors?.email?.valid === false}
                      <InputError messages={form?.errors?.email?.message} />
                    {/if}
                  </div>
                </div>
                {#if formAction == '?/createStylist'}
                <div class="grid grid-cols-4 items-center gap-4">
                  <Label for="password" class="text-right" isRequired={true}>Password</Label>
                  <Input id="password" name="password" type="text" class="col-span-3" required />
                  <div class="col-span-4">
                    {#if form?.errors?.password?.valid === false}
                      <InputError messages={form?.errors?.password?.message} />
                    {/if}
                  </div>
                </div>
                {/if}
              </div>
              <Dialog.Footer>
                  <Button type="submit">Save</Button>
              </Dialog.Footer>
          </form>
      </Dialog.Content>
  </Dialog.Root>