<script lang="ts">
  import type { Work } from '$lib/index';

  import sendIcon from '/src/assets/send-icon.png?enhanced';
  import rightArrowBold from '/src/assets/right-arrow-bold.png?enhanced';
  import rightArrowBoldDark from '/src/assets/right-arrow-bold-dark.png?enhanced';

  import { theme } from '$lib/stores.svelte';

  import { animate, inView, hover } from 'motion';
  import { onMount } from 'svelte';

  const workData: Work[] = [
    {
      id: 1,
      title: 'St. Faus',
      description: 'Web & Desktop App',
      bgImage: '/assets/public/stfaus.png'
    },
    {
      id: 2,
      title: 'PrepMe',
      description: 'Web App',
      bgImage: '/assets/public/prepme.png'
    },
    {
      id: 3,
      title: 'Golang NN library',
      description: 'Library',
      bgImage: '/assets/public/nn-library.png'
    },
    {
      id: 4,
      title: 'Coderev',
      description: 'Web App',
      bgImage: '/assets/public/codereck.png'
    }
  ];

  onMount(() => {
    animate('#work', { opacity: 0 }, { duration: 0 });
    inView('#work', (el) => {
      animate(el, { opacity: 1 }, { duration: 0.5 });

      return () => animate(el, { opacity: 0 });
    });

    animate('#work-header', { y: -20, opacity: 0 }, { duration: 0 });
    inView('#work-header', (el) => {
      animate(el, { y: 0, opacity: 1 }, { duration: 0.25, delay: 0.15 });

      return () => animate(el, { y: -20, opacity: 0 });
    });

    animate('#work-title', { y: -20, opacity: 0 }, { duration: 0 });
    inView('#work-title', (el) => {
      animate(el, { y: 0, opacity: 1 }, { duration: 0.25, delay: 0.25 });

      return () => animate(el, { y: -20, opacity: 0 });
    });

    animate('#work-description', { opacity: 0 }, { duration: 0 });
    inView('#work-description', (el) => {
      animate(el, { opacity: 1 }, { duration: 0.25, delay: 0.35 });

      return () => animate(el, { opacity: 0 });
    });

    animate('#work-data', { opacity: 0 }, { duration: 0 });
    inView('#work-data', (el) => {
      animate(el, { opacity: 1 }, { duration: 0.3, delay: 0.45 });

      return () => animate(el, { opacity: 0 });
    });

    animate('#work-item', { scale: 1 }, { duration: 0 });
    hover('#work-item', (el) => {
      animate(el, { scale: 1.05 }, { duration: 0.15 });

      return () => animate(el, { scale: 1 });
    });

    animate('#work-btn', { opacity: 0 }, { duration: 0 });
    inView('#work-btn', (el) => {
      animate(el, { opacity: 1 }, { duration: 0.25, delay: 0.55 });

      return () => animate(el, { opacity: 0 });
    });
  });
</script>

<div id="work" class="w-full scroll-mt-20 px-[12%] py-10">
  <h4 id="work-header" class="font-ovo mb-2 text-center text-lg">My Portfolio</h4>
  <h2 id="work-title" class="font-ovo text-center text-5xl">My latest work</h2>

  <p id="work-description" class="font-ovo mx-auto mt-5 mb-12 max-w-2xl text-center">
    Welcome to my full-stack development portfolio! Explore collection of projects showcasing my
    expertise in full-stack development.
  </p>

  <div id="work-data" class="my-10 grid grid-cols-[var(--grid-cols-auto)] gap-5 dark:text-black">
    {#each workData as work (work.id)}
      <div
        id="work-item"
        class="group relative aspect-square cursor-pointer rounded-lg bg-cover bg-center bg-no-repeat"
        style="background-image: url({work.bgImage});"
      >
        <div
          class="absolute bottom-5 left-1/2 flex w-10/12 -translate-x-1/2 items-center justify-between rounded-md bg-[#FAF9F6] px-5 py-3 duration-500 group-hover:bottom-7"
        >
          <div>
            <h2 class="font-semibold">{work.title}</h2>
            <p class="text-sm text-gray-700">{work.description}</p>
          </div>
          <div
            class="flex aspect-square w-9 items-center justify-center rounded-full border border-black shadow-[2px_2px_0_#000] transition group-hover:bg-lime-300"
          >
            <enhanced:img class="w-5" src={sendIcon} alt="send icon" />
          </div>
        </div>
      </div>
    {/each}
  </div>

  <a
    id="work-btn"
    href="/"
    class="hover:bg-light-hover dark:hover:bg-dark-hover mx-auto my-20 flex w-max items-center justify-center gap-2 rounded-full border-[0.5px] px-10 py-3 text-gray-700 duration-500 dark:border-white dark:text-white"
  >
    Show more
    {#if theme.isDarkMode && theme.isInitialized}
      <enhanced:img class="w-4" src={rightArrowBoldDark} alt="right arrow" />
    {:else}
      <enhanced:img class="w-4" src={rightArrowBold} alt="right arrow" />
    {/if}
  </a>
</div>
