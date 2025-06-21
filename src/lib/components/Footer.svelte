<script lang="ts">
    import logo from "/src/assets/logo.png?enhanced";
    import mail_icon from "/src/assets/mail_icon.png?enhanced";
    import mail_icon_dark from "/src/assets/mail_icon_dark.png?enhanced";
    import logo_white from "/src/assets/logo-white.png?enhanced";

    import { theme } from '$lib/stores.svelte';

    const current_year = new Date().getFullYear();
</script>

<div class="mt-20">
    <div class="text-center">
        {#if theme.isDarkMode && theme.isInitialized}
            <enhanced:img class="w-15 mx-auto mb-2" src={logo_white} alt="logo"/>
        {:else}
            <enhanced:img class="w-15 mx-auto mb-2" src={logo} alt="logo"/>
        {/if}

        <div class="w-max flex items-center gap-2 mx-auto">
            {#if theme.isDarkMode && theme.isInitialized}
                <enhanced:img class="w-6" src={mail_icon_dark} alt="logo"/>
            {:else}
                <enhanced:img class="w-6" src={mail_icon} alt="logo"/>
            {/if}
            vangerwua@outlook.com
        </div>
    </div>

    <div class="footer-links">
        <p class="text-[#626262] dark:text-white">© {current_year} Vangerwua Johnpaul. All rights reserved.</p>
        <ul class="footer-links-container text-[#626262] dark:text-white">
            <li><a class="hover:underline" target="_blank" href="https://github.com/saent-x">Github</a></li>
            <li><a class="hover:underline" target="_blank" href="https://www.linkedin.com/in/vanjp/">LinkedIn</a></li>
            <li><a class="hover:underline" target="_blank" href="https://x.com/saenttor">X</a></li>
        </ul>
    </div>
</div>