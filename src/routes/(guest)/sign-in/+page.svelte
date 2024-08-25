<script lang="ts">
    import { Input } from "$lib/components/ui/input/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import { Button } from "$lib/components/ui/button";
    import { enhance } from "$app/forms";
  	import InputError from "$lib/components/ui/InputError.svelte";
    import * as Card from "$lib/components/ui/card/index.js";
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

<div class="flex min-h-[50dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-md w-full space-y-8">
      <div class="flex flex-col items-center justify-center space-y-2">
        <h1 class="text-3xl font-bold tracking-tight text-foreground">Member Barbershop Your Own</h1>
        <p class="text-muted-foreground">Experience the finest haircuts in town.</p>
      </div>
      <Card.Root>
        <Card.Header class="space-y-4">
          <form class="space-y-4" method="POST" action="?/login" use:enhance>
            <div class="space-y-2">
              <Label>Number</Label>
              <Input type="number" id="phone" name="phone" placeholder="Phone Number" autocomplete="phone" />
              {#if form?.errors?.phone?.valid === false}
                    <InputError messages={form?.errors?.phone?.message} />
                {/if}
            </div>
            <div class="space-y-2">
              <Label>Password</Label>
              <Input type="password" id="password" name="password" placeholder="Password" autocomplete="password" />
                {#if form?.errors?.password?.valid === false}
                    <InputError messages={form?.errors?.password?.message} />
                {/if}
            </div>
            <InputError messages={form?.message} />
            <Button type="submit" class="w-full">Login Member</Button>
          </form>
        </Card.Header>
        <Card.Footer class="flex flex-col items-center gap-2 text-sm text-muted-foreground">
          <div>
            Don't have an account?{" "}
            <a href="/register" class="underline">
              Register Here!
            </a>
          </div>
          <div>
            By signing in, you agree to our{" "}
            <a href="/" class="underline">
              Terms of Service
            </a>
          </div>
        </Card.Footer>
      </Card.Root>
    </div>
</div>