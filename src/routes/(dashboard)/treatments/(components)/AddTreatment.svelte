<script lang="ts">
    import * as Dialog from "$lib/components/ui/dialog";
      import Label from "$lib/components/ui/label/label.svelte";
      import Input from "$lib/components/ui/input/input.svelte";
      import Button from "$lib/components/ui/button/button.svelte";
      import { enhance } from "$app/forms";
      import type { Treatments } from "@prisma/client";
      import type { ActionData } from "../$types";
      import InputError from "$lib/components/ui/InputError.svelte";
	    import Textarea from "$lib/components/ui/textarea/textarea.svelte";
  
    export let isOpen: boolean
    export let onClose: CallableFunction
    export let form: ActionData
    export let formAction: string = '?/createTreatment'
    export let treatment: Treatments|null = null
  
  </script>
  
  <Dialog.Root bind:open={isOpen} onOpenChange={() => { onClose() }}>
      <Dialog.Content class="sm:max-w-[425px]">
          <Dialog.Header>
            <Dialog.Title>{formAction == '?/createTreatment' ? 'Add' : 'Edit'} Treatment</Dialog.Title>
            <Dialog.Description>
              Click save when you're done.
            </Dialog.Description>
          </Dialog.Header>
          <form action="{formAction}" method="post" use:enhance={() => {onClose()}}>
              <div class="grid gap-4 py-4">
                  <input type="text" class="hidden" name="id" id="id" value={treatment?.id}>
                <div class="grid grid-cols-4 items-center gap-4">
                  <Label for="name" class="text-right" isRequired={true}>Name</Label>
                  <Input id="name" name="name" value={treatment?.name} type="text" class="col-span-3" required />
                  <div class="col-span-4">
                    {#if form?.errors?.name?.valid === false}
                      <InputError messages={form?.errors?.name?.message} />
                    {/if}
                  </div>
                </div>
                <div class="grid grid-cols-4 items-center gap-4">
                  <Label for="price" class="text-right" isRequired={true}>Price</Label>
                  <Input id="price" name="price" value={treatment?.price} type="number" class="col-span-3" required />
                  <div class="col-span-4">
                    {#if form?.errors?.price?.valid === false}
                      <InputError messages={form?.errors?.price?.message} />
                    {/if}
                  </div>
                </div>
                <div class="grid grid-cols-4 items-center gap-4">
                  <Label for="point" class="text-right" isRequired={true}>Point</Label>
                  <Input id="point" name="point" value={treatment?.point} type="number" min="0" class="col-span-3" />
                  <div class="col-span-4">
                    {#if form?.errors?.point?.valid === false}
                      <InputError messages={form?.errors?.point?.message} />
                    {/if}
                  </div>
                </div>
                <div class="grid grid-cols-4 items-center gap-4">
                  <Label for="sub_service" class="text-right">Sub Treatment</Label>
                  <Textarea id="sub_service" name="sub_service" value={treatment?.sub_service} class="col-span-3" />
                  <div class="col-span-4">
                    {#if form?.errors?.sub_service?.valid === false}
                      <InputError messages={form?.errors?.sub_service?.message} />
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