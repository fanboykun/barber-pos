<script lang="ts">
    import PageHeading from './(components)/PageHeading.svelte'
    import PointList from './(components)/PointList.svelte'
    export let data
    export let form
</script>
<div>
    <PageHeading />

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4  p-4">
        {#if data.points}
        {#each data.points as point}
            <PointList {point} {form} />
        {/each}
        {/if}
    </div>
</div>