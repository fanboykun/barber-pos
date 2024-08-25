<script lang="ts">
    import { Input } from "$lib/components/ui/input/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import { Button } from "$lib/components/ui/button";
    import { enhance } from "$app/forms";
	import InputError from "$lib/components/ui/InputError.svelte";

    export let form
</script>

<!-- Hero -->
<div class="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
    <!-- Grid -->
    <div class="grid md:grid-cols-2 gap-4 md:gap-8 xl:gap-20 md:items-center">
      <div>
        <div class="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-neutral-900 dark:border-neutral-700">
            <div class="p-4 sm:p-7">
              <div class="text-center">
                <h1 class="block text-2xl font-bold text-gray-800 dark:text-white">Login Here!</h1>
                <p class="mt-2 text-sm text-gray-600 dark:text-neutral-400">
                  Don't have an account yet?
                  <a class="text-blue-600 decoration-2 hover:underline font-medium dark:text-blue-500" href="/register">
                    Register here
                  </a>
                </p>
              </div>
          
              <div class="mt-5">
          
                <div class="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6 dark:text-neutral-500 dark:before:border-neutral-600 dark:after:border-neutral-600">Or</div>
          
                <!-- Form -->
                <form method="POST" action="?/login" use:enhance>
                  <div class="grid gap-y-4">
                    <!-- Form Group -->
                    <div>
                      <label for="email" class="block text-sm mb-2 dark:text-white">Email address</label>
                      <div class="relative">
                        <input type="email" id="email" name="email" class="py-3 px-4 block w-full border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" required aria-describedby="email-error">
                        {#if form?.errors?.email?.valid === false}
                          <InputError messages={form?.errors?.email?.message} />
                        {/if}
                      </div>
                    </div>
                    <!-- End Form Group -->
          
                    <!-- Form Group -->
                    <div>
                      <div class="flex justify-between items-center">
                        <label for="password" class="block text-sm mb-2 dark:text-white">Password</label>
                        <a class="text-sm text-blue-600 decoration-2 hover:underline font-medium" href="../examples/html/recover-account.html">Forgot password?</a>
                      </div>
                      <div class="relative">
                        <input type="password" id="password" name="password" class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" required aria-describedby="password-error">
                        {#if form?.errors?.password?.valid === false}
                        <InputError messages={form?.errors?.password?.message} />
                        {/if}
                      </div>
                    </div>
                    <!-- End Form Group -->
          
                    <!-- Checkbox -->
                    <div class="flex items-center">
                      <div class="flex">
                        <input id="remember-me" name="remember-me" type="checkbox" class="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800">
                      </div>
                      <div class="ms-3">
                        <label for="remember-me" class="text-sm dark:text-white">Remember me</label>
                      </div>
                    </div>
                    <!-- End Checkbox -->
                    <InputError messages={form?.message} />
                    <button type="submit" class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">Sign in</button>
                  </div>
                </form>
                <!-- End Form -->
              </div>
            </div>
          </div>

      </div>
      <!-- End Col -->
  
      <div class="relative ms-4">
        <img class="w-full rounded-md" src="https://images.unsplash.com/photo-1665686377065-08ba896d16fd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&h=800&q=80" alt="Image Description">
        <div class="absolute inset-0 -z-[1] bg-gradient-to-tr from-gray-200 via-white/0 to-white/0 size-full rounded-md mt-4 -mb-4 me-4 -ms-4 lg:mt-6 lg:-mb-6 lg:me-6 lg:-ms-6 dark:from-neutral-800 dark:via-neutral-900/0 dark:to-neutral-900/0"></div>
  
        <!-- SVG-->
        <div class="absolute bottom-0 start-0">
          <svg class="w-2/3 ms-auto h-auto text-white dark:text-neutral-900" width="630" height="451" viewBox="0 0 630 451" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="531" y="352" width="99" height="99" fill="currentColor"/>
            <rect x="140" y="352" width="106" height="99" fill="currentColor"/>
            <rect x="482" y="402" width="64" height="49" fill="currentColor"/>
            <rect x="433" y="402" width="63" height="49" fill="currentColor"/>
            <rect x="384" y="352" width="49" height="50" fill="currentColor"/>
            <rect x="531" y="328" width="50" height="50" fill="currentColor"/>
            <rect x="99" y="303" width="49" height="58" fill="currentColor"/>
            <rect x="99" y="352" width="49" height="50" fill="currentColor"/>
            <rect x="99" y="392" width="49" height="59" fill="currentColor"/>
            <rect x="44" y="402" width="66" height="49" fill="currentColor"/>
            <rect x="234" y="402" width="62" height="49" fill="currentColor"/>
            <rect x="334" y="303" width="50" height="49" fill="currentColor"/>
            <rect x="581" width="49" height="49" fill="currentColor"/>
            <rect x="581" width="49" height="64" fill="currentColor"/>
            <rect x="482" y="123" width="49" height="49" fill="currentColor"/>
            <rect x="507" y="124" width="49" height="24" fill="currentColor"/>
            <rect x="531" y="49" width="99" height="99" fill="currentColor"/>
          </svg>
        </div>
        <!-- End SVG-->
      </div>
      <!-- End Col -->
    </div>
    <!-- End Grid -->
  </div>
  <!-- End Hero -->

<!-- <div class="max-w-screen-sm w-full bg-white rounded-xl p-8 flex flex-col items-center justify-center shadow-lg">
    <h2 class="text-xl py-4 font-semibold">Login To Your Account</h2>
    <form class="w-full" method="POST" action="?/login" use:enhance>
        <div class="flex flex-col items-center space-y-4 w-full">
            <div class="grid w-full max-w-sm items-center gap-1.5">
                <Label for="email">Email</Label>
                <Input type="email" id="email" name="email" placeholder="Email" autocomplete="email" />
                {#if form?.errors?.email?.valid === false}
                    <InputError messages={form?.errors?.email?.message} />
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
                <Button type="submit">Login</Button>
            </div>
        </div>
    </form>
</div> -->