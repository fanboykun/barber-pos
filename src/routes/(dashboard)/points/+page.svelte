<script lang="ts">
    import PageHeading from './(components)/PageHeading.svelte'
    import PointList from './(components)/PointList.svelte'
    export let data
    export let form
</script>

<section>
    <PageHeading {form} />

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4  p-4">
        {#await data.points}
            <p>...waiting</p>
        {:then points}
            {#if points}
                {#each points as point}
                    <PointList {point} {form} />
                {/each}
            {/if}
        {/await}
    </div>
</section>