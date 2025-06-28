<script lang="ts">
    import Footer from '$lib/components/Footer.svelte';
    import NavBar from '$lib/components/NavBar.svelte';
	import '../app.css';
	
    import { theme } from '$lib/stores.svelte';
    import { onMount } from 'svelte';
    import { afterNavigate } from '$app/navigation';

	let { children } = $props();
	
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

      // Handle hash navigation on initial load
      const hash = window.location.hash;
      if (hash) {
        setTimeout(() => {
          const element = document.querySelector(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
  });

  // Handle hash navigation after route changes
  afterNavigate(() => {
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  });
</script>

<div class="overflow-x-hidden leading-8">
   	<NavBar />
    {@render children()}
   	<Footer />
</div>
