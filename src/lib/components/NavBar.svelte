<script lang="ts">
    import headerBgColor from "/src/assets/header-bg-color.png?enhanced";
    import logo from "/src/assets/logo.png?enhanced";
    import moonIcon from "/src/assets/moon_icon.png?enhanced";
    import arrowIcon from "/src/assets/arrow-icon.png?enhanced";
    import menuBlack from "/src/assets/menu-black.png?enhanced";
    import closeBlack from "/src/assets/close-black.png?enhanced";

    let sideMenuRef: HTMLUListElement;
    let isScroll = $state(false);

    function openMenu(): void {
        sideMenuRef.style.transform = 'translateX(-16rem)';
    }

    function closeMenu(): void {
        sideMenuRef.style.transform = 'translateX(16rem)';
    }

    $effect(() => {
        window.addEventListener('scroll', () => {
            if (scrollY > 50){
                isScroll = true;
            }else {
                isScroll = false;
            }
        })
    })
</script>

<div class="fixed top-0 right-0 w-11/12 -z-10 translate-y-[-80%]">
    <enhanced:img src={headerBgColor} alt="bg-overlay" class="w-full"/>
</div>

<nav class={`w-full fixed px-5 lg:px-8 xl:px-[8%] py-4 flex items-center justify-between z-50 ${isScroll ? 'bg-white/50 backdrop-blur-lg shadow-sm' : ''}`}>
    <a href="#top" aria-label="navbar">
        <enhanced:img class="w-15 cursor-pointer mr-14" src={logo} alt="logo"/>
    </a>

    <ul class={`hidden md:flex items-center gap-6 lg:gap-8 rounded-full px-12 py-3 ${isScroll ? '' : 'bg-white/50 shadow-sm'}`}>
        <li><a class="font-ovo" href="#top" aria-label="home">Home</a></li>   
        <li><a class="font-ovo"  href="#blog" aria-label="blog">Blog</a></li>
        <li><a class="font-ovo"  href="#services" aria-label="about me">Services</a></li>
        <li><a class="font-ovo"  href="#about-me" aria-label="about me">About me</a></li>
        <li><a class="font-ovo"  href="#work" aria-label="my work">My Work</a></li>
        <li><a class="font-ovo"  href="#contact" aria-label="contact me">Contact me</a></li>
    </ul>

    <div class="flex items-center gap-4">
        <button class="cursor-pointer" aria-label="theme-switch">
            <enhanced:img class="w-6" src={moonIcon} alt="theme switch"/>
        </button>
        <a class="font-ovo hidden lg:flex items-center gap-3 px-10 py-2.5 border border-gray-500 rounded-full ml-4" href="#contact">
            Contact <enhanced:img class="w-3" src={arrowIcon} alt="contact"/>
        </a>

        <button class="block md:hidden ml-3 cursor-pointer" aria-label="menu icon" onclick={openMenu}>
            <enhanced:img src={menuBlack} alt="menu" class="w-6"/>
        </button>
    </div>

    <!-- Mobile Menu -->
    <ul bind:this={sideMenuRef} class="flex md:hidden flex-col gap-4 py-20 px-10 fixed -right-64 top-0 bottom-0 w-64 z-50 h-screen bg-rose-50 transition duration-500">
        <div class="absolute right-6 top-6" onclick={closeMenu} role="button" tabindex={0} onkeydown={e => {
            if (e.key === 'Enter' || e.key === ' ') closeMenu();
          }}>
            <enhanced:img src={closeBlack} alt="close" class="w-5 cursor-pointer"/>
        </div>
        
        <li><a class="font-ovo" onclick={closeMenu}  href="#top" aria-label="home">Home</a></li>   
        <li><a class="font-ovo" onclick={closeMenu}  href="#blog" aria-label="blog">Blog</a></li>
        <li><a class="font-ovo" onclick={closeMenu}  href="#services" aria-label="about me">Services</a></li>
        <li><a class="font-ovo" onclick={closeMenu}  href="#about-me" aria-label="about me">About me</a></li>
        <li><a class="font-ovo" onclick={closeMenu}  href="#work" aria-label="my work">My Work</a></li>
        <li><a class="font-ovo" onclick={closeMenu}  href="#contact" aria-label="contact me">Contact me</a></li>
    </ul>
</nav>