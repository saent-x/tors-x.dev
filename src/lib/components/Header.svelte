<script lang="ts">
  import profileImg from '/src/assets/profile-img.png?enhanced';
  import handIcon from '/src/assets/hand-icon.png?enhanced';
  import rightArrowWhite from '/src/assets/right-arrow-white.png?enhanced';
  import downloadIcon from '/src/assets/download-icon.png?enhanced';

  import { animate, inView } from 'motion';
  import { onMount } from 'svelte';

  onMount(() => {
    animate('.profile-img-container', { scale: 0 });
    inView('.profile-img-container', (el) => {
      animate(el, { scale: 1 }, { duration: 0.4, type: 'spring', stiffness: 100 });

      return () => animate(el, { scale: 0 }, { duration: 0 });
    });

    animate('#header-greeting', { y: -15, opacity: 0 });
    inView('#header-greeting', (el) => {
      animate(el, { opacity: 1 }, { duration: 0.4, delay: 0.15 });

      return () => animate(el, { y: -15, opacity: 0 });
    });

    animate('#header-job-role', { y: -30, opacity: 0 });
    inView('#header-job-role', (el) => {
      animate(el, { opacity: 1 }, { duration: 0.4, delay: 0.25 });

      return () => animate(el, { y: -30, opacity: 0 });
    });

    animate('#header-intro', { opacity: 0 }, { duration: 0 });
    inView('#header-intro', (el) => {
      animate(el, { opacity: 1 }, { duration: 0.3, delay: 0.35 });

      return () => animate(el, { opacity: 0 });
    });

    animate('#contact-btn', { y: 30, opacity: 0 }, { duration: 0 });
    inView('#contact-btn', (el) => {
      animate(el, { y: 0, opacity: 1 }, { duration: 0.3, delay: 0.5 });

      return () => animate(el, { y: 30, opacity: 0 });
    });

    animate('#resume-btn', { y: 30, opacity: 0 }, { duration: 0 });
    inView('#resume-btn', (el) => {
      animate(el, { y: 0, opacity: 1 }, { duration: 0.3, delay: 0.6 });

      return () => animate(el, { y: 30, opacity: 0 });
    });
  });
</script>

<div
  id="top"
  class="mx-auto flex h-screen w-11/12 max-w-3xl scroll-mt-20 flex-col items-center justify-center gap-4 text-center"
>
  <div>
    <div class="profile-img-container relative inline-block">
      <enhanced:img class="w-32 rounded-full" src={profileImg} alt="profile" />
      <span class="heart"></span>
    </div>
  </div>

  <h3 id="header-greeting" class="font-ovo mb-3 flex items-center gap-2 text-xl md:text-2xl">
    Hi! I'm Vangerwua Johnpaul
    <enhanced:img class="w-6" src={handIcon} alt="hand icon" />
  </h3>

  <h1 id="header-job-role" class="font-ovo text-3xl sm:text-6xl lg:text-[66px]">
    fullstack software engineer
  </h1>
  <p id="header-intro" class="font-ovo mx-auto max-w-2xl">
    I am a Software Engineer from Lagos, Nigeria based in the UK with 6+ years of experience
    building scalable web applications, mobile and desktop solutions.
  </p>

  <div class="mt-4 flex flex-col items-center gap-4 sm:flex-row">
    <a
      id="contact-btn"
      class="flex items-center gap-2 rounded-full border border-white bg-black px-10 py-3 text-white dark:bg-transparent"
      href="#contact"
    >
      contact me <enhanced:img class="w-4" src={rightArrowWhite} alt="right arrow icon" />
    </a>
    <a
      id="resume-btn"
      class="dark: flex items-center gap-2 rounded-full border border-gray-500 bg-white px-10 py-3 text-black"
      href="/assets/public/John Paul Vangerwua CV - 2025.docx"
      download
    >
      my resume <enhanced:img class="w-4" src={downloadIcon} alt="download icon" />
    </a>
  </div>
</div>
