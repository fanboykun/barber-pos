<script lang="ts">
    import { Input } from "$lib/components/ui/input/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import { Button } from "$lib/components/ui/button";
    import { enhance } from "$app/forms";
	import InputError from "$lib/components/ui/InputError.svelte";
	import { toast } from "svelte-sonner";

    export let form

    $: {
      if(form?.success) {
          let isSuccess = form?.success == true
          let toastMessage = isSuccess ? 'The Action Executed Successfully' : 'The Action Failed to Execute'
          if(form.message && typeof form.message === 'string') toastMessage = form.message
          toast(isSuccess ? 'Success' : 'Failed', {
              description: toastMessage,
          })
      }
  }
</script>

<div class="max-w-screen-sm w-full bg-white rounded-xl p-8 flex flex-col items-center justify-center shadow-lg">
    <h2 class="text-xl py-4 font-semibold">Login Member</h2>
    <form class="w-full" method="POST" action="?/login" use:enhance>
        <div class="flex flex-col items-center space-y-4 w-full">
            <div class="grid w-full max-w-sm items-center gap-1.5">
                <Label for="email">Phone</Label>
                <Input type="number" id="phone" name="phone" placeholder="Phone Number" autocomplete="phone" />
                {#if form?.errors?.phone?.valid === false}
                    <InputError messages={form?.errors?.phone?.message} />
                {/if}
            </div>
            <div class="grid w-full max-w-sm items-center gap-1.5">
                <Label for="password">Password</Label>
                <Input type="password" id="password" name="password" placeholder="Password" autocomplete="password" />
                {#if form?.errors?.password?.valid === false}
                    <InputError messages={form?.errors?.password?.message} />
                {/if}
            </div>
            <InputError messages={form?.message} />
            <div class="flex justify-between items-center w-full max-w-sm">
                <div class="flex flex-col">
                    <a href="/register" class="text-sm text-slate-600">Haven't registered? Register Instead</a>
                </div>
                <Button type="submit">Login Member</Button>
            </div>
        </div>
    </form>
</div>