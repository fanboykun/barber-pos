<script lang="ts">
	import Button from "$lib/components/ui/button/button.svelte";
	import type { ActionData } from "../$types";
	import AddTreatment from "./AddTreatment.svelte";
    
    export let form: ActionData
    let isOpen = false
</script>
<div class="flex flex-col gap-2 sm:gap-0 sm:flex-row sm:justify-between px-4 sm:px-8 pt-4 pb-2 bg-gray-50">
    <div>
        <h3 class="text-lg font-medium">Treatment List</h3> 
        <p class="text-sm text-muted-foreground">Summary of your application. (Example of a dashboard card stats)</p>
    </div>
    <Button type="button" on:click={() => isOpen = !isOpen}>
        Add New
    </Button>
</div>

<AddTreatment {isOpen} {form} onClose={() => {isOpen = false}} />


