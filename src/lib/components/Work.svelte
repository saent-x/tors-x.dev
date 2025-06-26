<script lang="ts">
    import type { Work } from "$lib/index";

    import sendIcon from "/src/assets/send-icon.png?enhanced";
    import rightArrowBold from "/src/assets/right-arrow-bold.png?enhanced";
    import rightArrowBoldDark from "/src/assets/right-arrow-bold-dark.png?enhanced";
    
    import { theme } from '$lib/stores.svelte';
    
    import { animate, inView, hover} from "motion";
    import { onMount } from "svelte";

    const workData: Work[] = [
        {
            id: 1,
            title: 'St. Faus',
            description: 'Web & Desktop App',
            bgImage: "/assets/public/stfaus.png",
        },
        {
            id: 2,
            title: 'PrepMe',
            description: 'Web App',
            bgImage: "/assets/public/prepme.png",
        },
        {
            id: 3,
            title: 'Golang NN library',
            description: 'Library',
            bgImage: "/assets/public/nn-library.png",
        },
        {
            id: 4,
            title: 'Codereck',
            description: 'Web App',
            bgImage: "/assets/public/codereck.png",
        },
    ]
    
    onMount(() => {
      animate('#work', { opacity: 0 }, { duration: 0 });
      inView('#work', (el) => {
        animate(el, { opacity: 1 }, { duration: 1 });
          
        return () => animate(el, {opacity: 0 })
      });
      
      animate('#work-header', { y: -20, opacity: 0 }, { duration: 0 });
      inView('#work-header', (el) => {
        animate(el, { y: 0, opacity: 1 }, { duration: 0.5, delay: 0.3});
          
        return () => animate(el, {y: -20, opacity: 0 })
      });
      
      animate('#work-title', { y: -20, opacity: 0 }, { duration: 0 });
      inView('#work-title', (el) => {
        animate(el, { y: 0, opacity: 1 }, { duration: 0.5, delay: 0.5});
          
        return () => animate(el, {y: -20, opacity: 0 })
      });
      
      animate('#work-description', { opacity: 0 }, { duration: 0 });
      inView('#work-description', (el) => {
        animate(el, { opacity: 1 }, { duration: 0.5, delay: 0.7});
          
        return () => animate(el, { opacity: 0 })
      });
      
      animate('#work-data', { opacity: 0 }, { duration: 0 });
      inView('#work-data', (el) => {
        animate(el, { opacity: 1 }, { duration: 0.6, delay: 0.9});
          
        return () => animate(el, { opacity: 0 })
      });
      
      animate('#work-item', { scale: 1 }, { duration: 0 });
      hover('#work-item', (el) => {
        animate(el, { scale: 1.05 }, {duration: 0.3});
          
        return () => animate(el, { scale: 1 })
      });
      
      animate('#work-btn', { opacity: 0 }, { duration: 0 });
      inView('#work-btn', (el) => {
        animate(el, { opacity: 1 }, { duration: 0.5, delay: 1.1});
          
        return () => animate(el, { opacity: 0 })
      });
    });
</script>

<div id="work" class="w-full px-[12%] py-10 scroll-mt-20">
    <h4 id="work-header" class="text-center mb-2 text-lg font-ovo">My Portfolio</h4>
    <h2 id="work-title" class="text-center text-5xl font-ovo">My latest work</h2>

    <p id="work-description" class="text-center max-w-2xl mx-auto mt-5 mb-12 font-ovo">
        Welcome to my full-stack development portfolio! Explore collection
        of projects showcasing my expertise in full-stack development.
    </p>

    <div id="work-data" class="grid grid-cols-[var(--grid-cols-auto)] my-10 gap-5 dark:text-black">
        {#each workData as work (work.id)}
            <div id="work-item" class="aspect-square bg-no-repeat bg-cover bg-center rounded-lg relative cursor-pointer group" style="background-image: url({work.bgImage});">
                <div class="bg-[#FAF9F6] w-10/12 rounded-md absolute bottom-5 left-1/2 -translate-x-1/2 py-3 px-5 flex items-center justify-between duration-500 group-hover:bottom-7">
                    <div>
                        <h2 class="font-semibold">{work.title}</h2>
                        <p class="text-sm text-gray-700">{work.description}</p>
                    </div>
                    <div class="border rounded-full border-black w-9 aspect-square flex items-center justify-center shadow-[2px_2px_0_#000] group-hover:bg-lime-300 transition">
                        <enhanced:img class="w-5" src={sendIcon} alt="send icon"/>
                    </div>
                </div>
            </div>
        {/each}
    </div>

    <a id="work-btn" href="/" class="w-max flex items-center justify-center gap-2 dark:text-white text-gray-700 border-[0.5px] rounded-full py-3 px-10 mx-auto my-20 hover:bg-light-hover duration-500 dark:border-white dark:hover:bg-dark-hover">
        Show more 
        {#if theme.isDarkMode && theme.isInitialized}
            <enhanced:img class="w-4" src={rightArrowBoldDark} alt="right arrow" />
        {:else}
            <enhanced:img class="w-4" src={rightArrowBold} alt="right arrow" />
        {/if}
    </a>
</div>