<script lang="ts">
    import Footer from '$lib/components/Footer.svelte';
    import NavBar from '$lib/components/NavBar.svelte';
	import '../app.css';

	let { children } = $props();
</script>

<div>
   	<NavBar />
    {@render children()}
   	<Footer />
</div>
