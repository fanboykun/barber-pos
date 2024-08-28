<script lang="ts">
    import { enhance } from "$app/forms";
    import type { User } from 'lucia';

    export let user:User|null
    export let authenticated: boolean
    export let hasCustomerSession: boolean = false

</script>

<div id="navbar-collapse-with-animation" class="hs-collapse sm:block overflow-hidden transition-all duration-300 basis-full grow">
    <div class="flex flex-col gap-y-4 gap-x-0 mt-5 sm:flex-row sm:items-center sm:justify-end sm:gap-y-0 sm:gap-x-7 sm:mt-0 sm:ps-7">
      <a class="font-medium text-white sm:py-6" href="/" aria-current="page">Landing</a>

      {#if user && authenticated == true && hasCustomerSession == false}
        <a class="flex items-center gap-x-2 font-medium text-white/[.8] hover:text-white sm:border-s sm:border-white/[.3] sm:my-6 sm:ps-6" href="/dashboard">
            <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            Dashboard
        </a>

        <form action="/logout" method="post" use:enhance>
            <button class="flex items-center gap-x-2 font-medium text-white/[.8] hover:text-white sm:my-6">
                <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                Logout
            </button>
        </form> 
      {:else if user == null && authenticated == false && hasCustomerSession == false}
        <a class="flex items-center gap-x-2 font-medium text-white/[.8] hover:text-white sm:border-s sm:border-white/[.3] sm:my-6 sm:ps-6" href="/login">
            <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            Stylist
        </a>
        {/if}

        {#if user == null && authenticated == false}
          <a class="flex items-center gap-x-2 font-medium text-white/[.8] hover:text-white sm:my-6" href="/sign-in">
            <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            Member
          </a>
        {/if}

        {#if hasCustomerSession}
        <form action="/sign-out" method="post" use:enhance>
            <button class="flex items-center gap-x-2 font-medium text-white/[.8] hover:text-white sm:my-6">
                <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                Logout
            </button>
        </form> 
        {/if}


    </div>
  </div>