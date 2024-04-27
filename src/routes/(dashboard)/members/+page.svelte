<script lang="ts">
    import { toast } from 'svelte-sonner';
	import MemberList from './(components)/MemberList.svelte';
    import PageHeading from './(components)/PageHeading.svelte'
    import * as Table from "$lib/components/ui/table"

    export let data
    export let form

  $: {
        if((form as { success?: boolean })?.success) {
            let isSuccess = (form as { success?: boolean })?.success == true
            toast(isSuccess ? 'Success' : 'Failed', {
                description: isSuccess ? "The Action Executed Successfully" : "The Action Failed to Execute",
            })
        }
    }
</script>

<section>
  <PageHeading {form} />

  <div class="grid gap-4  p-4">
      {#await data.members}
          <p>...waiting</p>
      {:then members}
          {#if members}
          <Table.Root>
            <Table.Header>
              <Table.Row>
                <Table.Head class="w-[50px]">No.</Table.Head>
                <Table.Head class="w-[100px]">Name</Table.Head>
                <Table.Head>Phone</Table.Head>
                <Table.Head class="w-[120px]">Total Point</Table.Head>
                <Table.Head>Actions</Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
                {#each members as member}
                    <MemberList {member} {form}/>
                {/each}
            </Table.Body>
        </Table.Root>
          {/if}
      {/await}
  </div>
</section>