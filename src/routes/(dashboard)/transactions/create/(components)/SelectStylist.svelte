<script lang="ts">
    import Check from "svelte-radix/Check.svelte";
    import CaretSort from "svelte-radix/CaretSort.svelte";
    import { onMount, tick } from "svelte";
    import * as Command from "$lib/components/ui/command/index.js";
    import * as Popover from "$lib/components/ui/popover/index.js";
    import { cn } from "$lib/components/shadcn-utils.js"
    import Label from "$lib/components/ui/label/label.svelte";
    import Button from "$lib/components/ui/button/button.svelte";
    import type { User } from "@prisma/client";
    
    export let stylists: User[]
 
    let open = false;
    let value = "";
    let selectedStylistId = ""
    let sz = 0
    onMount(async() => {
      let s = document.getElementById("s")
      sz = s?.clientWidth ?? 0
    })
 
  $: selectedStylist = stylists.find((f) => f.name === value) ?? null;
  $: if(selectedStylist) {
    selectedStylistId = selectedStylist.id
  }
 
  // We want to refocus the trigger button when the user selects
  // an item from the list so users can continue navigating the
  // rest of the form with the keyboard.
  function closeAndFocusTrigger(triggerId: string) {
    open = false;
    tick().then(() => {
      document.getElementById(triggerId)?.focus();
    });
  }

</script>

<div class="flex flex-col gap-2 w-full h-full">
    <Label class="" for="stylist">Stylist</Label>
    <Popover.Root bind:open let:ids>
        <Popover.Trigger asChild let:builder class="w-full">
          <Button
            builders={[builder]}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            class="justify-between"
            id="s"
          >
            {selectedStylist?.name ?? "Select a Stylist"}
            <CaretSort class="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </Popover.Trigger>
          <Popover.Content class="p-0 w-[{sz}px]!important" align="center" side="bottom">
            <Command.Root>
              <Command.Input placeholder="Search stylists..." class="h-9" />
              <Command.Empty>No Stylist found.</Command.Empty>
              <Command.Group>
                {#each stylists as stylist}
                  <Command.Item
                    value={stylist.name ?? ""}
                    onSelect={(currentValue) => {
                      value = currentValue;
                      // id = currentValue;
                      closeAndFocusTrigger(ids.trigger);
                    }}
                  >
                    <Check
                      class={cn(
                        "mr-2 h-4 w-4",
                        value !== stylist.name && "text-transparent"
                      )}
                    />
                    {stylist.name}
                  </Command.Item>
                {/each}
              </Command.Group>
            </Command.Root>
          </Popover.Content>
    </Popover.Root>
    <input type="hidden" bind:value={selectedStylistId}>
</div>

