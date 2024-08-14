<script lang="ts">
    export let data
	console.log(data)
</script>

<div class="h-full bg-gray-50">
	<div class="px-8 pt-4 pb-2 bg-gray-50">
		<h3 class="text-lg font-medium">Stylist Area</h3> 
		<p class="text-sm text-muted-foreground">Summary of your application. (Example of a dashboard card stats)</p>
	</div>

	<!-- Example of a dashboard card stats -->
	<div class="px-4 py-2 ">
		<div class="grid gap-4 md:grid-cols-2">
			<div class="rounded-xl border bg-card text-card-foreground shadow">
				<div class="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
					<h3 class="tracking-tight text-sm font-medium">Total Revenue</h3>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="lucide-icon lucide lucide-dollar-sign h-4 w-4 text-muted-foreground"
						><line x1="12" x2="12" y1="2" y2="22"></line><path
							d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"
						></path></svg
					>
				</div>
				<div class="p-6 pt-0">
					<div class="text-2xl font-bold">{data.totalRevenue?._sum.totalPrice?.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }).split(',').at(0)}</div>
					<p class="text-xs text-muted-foreground">+20.1% from last month</p>
				</div>
			</div>
			<div class="rounded-xl border bg-card text-card-foreground shadow">
				<div class="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
					<h3 class="tracking-tight text-sm font-medium">Total Transactions</h3>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="lucide-icon lucide lucide-users h-4 w-4 text-muted-foreground"
						><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"
						></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"
						></path></svg
					>
				</div>
				<div class="p-6 pt-0">
					<div class="text-2xl font-bold">{data.totalTransaction} Time(s)</div>
					<p class="text-xs text-muted-foreground">+180.1% from last month</p>
				</div>
			</div>
		</div>
	</div>


</div>