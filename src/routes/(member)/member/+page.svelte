<script lang="ts">
	import { browser } from '$app/environment';
	import { createGradientAvatar } from '$lib/client/utils/index.js';
	import Badge from '$lib/components/ui/badge/badge.svelte';

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
					<h3 class="tracking-tight text-sm font-medium">Points Gained</h3>
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
					<div class="text-2xl font-bold">$45,231.89</div>
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
					<div class="text-2xl font-bold">+2350</div>
					<p class="text-xs text-muted-foreground">+180.1% from last month</p>
				</div>
			</div>
		</div>
	</div>

    <div class="px-4 py-2">

		<div class="grid grid-cols-1 lg:grid-cols-5 gap-x-4">

			<div class="col-span-3">
				<div class="px-4 pt-4 pb-2 bg-gray-50">
					<h3 class="text-lg font-medium">Recent Transactions</h3> 
					<p class="text-sm text-muted-foreground">Your Recentrly Transactions</p>
				</div>

                <div class="rounded-xl shadow p-6 border bg-white my-2">
                    <div class="space-y-8">

                        <div class="flex items-center">
                            <div
                                class="relative flex shrink-0 overflow-hidden rounded-full h-12 w-12 bg-gray-200 items-center justify-center"
                                data-avatar-root=""
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m7.848 8.25 1.536.887M7.848 8.25a3 3 0 1 1-5.196-3 3 3 0 0 1 5.196 3Zm1.536.887a2.165 2.165 0 0 1 1.083 1.839c.005.351.054.695.14 1.024M9.384 9.137l2.077 1.199M7.848 15.75l1.536-.887m-1.536.887a3 3 0 1 1-5.196 3 3 3 0 0 1 5.196-3Zm1.536-.887a2.165 2.165 0 0 0 1.083-1.838c.005-.352.054-.695.14-1.025m-1.223 2.863 2.077-1.199m0-3.328a4.323 4.323 0 0 1 2.068-1.379l5.325-1.628a4.5 4.5 0 0 1 2.48-.044l.803.215-7.794 4.5m-2.882-1.664A4.33 4.33 0 0 0 10.607 12m3.736 0 7.794 4.5-.802.215a4.5 4.5 0 0 1-2.48-.043l-5.326-1.629a4.324 4.324 0 0 1-2.068-1.379M14.343 12l-2.882 1.664" />
                                </svg>
                                <span
                                    data-melt-avatar-fallback=""
                                    data-avatar-fallback=""
                                    class="flex h-full w-full items-center justify-center rounded-full bg-muted"
                                    style="display: none;">OM</span
                                >
                            </div>
                            <div class="ml-4 space-y-1">
                                <p class="text-sm font-medium leading-none">Stylist: Bang Stylist</p>
                                <p class="text-sm text-muted-foreground">Rp 120.000</p>
                                <p class="text-sm text-muted-foreground">{Date()}</p>
                            </div>
                            <div class="ml-auto font-medium">

                            <Badge variant='default' size="sm">10 Point</Badge>

                            </div>
                        </div>

                    </div>
                </div>
                
			</div>

            <div class="col-span-2">
                <div class="px-4 pt-4 pb-2 bg-gray-50">
                    <h3 class="text-lg font-medium">Your Profile QR Code</h3> 
                    <p class="text-sm text-muted-foreground">You can use this QR Code to share your profile</p>
                </div>

                <div class="flex items-center p-2 justify-center w-full">
                    <div class="rounded-xl border bg-card text-card-foreground shadow w-full">
                        <!-- qr image here -->
                    </div>
                </div>

            </div>

		</div>


	</div>

</div> 