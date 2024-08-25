<script lang="ts">
    import { Input } from "$lib/components/ui/input/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import { Button } from "$lib/components/ui/button";
	  import InputError from "$lib/components/ui/InputError.svelte";
    import type { PageData, ActionData } from './$types';
	  import { enhance } from "$app/forms";

	  // export let data: PageData;
    export let form: ActionData;

  </script>
  

  <div class="container mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8 border-2 border-black">
    <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
      <div>
        <h1 class="text-3xl font-bold">Join Our Barbershop</h1>
        <p class="mt-4 text-muted-foreground">
          Sign up for our exclusive membership and enjoy the best haircuts in town.
        </p>
        <form class="mt-8 space-y-6" method="POST" action="?/register" use:enhance>
          <div>
            <Label for="email">Phone</Label>
            <Input type="number" id="phone" name="phone" placeholder="Phone Number" autocomplete="phone"  required />
              {#if form?.errors?.phone?.valid === false}
                <InputError messages={form?.errors?.phone?.message} />
              {/if}
          </div>
          <div>
            <Label for="name">Name</Label>
            <Input type="name" id="name" name="name" placeholder="Name" />
              {#if form?.errors?.name?.valid === false}
                <InputError messages={form?.errors?.name?.message} />
              {/if}
          </div>
          <div>
            <Label for="password">Password</Label>
            <Input type="password" id="password" name="password" placeholder="Password" autocomplete="new-password" required />
              {#if form?.errors?.password?.valid === false}
                <InputError messages={form?.errors?.password?.message} />
              {/if}
          </div>
          <div>
            <Label for="confirm_password">Confirm Password</Label>
            <Input type="password" id="confirm_password" name="confirm_password" placeholder="Confirm Password" autocomplete="new-password" required />
              {#if form?.errors?.confirm_password?.valid === false}
                <InputError messages={form?.errors?.confirm_password?.message} />
              {/if}
          </div>
          <Button type="submit" class="w-full">
            Join Now
          </Button>
          <a href="/sign-in" class="text-sm text-slate-600">Already a member? sign-in as member</a>
        </form>
      </div>
      <div class="bg-muted p-6 rounded-lg bg-gray-300">
        <h2 class="text-2xl font-bold">Membership Benefits</h2>
        <ul class="mt-4 space-y-2">
          <li class="flex items-center gap-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
            
            <span>Unlimited haircuts</span>
          </li>
          <li class="flex items-center gap-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
            
            <span>Get discount on all products</span>
          </li>
          <li class="flex items-center gap-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
            
            <span>Priority booking</span>
          </li>
          <li class="flex items-center gap-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
            
            <span>Exclusive member events</span>
          </li>
        </ul>
        <div class="mt-6">
          <h3 class="text-xl font-bold">Pricing</h3>
          <p class="mt-2 text-4xl font-bold">Rp.0/Lifetime</p>
        </div>
      </div>
    </div>
  </div>
