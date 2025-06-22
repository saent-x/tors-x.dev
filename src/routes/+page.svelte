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

	import { theme } from '$lib/stores.svelte';
	import { onMount } from 'svelte';

	onMount(() => {
      $effect(() => {
              if (theme.isDarkMode) {
                  document.documentElement.classList.add('dark');
                  localStorage.theme = 'dark';
              } else {
                  document.documentElement.classList.remove('dark');
                  localStorage.theme = '';
              }
      });
	})

</script>

<div class="overflow-x-hidden leading-8">
	<NavBar />
	<Header />
	<About />
	<Services />
	<Work />
	<Contact />
	<Footer />
</div>
