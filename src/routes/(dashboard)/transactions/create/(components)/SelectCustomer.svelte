<script lang="ts">
	import { createGradientAvatar } from "$lib/client/utils";
	import type { Customers } from "@prisma/client";

	import Button from "$lib/components/ui/button/button.svelte";
	import Label from "$lib/components/ui/label/label.svelte";
    import * as Dialog from "$lib/components/ui/dialog/index"
    import * as Table from "$lib/components/ui/table/index"
	import Input from "$lib/components/ui/input/input.svelte";

    export let setCustomer: Function

    let customers: Customers[]|null
    let selectedCustomer: Customers|null
    let isSearchCustomerDialogOpen = false

    async function getCustomers() {
        try {
            const res = await fetch('getCustomers')
            const d = await res.json()
            customers = d
            isSearchCustomerDialogOpen = true
        } catch (err) {
            console.log(err)
        }
    }

</script>
<div class="grid w-full  items-center gap-1.5">
    <Label for="name">Customer</Label>
    <div class="flex justify-between gap-4">
        <div class="flex flex-col rounded-xl py-2 px-4 bg-white border border-gray-200 w-full max-w-md shadow-lg">
            {#if selectedCustomer}
                <div class="flex items-center gap-x-4">
                    <img class="rounded-full size-8" src={createGradientAvatar()} alt="stylist avatar">
                    <div class="grow">
                        <h3 class="font-medium text-sm py-2 text-gray-800">
                            {selectedCustomer.name}
                        </h3>
                        <div class="grid grid-cols-2 gap-1.5">
                            <p class="flex gap-x-1 text-sm leading-tight font-semibold text-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-4">
                                <path fill-rule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clip-rule="evenodd" />
                            </svg>                                                                 
                            {selectedCustomer.phone}
                            </p>
                            <p class="flex gap-x-1 text-sm leading-tight font-semibold text-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-4">
                                <path fill-rule="evenodd" d="M2.25 2.25a.75.75 0 0 0 0 1.5H3v10.5a3 3 0 0 0 3 3h1.21l-1.172 3.513a.75.75 0 0 0 1.424.474l.329-.987h8.418l.33.987a.75.75 0 0 0 1.422-.474l-1.17-3.513H18a3 3 0 0 0 3-3V3.75h.75a.75.75 0 0 0 0-1.5H2.25Zm6.54 15h6.42l.5 1.5H8.29l.5-1.5Zm8.085-8.995a.75.75 0 1 0-.75-1.299 12.81 12.81 0 0 0-3.558 3.05L11.03 8.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l2.47-2.47 1.617 1.618a.75.75 0 0 0 1.146-.102 11.312 11.312 0 0 1 3.612-3.321Z" clip-rule="evenodd" />
                            </svg>                                  
                            {selectedCustomer.total_point} Point
                            </p>
                            <!-- <p class="flex gap-x-1 text-sm leading-tight font-semibold text-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-4">
                                <path d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5H5.625Z" />
                                <path d="M12.971 1.816A5.23 5.23 0 0 1 14.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 0 1 3.434 1.279 9.768 9.768 0 0 0-6.963-6.963Z" />
                            </svg>                                  
                            0 Transactions
                            </p> -->
                        </div>
                    </div>
                </div>
            {:else}    
                <div class="flex items-center gap-x-4">
                    <img class="rounded-full size-8" src={createGradientAvatar()} alt="stylist avatar">
                    <div class="grow">
                        <h3 class="font-medium text-sm py-2 text-gray-800">
                            Guest
                        </h3>
                        <div class="grid grid-cols-2 gap-1.5">
                            <p class="flex gap-x-1 text-sm leading-tight font-semibold text-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-4">
                                <path fill-rule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clip-rule="evenodd" />
                            </svg>                                                                 
                            08xx
                            </p>
                            <p class="flex gap-x-1 text-sm leading-tight font-semibold text-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-4">
                                <path fill-rule="evenodd" d="M2.25 2.25a.75.75 0 0 0 0 1.5H3v10.5a3 3 0 0 0 3 3h1.21l-1.172 3.513a.75.75 0 0 0 1.424.474l.329-.987h8.418l.33.987a.75.75 0 0 0 1.422-.474l-1.17-3.513H18a3 3 0 0 0 3-3V3.75h.75a.75.75 0 0 0 0-1.5H2.25Zm6.54 15h6.42l.5 1.5H8.29l.5-1.5Zm8.085-8.995a.75.75 0 1 0-.75-1.299 12.81 12.81 0 0 0-3.558 3.05L11.03 8.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l2.47-2.47 1.617 1.618a.75.75 0 0 0 1.146-.102 11.312 11.312 0 0 1 3.612-3.321Z" clip-rule="evenodd" />
                            </svg>                                  
                            0 Point
                            </p>
                            <!-- <p class="flex gap-x-1 text-sm leading-tight font-semibold text-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-4">
                                <path d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5H5.625Z" />
                                <path d="M12.971 1.816A5.23 5.23 0 0 1 14.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 0 1 3.434 1.279 9.768 9.768 0 0 0-6.963-6.963Z" />
                            </svg>                                  
                            0 Transactions
                            </p> -->
                        </div>
                    </div>
                </div>
            {/if}
        </div>
        <div class="flex flex-col gap-2">
            <Button type="button" class="underline" > Scan </Button>
            <Button type="button" variant="secondary" class="underline bg-gray-200" on:click={() => getCustomers()} > Search </Button>
            <Button type="button" on:click={() => selectedCustomer = null} variant="destructive" disabled={selectedCustomer == null} class="underline" > Clear </Button>
        </div>
    </div>

</div>
<Dialog.Root open={isSearchCustomerDialogOpen} onOpenChange={() => isSearchCustomerDialogOpen = !isSearchCustomerDialogOpen}>
    <Dialog.Content class="sm:max-w-[500px]">
      <Dialog.Header>
        <Dialog.Title>Search Customer</Dialog.Title>
        <Dialog.Description>
          Search customer by name or phone then select it to create transaction
        </Dialog.Description>
      </Dialog.Header>
      <Input name="searchCustomer" type="search" placeholder="search customer by name or phone" />
      <Table.Root>
        <Table.Caption>Please search the customers</Table.Caption>
        <Table.Header>
          <Table.Row>
            <Table.Head>Name</Table.Head>
            <Table.Head>Phone</Table.Head>
            <Table.Head></Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
            {#if customers}
                {#each customers as customer}
                    <Table.Row>
                        <Table.Cell class="font-medium">{customer.name}</Table.Cell>
                        <Table.Cell>{customer.phone}</Table.Cell>
                        <Table.Cell class="text-right">
                            <Button type="button" variant="ghost" class="underline" on:click={() => { setCustomer(customer); selectedCustomer = customer; isSearchCustomerDialogOpen = false }  }>Select</Button>
                        </Table.Cell>
                    </Table.Row>
                {/each}
            {/if}
        </Table.Body>
      </Table.Root>
      <Dialog.Footer>
        <Button type="button" variant="secondary" on:click={() =>  isSearchCustomerDialogOpen = false}> Close </Button>
      </Dialog.Footer>
    </Dialog.Content>
  </Dialog.Root>
