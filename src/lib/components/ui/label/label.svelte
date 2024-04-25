<script lang="ts">
	import { Label as LabelPrimitive } from "bits-ui";
	import { cn } from "$lib/components/shadcn-utils.js";

	type $$Props = LabelPrimitive.Props;

	let className: $$Props["class"] = undefined;
	export { className as class };
	export let isRequired = false
</script>

<LabelPrimitive.Root
	class={cn(
		"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
		className
	)}
	{...$$restProps}
>
	<slot />
	{#if isRequired}
	<span class="text-red-500 text-xs">*</span>
	{/if}
</LabelPrimitive.Root>
