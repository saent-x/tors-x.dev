<script lang="ts">
    import type {Tool, Info} from "$lib/index";
    
    import icon1 from "/src/assets/code-icon.png?enhanced";
    import icon1Dark from "/src/assets/code-icon-dark.png?enhanced";
    import icon2 from "/src/assets/edu-icon.png?enhanced";
    import icon2Dark from "/src/assets/edu-icon-dark.png?enhanced";
    import icon3 from "/src/assets/project-icon.png?enhanced";
    import icon3Dark from "/src/assets/project-icon-dark.png?enhanced";

    import vscode from "/src/assets/vscode.png?enhanced";
    import firebase from "/src/assets/firebase.png?enhanced";
    import mongodb from "/src/assets/mongodb.png?enhanced";
    import figma from "/src/assets/figma.png?enhanced";
    import git from "/src/assets/git.png?enhanced";
    import userImage from "/src/assets/user-image.png?enhanced";

    import { theme } from '$lib/stores.svelte';

    const infoList: Info[] = [
        { id: 1, icon: icon1 , iconDark: icon1Dark, title: 'Languages', description: 'HTML, CSS, JavaScript React Js, Next Js, Svelte' },
        { id: 2, icon: icon2, iconDark: icon2Dark, title: 'Education', description: 'BSc. in Computer Science, MSc. Cyber Security' },
        { id: 3, icon: icon3, iconDark: icon3Dark, title: 'Projects', description: 'Built more than 5 projects' }
    ];

    const tools: Tool[] = [
        {id: 1, icon: vscode}, {id: 2, icon: firebase}, {id: 3, icon: mongodb}, {id: 4, icon: figma}, {id: 5, icon: git}
    ];
</script>

<div id="about-me" class="w-full px-[12%] py-10 scroll-mt-20">
    <h4 class="text-center mb-2 text-lg font-ovo">Introduction</h4>
    <h2 class="text-center text-5xl font-ovo">About me</h2>

    <div class="flex w-full flex-col lg:flex-row items-center gap-20 my-20">
        <div class="w-64 sm:w-80 rounded-3xl max-w-none">
            <enhanced:img class="w-full rounded-3xl" src={userImage} alt="user"/>
        </div>
        <div class="flex-1">
            <p class="mb-10 max-w-2xl font-ovo">
                I am an experienced Software Engineer with 6+ years of professional 
                expertise spanning full-stack development and cybersecurity. Throughout my career, 
                I have had the privilege of collaborating with prestigious organizations including
                Tata Technologies, Analytics Intelligence, and KPMG, contributing to their success and
                growth through innovative solutions in automotive IVI applications, AI-powered systems
                , and enterprise-level platforms.
            </p>

            <ul class="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl">
                {#each infoList as info (info.id)}
                    <li class="border-[0.5px] border-gray-400 rounded-xl p-6 cursor-pointer hover:bg-light-hover hover:-translate-y-1 duration-500 hover:shadow-black dark:border-white dark:hover:shadow-white dark:hover:bg-dark-hover/50">
                        {#if theme.isDarkMode && theme.isInitialized}
                            <enhanced:img class="w-7 mt-3" src={info.iconDark} alt={info.title}/>
                        {:else}
                            <enhanced:img class="w-7 mt-3" src={info.icon} alt={info.title}/>
                        {/if}
                        <h3 class="my-4 font-semibold text-gray-700 dark:text-white">{info.title}</h3>
                        <p class="text-gray-600 text-sm  dark:text-white/80">{info.description}</p>
                    </li>
                {/each}
            </ul>

            <h4 class="my-6 text-gray-700 font-ovo dark:text-white/80">Tools I use</h4>
            <ul class="flex items-center gap-3 sm:gap-5">
                {#each tools as tool (tool.id)}
                    <li class="flex items-center justify-center w-12 sm:w-14 aspect-square border border-gray-400 rounded-lg cursor-pointer hover:-translate-y-1 duration-500">
                        <enhanced:img class="w-5 sm:w-7" src={tool.icon} alt="tool"/>
                    </li>
                {/each}
            </ul>
        </div>
    </div>
</div>