<script lang="ts">
	import { Label as LabelPrimitive } from "bits-ui";
	import { cn } from "$lib/components/shadcn-utils.js";

	type $$Props = LabelPrimitive.Props & { isRequired?: boolean };

	let className: $$Props["class"] = undefined;
	let isRequired: $$Props["isRequired"] = false
	export { className as class, isRequired };
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
