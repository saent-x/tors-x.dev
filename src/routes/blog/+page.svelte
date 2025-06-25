<script lang="ts">
  import { animate, inView } from 'motion';
  import { onMount } from 'svelte';

  // Blog posts data - in a real app, this would come from a CMS or API
  const blogPosts = [
    {
      slug: 'building-scalable-web-applications',
      title: 'Building Scalable Web Applications with Modern JavaScript',
      description:
        'Explore the best practices and architectural patterns for creating web applications that can handle millions of users.',
      date: '2024-01-15',
      readingTime: 8,
      category: 'Development',
      featured: true
    },
    {
      slug: 'mastering-svelte-performance',
      title: 'Mastering Svelte 5: Performance Optimization Techniques',
      description:
        "Deep dive into Svelte 5's new features and learn how to optimize your applications for maximum performance.",
      date: '2024-01-10',
      readingTime: 12,
      category: 'Svelte',
      featured: true
    },
    {
      slug: 'typescript-advanced-patterns',
      title: 'Advanced TypeScript Patterns for Better Code Quality',
      description:
        'Discover advanced TypeScript patterns that will help you write more maintainable and type-safe code.',
      date: '2024-01-05',
      readingTime: 10,
      category: 'TypeScript',
      featured: false
    },
    {
      slug: 'fullstack-deployment-strategies',
      title: 'Full-Stack Deployment Strategies in 2024',
      description:
        'A comprehensive guide to deploying modern full-stack applications with CI/CD pipelines and container orchestration.',
      date: '2024-01-01',
      readingTime: 15,
      category: 'DevOps',
      featured: false
    }
  ];

  const featuredPosts = blogPosts.filter((post) => post.featured);
  const recentPosts = blogPosts.filter((post) => !post.featured);

  onMount(() => {
    // Animate hero section
    animate('.blog-hero', { y: -30, opacity: 0 });
    inView('.blog-hero', (el) => {
      animate(el, { y: 0, opacity: 1 }, { duration: 0.8 });
      return () => animate(el, { y: -30, opacity: 0 });
    });

    // Animate featured posts
    animate('.featured-posts', { y: 40, opacity: 0 });
    inView('.featured-posts', (el) => {
      animate(el, { y: 0, opacity: 1 }, { duration: 0.8, delay: 0.2 });
      return () => animate(el, { y: 40, opacity: 0 });
    });

    // Animate recent posts
    animate('.recent-posts', { y: 40, opacity: 0 });
    inView('.recent-posts', (el) => {
      animate(el, { y: 0, opacity: 1 }, { duration: 0.8, delay: 0.4 });
      return () => animate(el, { y: 40, opacity: 0 });
    });

    // Animate individual post cards
    const postCards = document.querySelectorAll('.post-card');
    postCards.forEach((card, index) => {
      animate(card, { scale: 0.9, opacity: 0 });
      inView(card, (el) => {
        animate(
          el,
          { scale: 1, opacity: 1 },
          {
            duration: 0.6,
            delay: index * 0.1,
            type: 'spring',
            stiffness: 120
          }
        );
        return () => animate(el, { scale: 0.9, opacity: 0 });
      });
    });
  });

  function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
</script>

<svelte:head>
  <title>Blog - Vangerwua Johnpaul</title>
  <meta
    name="description"
    content="Technical articles and insights on web development, software engineering, and modern technologies."
  />
</svelte:head>

