<script lang="ts">
    import profileImg from "/src/assets/profile-img.png?enhanced";
    import handIcon from "/src/assets/hand-icon.png?enhanced";
    import rightArrowWhite from "/src/assets/right-arrow-white.png?enhanced";
    import downloadIcon from "/src/assets/download-icon.png?enhanced";
</script>

<div class="w-11/12 max-w-3xl text-center mx-auto h-screen flex flex-col items-center justify-center gap-4">
    <div>
        <enhanced:img class="rounded-full w-32" src={profileImg} alt="profile"/>
    </div>

    <h3 class="flex items-center gap-2 text-xl md:text-2xl mb-3 font-ovo">
        Hi! I'm Vangerwua Johnpaul
        <enhanced:img class="w-6" src={handIcon} alt="hand icon"/>
    </h3>

    <h1 class="text-3xl sm:text-6xl lg:text-[66px] font-ovo">
        fullstack software engineer
    </h1>
    <p class="max-w-2xl mx-auto font-ovo">
        I am a Software Engineer from Lagos, Nigeria based in the UK with 6+ years of 
        experience building scalable web applications, mobile and desktop solutions.
    </p>

    <div class="flex flex-col sm:flex-row items-center gap-4 mt-4">
        <a class="px-10 py-3 border rounded-full text-white border-white flex items-center gap-2 bg-black" href="#contact">
            contact me <enhanced:img class="w-4" src={rightArrowWhite} alt="right arrow icon"/>
        </a>
        <a 
            class="px-10 py-3 border rounded-full border-gray-500 flex items-center gap-2" 
            href="/static/assets/public/sample-resume.pdf" download>
            my resume <enhanced:img class="w-4" src={downloadIcon} alt="download icon"/>
        </a>
    </div>
</div>