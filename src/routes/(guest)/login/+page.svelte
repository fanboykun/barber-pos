<script lang="ts">
    import { Input } from "$lib/components/ui/input/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import { Button } from "$lib/components/ui/button";
    import { enhance } from "$app/forms";
	  import InputError from "$lib/components/ui/InputError.svelte";

    export let form
</script>

<div class="flex min-h-screen w-full items-center justify-center bg-background">
  <div class="grid w-full max-w-[1000px] grid-cols-1 gap-10 rounded-lg border bg-card md:grid-cols-2">
    <div class="flex flex-col items-center justify-center gap-6 p-8">
      <div class="space-y-2 text-center">
        <h1 class="text-3xl font-bold">Welcome to Barber's Your Own</h1>
        <p class="text-muted-foreground">
          Sign in to access your account
        </p>
      </div>
      <form method="POST" action="?/login" class="grid w-full max-w-[350px] gap-4" use:enhance>
        <div class="space-y-2">
          <Label>Email</Label>
          <Input type="email" id="email" name="email" placeholder="Enter your email" required aria-describedby="email-error"/>
            {#if form?.errors?.email?.valid === false}
                <InputError messages={form?.errors?.email?.message} />
            {/if}
          </div>
          <div class="space-y-2">
            <Label>Password</Label>
            <Input type="password" id="password" name="password" placeholder="Enter your password" required aria-describedby="password-error"/>
            {#if form?.errors?.password?.valid === false}
                <InputError messages={form?.errors?.password?.message} />
            {/if}
        </div>
        <InputError messages={form?.message} />
        <Button type="submit" class="w-full">
          Login
        </Button>
      </form>
    </div>
    <div class="hidden rounded-r-lg bg-muted md:block">
      <img
        src="assets/img/pplanding.webp"
        alt="Barbershop Interior"
        width={500}
        height={500}
        class="h-full w-full rounded-r-lg object-cover"
      />
    </div>
  </div>
</div>