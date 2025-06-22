<script lang="ts">
	import headerBgColor from '/src/assets/header-bg-color.png?enhanced';
	import logo from '/src/assets/logo.png?enhanced';
	import logo_white from '/src/assets/logo-white.png?enhanced';
	import moonIcon from '/src/assets/moon_icon.png?enhanced';
	import sunIcon from '/src/assets/sun_icon.png?enhanced';
	import arrowIcon from '/src/assets/arrow-icon.png?enhanced';
	import arrowIconWhite from '/src/assets/arrow-icon-dark.png?enhanced';
	import menuBlack from '/src/assets/menu-black.png?enhanced';
	import menuWhite from '/src/assets/menu-white.png?enhanced';
	import closeBlack from '/src/assets/close-black.png?enhanced';
	import closeWhite from '/src/assets/close-white.png?enhanced';
	import { toggleDarkMode, theme } from '$lib/stores.svelte';

	let sideMenuRef: HTMLUListElement;
	let isScroll = $state<boolean>(false);

	function openMenu(): void {
		sideMenuRef.style.transform = 'translateX(-16rem)';
	}

	function closeMenu(): void {
		sideMenuRef.style.transform = 'translateX(16rem)';
	}

	$effect(() => {
		window.addEventListener('scroll', () => {
			if (scrollY > 50) {
				isScroll = true;
			} else {
				isScroll = false;
			}
		});
	});
</script>

<div class="fixed top-0 right-0 -z-10 w-11/12 translate-y-[-80%] dark:hidden">
	<enhanced:img src={headerBgColor} alt="bg-overlay" class="w-full" />
</div>

<nav
	class={`fixed z-50 flex w-full items-center justify-between px-5 py-4 lg:px-8 xl:px-[8%] ${isScroll ? 'dark:bg-dark-theme bg-white/50 shadow-sm backdrop-blur-lg dark:shadow-white/20' : ''} `}
>
	<a href="#top" aria-label="navbar">
		{#if theme.isDarkMode && theme.isInitialized}
			<enhanced:img class="mr-14 w-15 cursor-pointer" src={logo_white} alt="logo" />
		{:else}
			<enhanced:img class="mr-14 w-15 cursor-pointer" src={logo} alt="logo" />
		{/if}
	</a>

	<ul
		class={`hidden items-center gap-6 rounded-full px-12 py-3 md:flex lg:gap-8 ${isScroll ? '' : 'bg-white/50 shadow-sm dark:border dark:border-white/50 dark:bg-transparent'}`}
	>
		<li><a class="font-ovo" href="#top" aria-label="home">Home</a></li>
		<li><a class="font-ovo" href="#blog" aria-label="blog">Blog</a></li>
		<li><a class="font-ovo" href="#services" aria-label="about me">Services</a></li>
		<li><a class="font-ovo" href="#about-me" aria-label="about me">About me</a></li>
		<li><a class="font-ovo" href="#work" aria-label="my work">My Work</a></li>
		<li><a class="font-ovo" href="#contact" aria-label="contact me">Contact me</a></li>
	</ul>

	<div class="flex items-center gap-4">
		<button class="cursor-pointer" aria-label="theme-switch" onclick={toggleDarkMode}>
			{#if theme.isDarkMode && theme.isInitialized}
				<enhanced:img class="w-6" src={sunIcon} alt="theme switch" />
			{:else}
				<enhanced:img class="w-6" src={moonIcon} alt="theme switch" />
			{/if}
		</button>
		<a
			class="font-ovo ml-4 hidden items-center gap-3 rounded-full border border-gray-500 px-10 py-2.5 lg:flex dark:border-white/50"
			href="#contact"
		>
			Contact

			{#if theme.isDarkMode && theme.isInitialized}
				<enhanced:img class="w-3" src={arrowIconWhite} alt="contact" />
			{:else}
				<enhanced:img class="w-3" src={arrowIcon} alt="contact" />
			{/if}
		</a>

		<button class="ml-3 block cursor-pointer md:hidden" aria-label="menu icon" onclick={openMenu}>
			{#if theme.isDarkMode && theme.isInitialized}
				<enhanced:img src={menuWhite} alt="menu" class="w-6" />
			{:else}
				<enhanced:img src={menuBlack} alt="menu" class="w-6" />
			{/if}
		</button>
	</div>

	<!-- Mobile Menu -->
	<ul
		bind:this={sideMenuRef}
		class="dark:bg-dark-hover fixed top-0 -right-64 bottom-0 z-50 flex h-screen w-64 flex-col gap-4 bg-rose-50 px-10 py-20 transition duration-500 md:hidden dark:text-white"
	>
		<div
			class="absolute top-6 right-6"
			onclick={closeMenu}
			role="button"
			tabindex={0}
			onkeydown={(e) => {
				if (e.key === 'Enter' || e.key === ' ') closeMenu();
			}}
		>
			{#if theme.isDarkMode && theme.isInitialized}
				<enhanced:img src={closeWhite} alt="close" class="w-5 cursor-pointer" />
			{:else}
				<enhanced:img src={closeBlack} alt="close" class="w-5 cursor-pointer" />
			{/if}
		</div>

		<li><a class="font-ovo" onclick={closeMenu} href="#top" aria-label="home">Home</a></li>
		<li><a class="font-ovo" onclick={closeMenu} href="#blog" aria-label="blog">Blog</a></li>
		<li>
			<a class="font-ovo" onclick={closeMenu} href="#services" aria-label="about me">Services</a>
		</li>
		<li>
			<a class="font-ovo" onclick={closeMenu} href="#about-me" aria-label="about me">About me</a>
		</li>
		<li><a class="font-ovo" onclick={closeMenu} href="#work" aria-label="my work">My Work</a></li>
		<li>
			<a class="font-ovo" onclick={closeMenu} href="#contact" aria-label="contact me">Contact me</a>
		</li>
	</ul>
</nav>
