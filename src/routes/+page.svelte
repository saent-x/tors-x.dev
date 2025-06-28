<script lang="ts">
  import About from '$lib/components/About.svelte';
  import Contact from '$lib/components/Contact.svelte';
  import Header from '$lib/components/Header.svelte';
  import Services from '$lib/components/Services.svelte';
  import Work from '$lib/components/Work.svelte';

  import '@fontsource-variable/outfit';
  import '@fontsource/ovo';
</script>

<div>
  <Header />
  <About />
  <Services />
  <Work />
  <Contact />
</div>
