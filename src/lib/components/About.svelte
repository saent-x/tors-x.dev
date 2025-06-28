<script lang="ts">
  import type { Tool, Info } from '$lib/index';

  import icon1 from '/src/assets/code-icon.png?enhanced';
  import icon1Dark from '/src/assets/code-icon-dark.png?enhanced';
  import icon2 from '/src/assets/edu-icon.png?enhanced';
  import icon2Dark from '/src/assets/edu-icon-dark.png?enhanced';
  import icon3 from '/src/assets/project-icon.png?enhanced';
  import icon3Dark from '/src/assets/project-icon-dark.png?enhanced';

  import vscode from '/src/assets/vscode.png?enhanced';
  import mongodb from '/src/assets/mongodb.png?enhanced';
  import rust from '/src/assets/rust.png?enhanced';
  import typescript from '/src/assets/typescript.png?enhanced';
  import c_sharp from '/src/assets/c-sharp.png?enhanced';
  import postgres from '/src/assets/postgres.png?enhanced';
  import supabase from '/src/assets/supabase.png?enhanced';
  import react from '/src/assets/react.png?enhanced';
  import svelte from '/src/assets/svelte.png?enhanced';
  import userImage from '/src/assets/user-image.png?enhanced';

  import { theme } from '$lib/stores.svelte';
  import { animate, inView, hover } from 'motion';
  import { onMount } from 'svelte';

  const infoList: Info[] = [
    {
      id: 1,
      icon: icon1,
      iconDark: icon1Dark,
      title: 'Languages',
      description: 'HTML, CSS, JavaScript React Js, Next Js, Svelte'
    },
    {
      id: 2,
      icon: icon2,
      iconDark: icon2Dark,
      title: 'Education',
      description: 'BSc. in Computer Science, MSc. Cyber Security'
    },
    {
      id: 3,
      icon: icon3,
      iconDark: icon3Dark,
      title: 'Projects',
      description: 'Built 5+ enterprise projects'
    }
  ];

  const tools: Tool[] = [
    { id: 1, icon: vscode },
    { id: 2, icon: supabase },
    { id: 3, icon: mongodb },
    { id: 4, icon: postgres },
    { id: 5, icon: react },
    { id: 6, icon: svelte },
    { id: 7, icon: typescript },
    { id: 8, icon: c_sharp },
    { id: 9, icon: rust }
  ];

  onMount(() => {
    animate('#about-me', { opacity: 0 }, { duration: 0 });
    inView('#about-me', (el) => {
      animate(el, { opacity: 1 }, { duration: 0.5 });

      return () => animate(el, { opacity: 0 });
    });

    animate('#about-header-1', { y: -20, opacity: 0 }, { duration: 0 });
    inView('#about-header-1', (el) => {
      animate(el, { y: 0, opacity: 1 }, { duration: 0.25, delay: 0.15 });

      return () => animate(el, { y: -20, opacity: 0 });
    });

    animate('#about-header-2', { y: -20, opacity: 0 }, { duration: 0 });
    inView('#about-header-2', (el) => {
      animate(el, { y: 0, opacity: 1 }, { duration: 0.25, delay: 0.25 });

      return () => animate(el, { y: -20, opacity: 0 });
    });

    animate('#about-portfolio', { opacity: 0 }, { duration: 0 });
    inView('#about-portfolio', (el) => {
      animate(el, { opacity: 1 }, { duration: 0.4 });

      return () => animate(el, { opacity: 0 });
    });

    animate('#about-img', { opacity: 0, scale: 0.9 }, { duration: 0 });
    inView('#about-img', (el) => {
      animate(el, { opacity: 1, scale: 1 }, { duration: 0.3 });

      return () => animate(el, { opacity: 0, scale: 0.9 });
    });

    animate('#about-details', { opacity: 0 }, { duration: 0 });
    inView('#about-details', (el) => {
      animate(el, { opacity: 1 }, { duration: 0.3, delay: 0.4 });

      return () => animate(el, { opacity: 0 });
    });

    animate('#info-list', { opacity: 0 }, { duration: 0 });
    inView('#info-list', (el) => {
      animate(el, { opacity: 1 }, { duration: 0.4, delay: 0.5 });

      return () => animate(el, { opacity: 0 });
    });

    animate('#info-list li', { scale: 1 }, { duration: 0 });
    hover('#info-list li', (el) => {
      animate(el, { scale: 1.05 });

      return () => animate(el, { scale: 1 });
    });

    animate('#about-details h4', { y: 20, opacity: 0 }, { duration: 0 });
    inView('#about-details h4', (el) => {
      animate(el, { y: 0, opacity: 1 }, { duration: 0.25, delay: 0.5 });

      return () => animate(el, { y: 20, opacity: 0 });
    });

    animate('#info-tool', { opacity: 0 }, { duration: 0 });
    inView('#info-tool', (el) => {
      animate(el, { opacity: 1 }, { duration: 0.3, delay: 0.75 });

      return () => animate(el, { opacity: 0 });
    });

    animate('#info-tool li', { scale: 1 }, { duration: 0 });
    hover('#info-tool li', (el) => {
      animate(el, { scale: 1.1 });

      return () => animate(el, { scale: 1 });
    });
  });
