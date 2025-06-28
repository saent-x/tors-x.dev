<script lang="ts">
  import { animate, inView } from 'motion';
  import { onMount } from 'svelte';

  interface BlogPost {
    slug: string;
    title: string;
    description: string;
    date: string;
    readingTime: number;
    category: string;
    featured?: boolean;
  }

  interface PageData {
    blogPosts: BlogPost[];
  }

  interface Props {
    data: PageData;
  }

  let { data }: Props = $props();

  let subscribing = $state(false);
  let subscribe_text = $state('');

  // Get blog posts from server-loaded data
  const blogPosts: BlogPost[] = data.blogPosts;
  const featuredPosts = blogPosts.filter((post: BlogPost) => post.featured);
  const recentPosts = blogPosts.filter((post: BlogPost) => !post.featured);

  onMount(() => {
    // Animate hero section
    animate('.blog-hero', { y: -30, opacity: 0 });
    inView('.blog-hero', (el) => {
      animate(el, { y: 0, opacity: 1 }, { duration: 0.4 });
      return () => animate(el, { y: -30, opacity: 0 });
    });

    // Animate featured posts
    if (featuredPosts.length > 0) {
      animate('.featured-posts', { y: 40, opacity: 0 });
      inView('.featured-posts', (el) => {
        animate(el, { y: 0, opacity: 1 }, { duration: 0.4, delay: 0.1 });
        return () => animate(el, { y: 40, opacity: 0 });
      });
    }

    // Animate recent posts
    animate('.recent-posts', { y: 40, opacity: 0 });
    inView('.recent-posts', (el) => {
      animate(el, { y: 0, opacity: 1 }, { duration: 0.4, delay: 0.2 });
      return () => animate(el, { y: 40, opacity: 0 });
    });

    // Animate individual post cards
    const postCards: NodeListOf<Element> = document.querySelectorAll('.post-card');
    postCards.forEach((card, index) => {
      animate(card, { scale: 0.9, opacity: 0 });
      inView(card, (el) => {
        animate(
          el,
          { scale: 1, opacity: 1 },
          {
            duration: 0.3,
            delay: index * 0.05,
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

<div class="dark:bg-dark-theme min-h-screen text-gray-900 dark:text-white">
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
              <a href="/blog/posts/{post.slug}" class="block">
                <div
                  class="dark:bg-dark-hover/30 h-full rounded-lg border border-gray-200 bg-white p-8 transition-all duration-300 hover:border-gray-300 hover:shadow-lg dark:border-white/10 dark:hover:border-white/20 dark:hover:shadow-white/5"
                >
                  <div class="mb-4 flex items-center gap-4">
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
                      class="font-outfit text-sm text-gray-600 transition-transform group-hover:translate-x-1 hover:underline dark:text-blue-400"
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
              <a href="/blog/posts/{post.slug}" class="block">
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
                      class="font-outfit text-sm text-gray-600 transition-transform group-hover:translate-x-1 hover:underline dark:text-blue-400"
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
          class="font-outfit cursor-pointer rounded-full bg-black px-6 py-3 text-white transition-colors hover:bg-gray-800"
          disabled={subscribing}
          onclick={() => {
            subscribing = true;

            let interval_id = setInterval(() => {
              if (subscribe_text === 'subscribed!') {
                subscribe_text = '';
                clearInterval(interval_id);
              } else {
                subscribe_text = 'subscribed!';
                subscribing = false;
              }
            }, 2000);
          }}
        >
          {subscribing ? 'Subscribing' : 'Subscribe'}
        </button>
      </div>
    </div>
  </section>

  <p class="font-ovo pt-5 text-center text-lg">{subscribe_text}</p>
</div>

<style>
  /* Custom hover animations for post cards */
  .post-card:hover {
    transform: translateY(-2px);
  }
</style>
