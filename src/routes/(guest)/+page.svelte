<script lang="ts">
	import Navigation from '$lib/components/layouts/guests/Navigation.svelte';
	import Features from '$lib/components/pages/home/Features.svelte';
	import Footer from '$lib/components/pages/home/Footer.svelte';
	import Hero from '$lib/components/pages/home/Hero.svelte';
	import Team from '$lib/components/pages/home/Team.svelte';
    export let data
</script>
<div class="flex flex-col w-full justify-center items-center relative bg-gray-100 overflow-x-hidden">

    <Navigation user={data.user} />
    <Hero />
    <Features />
    <Team />
    <Footer />

</div>