</script>

<div id="about-me" class="w-full scroll-mt-20 px-[12%] py-10">
  <h4 id="about-header-1" class="font-ovo mb-2 text-center text-lg">Introduction</h4>
  <h2 id="about-header-2" class="font-ovo text-center text-5xl">About me</h2>

  <div id="about-portfolio" class="my-20 flex w-full flex-col items-center gap-20 lg:flex-row">
    <div id="about-img" class="w-64 max-w-none rounded-3xl sm:w-80">
      <enhanced:img class="w-full rounded-3xl" src={userImage} alt="user" />
    </div>
    <div id="about-details" class="flex-1">
      <p class="font-ovo mb-10 max-w-2xl text-justify">
        I am an experienced Software Engineer with 6+ years of professional expertise spanning
        full-stack development and cybersecurity. Throughout my career, I have had the privilege of
        collaborating with prestigious organizations including Tata Technologies, Analytics
        Intelligence, and KPMG, contributing to their success and growth through innovative
        solutions in automotive IVI applications, AI-powered systems , and enterprise-level
        platforms.
      </p>

      <ul id="info-list" class="grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-3">
        {#each infoList as info (info.id)}
          <li
            id="info-item"
            class="hover:bg-light-hover dark:hover:bg-dark-hover/50 cursor-pointer rounded-xl border-[0.5px] border-gray-400 p-6 duration-500 hover:-translate-y-1 hover:shadow-black dark:border-white dark:hover:shadow-white"
          >
            {#if theme.isDarkMode && theme.isInitialized}
              <enhanced:img class="mt-3 w-7" src={info.iconDark} alt={info.title} />
            {:else}
              <enhanced:img class="mt-3 w-7" src={info.icon} alt={info.title} />
            {/if}
            <h3 class="my-4 font-semibold text-gray-700 dark:text-white">{info.title}</h3>
            <p class="text-sm text-gray-600 dark:text-white/80">{info.description}</p>
          </li>
        {/each}
      </ul>

      <h4 class="font-ovo my-6 text-gray-700 dark:text-white/80">Tools I use</h4>
      <ul id="info-tool" class="flex flex-wrap items-center gap-3 sm:gap-5">
        {#each tools as tool (tool.id)}
          <li
            class="flex aspect-square w-12 cursor-pointer items-center justify-center rounded-lg border border-gray-400 duration-500 hover:-translate-y-1 sm:w-14"
          >
            <enhanced:img class="w-5 sm:w-7" src={tool.icon} alt="tool" />
          </li>
        {/each}
      </ul>
    </div>
  </div>
</div>
