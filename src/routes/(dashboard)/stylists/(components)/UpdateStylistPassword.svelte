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
            <Dialog.Title>Update Stylist Password</Dialog.Title>
            <Dialog.Description>
              Stylist name: {stylist?.name}
            </Dialog.Description>
          </Dialog.Header>
          <form action="?/updatePassword" method="post" use:enhance>
              <div class="grid gap-4 py-4">
                  <input type="text" class="hidden" name="id" id="id" value={stylist?.id}>
                <div class="grid grid-cols-4 items-center gap-4">
                  <Label for="password" class="text-right" isRequired={true}>Password</Label>
                  <Input id="password" name="password" type="text" class="col-span-3" required />
                  <div class="col-span-4">
                    {#if form?.errors?.password?.valid === false}
                      <InputError messages={form?.errors?.password?.message} />
                    {/if}
                  </div>
                </div>
              </div>
              <Dialog.Footer>
                  <Button type="submit">Save</Button>
              </Dialog.Footer>
          </form>
      </Dialog.Content>
  </Dialog.Root>