<div class="dark:bg-dark-theme min-h-screen bg-white text-gray-900 dark:text-white">
  <!-- Navigation back to main site -->
  <!-- <nav
    class="dark:bg-dark-theme/80 fixed top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-lg dark:border-white/20"
  >
    <div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
      <a
        href="/"
        class="font-ovo text-lg transition-colors hover:text-gray-600 dark:hover:text-gray-300"
      >
        ← Back to Portfolio
      </a>
      <div class="font-ovo text-lg font-semibold">Blog</div>
    </div>
  </nav> -->

  <!-- Hero Section -->
  <section class="blog-hero px-6 pt-24 pb-16">
    <div class="mx-auto max-w-6xl text-center">
      <h1 class="font-ovo mb-6 text-5xl leading-tight font-bold md:text-6xl">Blog</h1>
      <p
        class="font-ovo mx-auto max-w-2xl text-xl leading-relaxed text-gray-600 dark:text-gray-300"
      >
        Insights, tutorials, and thoughts on modern web development, software engineering, and
        emerging technologies.
      </p>
    </div>
  </section>

  <!-- Featured Posts -->
  {#if featuredPosts.length > 0}
    <section class="featured-posts px-6 pb-16">
      <div class="mx-auto max-w-6xl">
        <h2 class="font-ovo mb-8 text-center text-3xl font-bold">Featured Posts</h2>
        <div class="grid gap-8 md:grid-cols-2">
          {#each featuredPosts as post (post.slug)}
            <article class="post-card group">
              <a href="/blog/{post.slug}" class="block">
                <div
                  class="dark:bg-dark-hover/30 h-full rounded-lg border border-gray-200 bg-gray-50 p-8 transition-all duration-300 hover:border-gray-300 hover:shadow-lg dark:border-white/10 dark:hover:border-white/20 dark:hover:shadow-white/5"
                >
                  <div class="mb-4 flex items-center gap-4">
                    <span
                      class="font-outfit rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                    >
                      {post.category}
                    </span>
                    <span class="font-outfit text-sm text-gray-500 dark:text-gray-400">
                      {post.readingTime} min read
                    </span>
                  </div>
                  <h3
                    class="font-ovo mb-4 text-2xl font-bold transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400"
                  >
                    {post.title}
                  </h3>
                  <p class="font-outfit mb-6 leading-relaxed text-gray-600 dark:text-gray-300">
                    {post.description}
                  </p>
                  <div class="flex items-center justify-between">
                    <time class="font-outfit text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(post.date)}
                    </time>
                    <span
                      class="font-outfit text-sm text-blue-600 transition-transform group-hover:translate-x-1 dark:text-blue-400"
                    >
                      Read more →
                    </span>
                  </div>
                </div>
              </a>
            </article>
          {/each}
        </div>
      </div>
    </section>
  {/if}

  <!-- Recent Posts -->
  {#if recentPosts.length > 0}
    <section class="recent-posts px-6 pb-16">
      <div class="mx-auto max-w-6xl">
        <h2 class="font-ovo mb-8 text-center text-3xl font-bold">Recent Posts</h2>
        <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          {#each recentPosts as post (post.slug)}
            <article class="post-card group">
              <a href="/blog/{post.slug}" class="block">
                <div
                  class="dark:bg-dark-hover/20 h-full rounded-lg border border-gray-200 bg-white p-6 transition-all duration-300 hover:border-gray-300 hover:shadow-md dark:border-white/10 dark:hover:border-white/20 dark:hover:shadow-white/5"
                >
                  <div class="mb-3 flex items-center gap-4">
                    <span
                      class="font-outfit rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                    >
                      {post.category}
                    </span>
                    <span class="font-outfit text-sm text-gray-500 dark:text-gray-400">
                      {post.readingTime} min read
                    </span>
                  </div>
                  <h3
                    class="font-ovo mb-3 text-xl font-bold transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400"
                  >
                    {post.title}
                  </h3>
                  <p
                    class="font-outfit mb-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300"
                  >
                    {post.description}
                  </p>
                  <div class="flex items-center justify-between">
                    <time class="font-outfit text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(post.date)}
                    </time>
                    <span
                      class="font-outfit text-sm text-blue-600 transition-transform group-hover:translate-x-1 dark:text-blue-400"
                    >
                      Read more →
                    </span>
                  </div>
                </div>
              </a>
            </article>
          {/each}
        </div>
      </div>
    </section>
  {/if}

  <!-- Newsletter Signup Section -->
  <section class="dark:bg-dark-hover/20 bg-gray-50 px-6 py-16">
    <div class="mx-auto max-w-4xl text-center">
      <h2 class="font-ovo mb-4 text-3xl font-bold">Stay Updated</h2>
      <p class="font-outfit mx-auto mb-8 max-w-2xl text-gray-600 dark:text-gray-300">
        Get notified when I publish new articles about web development, software engineering, and
        technology insights.
      </p>
      <div class="mx-auto flex max-w-md flex-col gap-4 sm:flex-row">
        <input
          type="email"
          placeholder="Enter your email"
          class="font-outfit dark:bg-dark-hover/30 flex-1 rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-white/20 dark:text-white dark:placeholder-gray-400"
        />
        <button
          class="font-outfit rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
        >
          Subscribe
        </button>
      </div>
    </div>
  </section>
</div>

<style>
  /* Custom hover animations for post cards */
  .post-card:hover {
    transform: translateY(-2px);
  }
</style>
