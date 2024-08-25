<script lang="ts">
	import Navigation from '$lib/components/layouts/guests/Navigation.svelte';
	import NavigationItems from '$lib/components/layouts/guests/NavigationItems.svelte';
	import Features from '$lib/components/pages/home/Features.svelte';
	import Footer from '$lib/components/pages/home/Footer.svelte';
	import Hero from '$lib/components/pages/home/Hero.svelte';
	import Team from '$lib/components/pages/home/Team.svelte';
	// import type { LayoutData, PageData } from './$types';
    export let data
    console.log(data)
</script>
<div class="flex flex-col w-full justify-center items-center relative bg-gray-100 overflow-x-hidden">

    <Navigation>
        <NavigationItems user={data.user} authenticated={data.isAuthenticatedUser} hasCustomerSession={data.hasCustomerSession} />
    </Navigation>
    <Hero />
    <Features />
    <Team />
    <Footer />

</div>