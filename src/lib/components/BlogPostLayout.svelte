<script lang="ts">
  import { animate, inView } from 'motion';
  import { onMount } from 'svelte';

  let {
    children,
    title = '',
    description = '',
    date = '',
    readingTime = 0,
    category = ''
  } = $props();

  onMount(() => {
    animate('.blog-content', { y: 30, opacity: 0 });
    inView('.blog-content', (el) => {
      animate(el, { y: 0, opacity: 1 }, { duration: 0.8, delay: 0.2 });
      return () => animate(el, { y: 30, opacity: 0 });
    });

    animate('.blog-header', { y: -20, opacity: 0 });
    inView('.blog-header', (el) => {
      animate(el, { y: 0, opacity: 1 }, { duration: 0.6 });
      return () => animate(el, { y: -20, opacity: 0 });
    });
  });
</script>

<svelte:head>
  <title>{title} - Blog</title>
  <meta name="description" content={description} />
</svelte:head>

<div class="dark:bg-dark-theme min-h-screen bg-white text-gray-900 dark:text-white">

  <!-- Blog post content -->
  <article class="mx-auto max-w-4xl px-6 pt-40 pb-16">
    <header class="blog-header mb-12 text-center">
      <h1 class="font-ovo mb-4 text-4xl leading-tight font-bold md:text-5xl">
        {title}
      </h1>
      <div class="mb-6 flex items-center justify-center gap-4 text-gray-600 dark:text-gray-400">
        <time class="font-outfit">{date}</time>
        {#if readingTime}
          <span>•</span>
          <span class="font-outfit">{readingTime} min read</span>
        {/if}
        {#if category}
          <span>•</span>
          <span class="font-outfit dark:bg-dark-hover rounded-full bg-gray-100 px-3 py-1 text-sm">
            {category}
          </span>
        {/if}
      </div>
      {#if description}
        <p
          class="font-outfit mx-auto max-w-2xl text-xl leading-relaxed text-gray-600 dark:text-gray-300"
        >
          {description}
        </p>
      {/if}
    </header>

    <div
      class="blog-content prose prose-lg dark:prose-invert prose-headings:font-ovo
			prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:font-outfit
			prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-a:text-blue-600
			dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline prose-code:bg-gray-100
			dark:prose-code:bg-dark-hover prose-code:px-2 prose-code:py-1 prose-code:rounded prose-pre:bg-gray-900
			dark:prose-pre:bg-black prose-pre:border prose-pre:border-gray-700 prose-blockquote:border-l-4
			prose-blockquote:border-blue-500 prose-blockquote:bg-gray-50 dark:prose-blockquote:bg-dark-hover/30 prose-img:rounded-lg
			prose-img:shadow-lg prose-ul:font-outfit
			prose-ol:font-outfit prose-li:text-gray-700 dark:prose-li:text-gray-300 max-w-none"
    >
      {@render children()}
    </div>

    <!-- Back to blog link -->
    <div class="mt-16 border-t border-gray-200 pt-8 text-center dark:border-white/20">
      <a
        href="/blog"
        class="font-ovo inline-flex items-center gap-2 text-lg text-black-600 transition-colors hover:text-gray-500 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
      >
        ← Back to all posts
      </a>
    </div>
  </article>
</div>

<style>
  /* Custom styles for better typography */
  :global(.blog-content h1) {
    margin-top: 3rem;
    margin-bottom: 1.5rem;
    font-size: 1.875rem;
  }

  @media (min-width: 768px) {
    :global(.blog-content h1) {
      font-size: 2.25rem;
    }
  }

  :global(.blog-content h2) {
    margin-top: 2.5rem;
    margin-bottom: 1rem;
    font-size: 1.5rem;
  }

  @media (min-width: 768px) {
    :global(.blog-content h2) {
      font-size: 1.875rem;
    }
  }

  :global(.blog-content h3) {
    margin-top: 2rem;
    margin-bottom: 0.75rem;
    font-size: 1.25rem;
  }

  @media (min-width: 768px) {
    :global(.blog-content h3) {
      font-size: 1.5rem;
    }
  }

  :global(.blog-content p) {
    margin-bottom: 1.5rem;
  }

  :global(.blog-content img) {
    margin-top: 2rem;
    margin-bottom: 2rem;
  }

  :global(.blog-content blockquote) {
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
  }

  :global(.blog-content pre) {
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
    overflow-x: auto;
    padding: 1rem;
  }

  :global(.blog-content ul, .blog-content ol) {
    margin-bottom: 1.5rem;
  }

  :global(.blog-content li) {
    margin-bottom: 0.5rem;
  }
</style>
