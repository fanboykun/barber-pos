<script lang="ts">
    import * as Sheet from "$lib/components/ui/sheet/index";
    let isNavbarOpen = false
</script>

<!-- ========== HEADER ========== -->
<header class="flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-gray-900 text-sm py-3 sm:py-0">
    <nav class="relative max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8" aria-label="Global">

      <div class="flex items-center justify-between">
        <a class="flex-none text-xl font-semibold text-white" href="/" aria-label="Brand">Barber POS</a>
        <div class="sm:hidden">
          <button type="button" on:click={() => isNavbarOpen = !isNavbarOpen} class="hs-collapse-toggle size-9 flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-white/20 text-white hover:border-white/40 disabled:opacity-50 disabled:pointer-events-none" data-hs-collapse="#navbar-collapse-with-animation" aria-controls="navbar-collapse-with-animation" aria-label="Toggle navigation">
            <svg class="hs-collapse-open:hidden flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" x2="21" y1="6" y2="6"/><line x1="3" x2="21" y1="12" y2="12"/><line x1="3" x2="21" y1="18" y2="18"/></svg>
            <svg class="hs-collapse-open:block hidden flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>
      </div>
      
      <div class="hidden sm:block">
        <slot />
      </div>

    </nav>
</header>
  <!-- ========== END HEADER ========== -->

<Sheet.Root open={isNavbarOpen} onOpenChange={() => isNavbarOpen = !isNavbarOpen }>
  <Sheet.Content side="top" class="bg-gray-900 text-sm">
    <slot />
     
  </Sheet.Content>
</Sheet.Root>

