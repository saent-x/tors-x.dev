<script lang="ts">
  import type { Service } from '$lib/index';

  import web_icon from '/src/assets/web-icon.png?enhanced';
  import mobile_icon from '/src/assets/mobile-icon.png?enhanced';
  import desktop_icon from '/src/assets/desktop-icon.png?enhanced';
  import backend_icon from '/src/assets/backend-icon.png?enhanced';
  import rightArrow from '/src/assets/right-arrow.png?enhanced';

  import { animate, inView, hover } from 'motion';
  import { onMount } from 'svelte';

  const serviceData: Service[] = [
    {
      id: 1,
      icon: web_icon,
      title: 'Web development',
      description: 'Web app development with responsive and efficient UI/UX for users.',
      link: ''
    },
    {
      id: 2,
      icon: mobile_icon,
      title: 'Mobile app',
      description: 'Cross platform mobile app development focusing on performance.',
      link: ''
    },
    {
      id: 3,
      icon: desktop_icon,
      title: 'Desktop app',
      description: 'Cross platform desktop app development with seamless UI/UX functionality.',
      link: ''
    },
    {
      id: 4,
      icon: backend_icon,
      title: 'Backend services',
      description:
        'Full-stack backend development including API design, database architecture, server deployment, and cloud infrastructure management.',
      link: ''
    }
  ];

  onMount(() => {
    animate('#services', { opacity: 0 }, { duration: 0 });
    inView('#services', (el) => {
      animate(el, { opacity: 1 }, { duration: 0.5 });

      return () => animate(el, { opacity: 0 });
    });

    animate('#services h4', { y: -20, opacity: 0 }, { duration: 0 });
    inView('#services h4', (el) => {
      animate(el, { y: 0, opacity: 1 }, { duration: 0.25, delay: 0.15 });

      return () => animate(el, { y: -20, opacity: 0 });
    });

    animate('#services h2', { y: -20, opacity: 0 }, { duration: 0 });
    inView('#services h2', (el) => {
      animate(el, { y: 0, opacity: 1 }, { duration: 0.25, delay: 0.25 });

      return () => animate(el, { y: -20, opacity: 0 });
    });

    animate('#services p', { opacity: 0 }, { duration: 0 });
    inView('#services p', (el) => {
      animate(el, { opacity: 1 }, { duration: 0.25, delay: 0.35 });

      return () => animate(el, { opacity: 0 });
    });

    animate('#service-data', { opacity: 0 }, { duration: 0 });
    inView('#service-data', (el) => {
      animate(el, { opacity: 1 }, { duration: 0.3, delay: 0.45 });

      return () => animate(el, { opacity: 0 });
    });

    animate('#service-details', { scale: 1 }, { duration: 0 });
    hover('#service-details', (el) => {
      animate(el, { scale: 1.05 });

      return () => animate(el, { scale: 1 });
    });
  });
</script>

<div id="services" class="w-full scroll-mt-20 px-[12%] py-10">
  <h4 class="font-ovo mb-2 text-center text-lg">What I offer</h4>
  <h2 class="font-ovo text-center text-5xl">My Services</h2>

  <p class="font-ovo mx-auto mt-5 mb-12 max-w-2xl text-center">
    I am a full-stack developer with 6+ years of experience in multiple companies like KPMG, TATA
    Technologies and Analytics Intelligence
  </p>

  <div id="service-data" class="my-10 grid grid-cols-[var(--grid-cols-auto)] gap-6">
    {#each serviceData as service (service.id)}
      <div
        id="service-details"
        class="hover:bg-light-hover dark:hover:bg-dark-hover cursor-pointer rounded-lg border border-gray-400 px-8 py-12 duration-500 hover:-translate-y-1 hover:shadow-black dark:hover:shadow-white"
      >
        <enhanced:img class="w-10" src={service.icon} alt={service.title} />
        <h3 class="my-4 text-lg text-gray-700 dark:text-white">{service.title}</h3>
        <p class="text-sm leading-5 text-gray-600 dark:text-white/80">{service.description}</p>
        <a class="mt-5 flex items-center gap-2 text-sm" href={service.link}>
          Read more <enhanced:img class="w-4" alt="right arrow" src={rightArrow} />
        </a>
      </div>
    {/each}
  </div>
</div>
