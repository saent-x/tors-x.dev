<script lang="ts">
    import type {Service} from "$lib/index";

    import web_icon from "/src/assets/web-icon.png?enhanced";
    import mobile_icon from "/src/assets/mobile-icon.png?enhanced";
    import ui_icon from "/src/assets/ui-icon.png?enhanced";
    import graphics_icon from "/src/assets/graphics-icon.png?enhanced";
    import rightArrow from "/src/assets/right-arrow.png?enhanced";
    
    import { animate, inView, hover} from "motion";

    const serviceData: Service[] = [
        { id: 1, icon: web_icon, title: 'Web design', description: 'Web development is the process of building, programming...', link: '' },
        { id: 2, icon: mobile_icon, title: 'Mobile app', description: 'Mobile app development involves creating software for mobile devices...', link: '' },
        { id: 3, icon: ui_icon, title: 'UI/UX design', description: 'UI/UX design focuses on creating a seamless user experience...', link: '' },
        { id: 4, icon: graphics_icon, title: 'Graphics design', description: 'Creative design solutions to enhance visual communication...', link: '' },
    ]
    
    $effect(() => {
      animate('#services', { opacity: 0 }, { duration: 0 });
      inView('#services', (el) => {
        animate(el, { opacity: 1 }, { duration: 1 });
          
        return () => animate(el, {opacity: 0 })
      });
      
      animate('#services h4', { y: -20, opacity: 0 }, { duration: 0 });
      inView('#services h4', (el) => {
        animate(el, { y: 0, opacity: 1 }, { duration: 0.5, delay: 0.3});
          
        return () => animate(el, {y: -20, opacity: 0 })
      });
      
      animate('#services h2', { y: -20, opacity: 0 }, { duration: 0 });
      inView('#services h2', (el) => {
        animate(el, { y: 0, opacity: 1 }, { duration: 0.5, delay: 0.5});
          
        return () => animate(el, {y: -20, opacity: 0 })
      });
      
      animate('#services p', { opacity: 0 }, { duration: 0 });
      inView('#services p', (el) => {
        animate(el, { opacity: 1 }, { duration: 0.5, delay: 0.7});
          
        return () => animate(el, { opacity: 0 })
      });
      
      animate('#service-data', { opacity: 0 }, { duration: 0 });
      inView('#service-data', (el) => {
        animate(el, { opacity: 1 }, { duration: 0.6, delay: 0.9});
          
        return () => animate(el, { opacity: 0 })
      });
      
      animate('#service-details', { scale: 1 }, { duration: 0 });
      hover('#service-details', (el) => {
        animate(el, { scale: 1.05 });
          
        return () => animate(el, { scale: 1 })
      });
    });
</script>

<div id="services" class="w-full px-[12%] py-10 scroll-mt-20">
    <h4 class="text-center mb-2 text-lg font-ovo">What I offer</h4>
    <h2 class="text-center text-5xl font-ovo">My Services</h2>

    <p class="text-center max-w-2xl mx-auto mt-5 mb-12 font-ovo">
        I am a full-stack developer with 6+ years of experience 
        in multiple companies like KPMG, TATA Technologies and 
        Analytics Intelligence
    </p>

    <div id="service-data" class="grid grid-cols-[var(--grid-cols-auto)] gap-6 my-10">
        {#each serviceData as service (service.id) }
            <div id="service-details" class="border border-gray-400 rounded-lg px-8 py-12 hover:shadow-black cursor-pointer hover:bg-light-hover hover:-translate-y-1 duration-500 dark:hover:bg-dark-hover dark:hover:shadow-white">
                <enhanced:img class="w-10" src={service.icon} alt={service.title} />
                <h3 class="text-lg my-4 text-gray-700 dark:text-white">{service.title}</h3>
                <p class="text-sm text-gray-600 leading-5 dark:text-white/80">{service.description}</p>
                <a class="flex items-center gap-2 text-sm mt-5" href={service.link}>
                    Read more <enhanced:img class="w-4" alt="right arrow" src={rightArrow}/>
                </a>
            </div>
        {/each}
    </div>
</div>