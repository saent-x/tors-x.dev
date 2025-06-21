<script lang="ts">
	import About from '$lib/components/About.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import NavBar from '$lib/components/NavBar.svelte';
	import Services from '$lib/components/Services.svelte';
	import Work from '$lib/components/Work.svelte';

    import '@fontsource-variable/outfit';
    import '@fontsource/ovo';
</script>

<div class="leading-8 overflow-x-hidden">
    <NavBar />
    <Header />
    <About />
    <Services />
    <Work />
    <Contact />
    <Footer />
</div>