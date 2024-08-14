<script lang="ts">
	import TodayTransaction from '../(components)/TodayTransaction.svelte';
	export let data
</script>
{#if data.transactions}
	<TodayTransaction transactions={data.transactions} />
{/if}
