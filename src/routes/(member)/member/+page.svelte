<script lang="ts">
	import { browser } from '$app/environment';
	import { createGradientAvatar, formatCurrency } from '$lib/client/utils/index.js';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import Badge from '$lib/components/ui/badge/badge.svelte';
    import QRCode from '@castlenine/svelte-qrcode';

    export let data
	
</script>
<div class="h-full bg-gray-50">
	<div class="px-8 pt-4 pb-2 bg-gray-50">
		<h3 class="text-lg font-medium">Your Summary</h3> 
		<p class="text-sm text-muted-foreground">Summary of your application. (Example of a dashboard card stats)</p>
	</div>

	<!-- Example of a dashboard card stats -->
	<div class="px-4 py-2 ">
		<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
			<div class="rounded-xl border bg-card text-card-foreground shadow">
				<div class="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
					<h3 class="tracking-tight text-sm font-medium">Total Point</h3>
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
					<div class="text-2xl font-bold">{data.currentTotalPoint?.total_point ?? 0} Point</div>
					<p class="text-xs text-muted-foreground">your current total point</p>
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
					<p class="text-xs text-muted-foreground">your total Transactions</p>
				</div>
			</div>
			<div class="rounded-xl border bg-card text-card-foreground shadow">
				<div class="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
					<h3 class="tracking-tight text-sm font-medium">Points Used</h3>
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
					<div class="text-2xl font-bold">{data.totalPointUsed} Point</div>
					<p class="text-xs text-muted-foreground">your total Transactions</p>
				</div>
			</div>
			<div class="rounded-xl border bg-card text-card-foreground shadow">
				<div class="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
					<h3 class="tracking-tight text-sm font-medium">Money Saved</h3>
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
					<div class="text-2xl font-bold">{ formatCurrency(data.totalMoneySaved?._sum.totalDiscount) }</div>
					<p class="text-xs text-muted-foreground">your total Transactions</p>
				</div>
			</div>
		</div>
	</div>

    <div class="px-4 py-2">

		<div class="grid grid-cols-1 lg:grid-cols-5 gap-x-4">

			<div class="col-span-2">
                <div class="px-4 pt-4 pb-2 bg-gray-50">
                    <h3 class="text-lg font-medium">Your Profile QR Code</h3> 
                    <p class="text-sm text-muted-foreground">You can use this QR Code to share your profile</p>
                </div>

                <div class="flex items-center p-2 justify-center w-full">
                    <div class="flex items-center justify-center rounded-xl border bg-card text-card-foreground shadow w-full">
                        <!-- qr image here -->
						 <!-- <img src="tes-qr.png" alt="" class=""> -->
						  <div class="py-4">
							  <QRCode data={data.customer?.id} />
						  </div>
						  
                    </div>
                </div>

            </div>


			<div class="col-span-3">
				<div class="px-4 pt-4 pb-2 bg-gray-50">
					<h3 class="text-lg font-medium">Recent Transactions</h3> 
					<p class="text-sm text-muted-foreground">Your Recentrly Transactions</p>
				</div>
				{#if data.allTransaction}
				{#each data.allTransaction as transaction }
					<div class="rounded-xl shadow p-6 border bg-white my-2">
						<div class="space-y-8">

							<div class="flex items-center">
								<Avatar.Root>
									{#if browser}
									<Avatar.Image src={createGradientAvatar()} alt="user avatar" />
									{/if}
									<Avatar.Fallback></Avatar.Fallback>
								</Avatar.Root>
								<div class="ml-4 space-y-2">
									<p class="text-sm font-medium leading-none">Stylist: {transaction.stylist.name}</p>
									{#each transaction.transactionDetails as detail}
										<p class="text-sm font-medium leading-none">Treatment: {detail.treatment.name}</p>
									{/each}
									<p class="text-sm text-muted-foreground">{transaction.totalPrice.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }).split(',').at(0)}</p>
									<p class="text-sm text-muted-foreground">{transaction.createdAt.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
								</div>
								<div class="ml-auto font-medium">

								<Badge variant='default' size="sm">{transaction.totalPoint} Point</Badge>

								</div>
							</div>

						</div>
					</div>
				{/each}
				{/if}
                
			</div>

		</div>


	</div>

</div> 