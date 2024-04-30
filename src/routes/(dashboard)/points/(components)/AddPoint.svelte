<script lang="ts">
  import * as Dialog from "$lib/components/ui/dialog";
	import Label from "$lib/components/ui/label/label.svelte";
	import Input from "$lib/components/ui/input/input.svelte";
	import Button from "$lib/components/ui/button/button.svelte";
	import { enhance } from "$app/forms";
	import type { Points } from "@prisma/client";
	import type { ActionData } from "../$types";
	import InputError from "$lib/components/ui/InputError.svelte";

  export let isOpen: boolean
  export let onClose: CallableFunction
  export let form: ActionData
  export let formAction: string = '?/createPoint'
  export let point: Points|null = null

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
          <Dialog.Title>{formAction == '?/createPoint' ? 'Add' : 'Edit'} Point</Dialog.Title>
          <Dialog.Description>
            Click save when you're done.
          </Dialog.Description>
        </Dialog.Header>
        <form action="{formAction}" method="post" use:enhance>
            <div class="grid gap-4 py-4">
                <input type="text" class="hidden" name="id" id="id" value={point?.id}>
              <div class="grid grid-cols-4 items-center gap-4">
                <Label for="name" class="text-right">Name</Label>
                <Input id="name" name="name" value={point?.name} type="text" class="col-span-3" />
                <div class="col-span-4">
                  {#if form?.errors?.name?.valid === false}
                    <InputError messages={form?.errors?.name?.message} />
                  {/if}
                </div>
              </div>
              <div class="grid grid-cols-4 items-center gap-4">
                <Label for="minimum" class="text-right">Minimum</Label>
                <Input id="minimum" name="minimum" value={point?.minimum} type="number" class="col-span-3" />
                <div class="col-span-4">
                  {#if form?.errors?.minimum?.valid === false}
                    <InputError messages={form?.errors?.minimum?.message} />
                  {/if}
                </div>
              </div>
              <div class="grid grid-cols-4 items-center gap-4">
                <Label for="discount" class="text-right">Discount</Label>
                <Input id="discount" name="discount" value={point?.discount} type="number" class="col-span-3" />
                <div class="col-span-4">
                  {#if form?.errors?.discount?.valid === false}
                    <InputError messages={form?.errors?.discount?.message} />
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