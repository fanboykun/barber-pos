<script lang="ts">
	import { onMount } from 'svelte';
    import PageHeading from './(components)/PageHeading.svelte'
	import type { Treatments } from '@prisma/client';
	import TreatmentList from './(components)/TreatmentList.svelte';
    export let data
    export let form

    let treatments: Treatments[]|null = null

    onMount( async () => {
        treatments = await data.treatments
    })
</script>

<section>
    <PageHeading />

    <div class="grid gap-4 p-4 sm:grid-cols-2">
    
        {#if treatments}
            {#each treatments as treatment}
                <TreatmentList {treatment}/>
            {/each}
        {:else}
            <p>... waiting</p>
        {/if}
        
    </div>
</section>