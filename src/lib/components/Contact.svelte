<script lang="ts">
    import { PUBLIC_WEBFORMS_ACCESS_KEY } from "$env/static/public";
    import rightArrowWhite from "../../assets/right-arrow-white.png?enhanced";

    import { animate, inView, hover} from "motion";
    
    let status = $state("");

    const handleSubmit = async (event: SubmitEvent) => {
        event.preventDefault();
        status = "submitting...";

        const formData = new FormData(event.currentTarget as HTMLFormElement)
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: json
        });
        const result = await response.json();
        if (result.success) {
            console.log(result);
            status = result.message || "Success"
        }
    }
    
    $effect(() => {
      animate('#contact', { opacity: 0 }, { duration: 0 });
      inView('#contact', (el) => {
        animate(el, { opacity: 1 }, { duration: 1 });
          
        return () => animate(el, {opacity: 0 })
      });
      
      animate('#contact h4', { y: -20, opacity: 0 }, { duration: 0 });
      inView('#contact h4', (el) => {
        animate(el, { y: 0, opacity: 1 }, { duration: 0.5, delay: 0.3});
          
        return () => animate(el, {y: -20, opacity: 0 })
      });
      
      animate('#contact h2', { y: -20, opacity: 0 }, { duration: 0 });
      inView('#contact h2', (el) => {
        animate(el, { y: 0, opacity: 1 }, { duration: 0.5, delay: 0.5});
          
        return () => animate(el, {y: -20, opacity: 0 })
      });
      
      animate('#contact-description', { opacity: 0 }, { duration: 0 });
      inView('#contact-description', (el) => {
        animate(el, { opacity: 1 }, { duration: 0.5, delay: 0.7});
          
        return () => animate(el, { opacity: 0 })
      });
      
      animate('#contact form', { opacity: 0 }, { duration: 0 });
      inView('#contact form', (el) => {
        animate(el, { opacity: 1 }, { duration: 0.5, delay: 0.9 });
          
        return () => animate(el, {opacity: 0 })
      });
      
      animate('#input-1', { x: -50, opacity: 0 }, { duration: 0 });
      inView('#input-1', (el) => {
        animate(el, { x: 0, opacity: 1 }, { duration: 0.6, delay: 1.1 });
          
        return () => animate(el, {x: -50, opacity: 0 })
      });
      
      animate('#input-2', { x: 50, opacity: 0 }, { duration: 0 });
      inView('#input-2', (el) => {
        animate(el, { x: 0, opacity: 1 }, { duration: 0.6, delay: 1.1 });
          
        return () => animate(el, {x: 50, opacity: 0 })
      });
      
      animate('#contact textarea', { y: 100, opacity: 0 }, { duration: 0 });
      inView('#contact textarea', (el) => {
        animate(el, { y: 0, opacity: 1 }, { duration: 0.5, delay: 1 });
          
        return () => animate(el, {y: 100, opacity: 0 })
      });
      
      animate('.contact-btnn', { scale: 1 }, { duration: 0 });
      hover('.contact-btn', (el) => {
        animate(el, { scale: 1.05 }, { duration: 0.3});
          
        return () => animate(el, { scale: 1 })
      });
    });
</script>

<div id="contact" class="w-full px-[12%] py-10 scroll-mt-20 bg-[url('/assets/public/footer-bg-color.png')] dark:bg-none bg-no-repeact bg-center bg-[length:90%_auto">
    <h4 class="text-center mb-2 text-lg font-ovo">Connect with me</h4>
    <h2 class="text-center text-5xl font-ovo">Get in touch</h2>

    <p id="contact-description" class="text-center max-w-2xl mx-auto mt-5 mb-12 font-ovo">
        Have something on your mind? I'd love to connect with you! 
        Whether you have questions, thoughts, or suggestions, feel 
        free to reach out using the form below.
    </p>

    <form class="max-w-2xl mx-auto" onsubmit={handleSubmit}>
        <input type="hidden" name="access_key" value={PUBLIC_WEBFORMS_ACCESS_KEY}>
        <div class="grid grid-cols-[var(--grid-cols-auto)] gap-6 mt-10 mb-8">
            <input id="input-1" class="contact-input" name="name" type="text" placeholder="Enter your name" required />
            <input id="input-2" class="contact-input" name="email" type="email" placeholder="Enter your email" required />
        </div>

        <textarea class="contact-textarea" name="message" rows={6} placeholder="Enter your message" required></textarea>
        <button class="contact-btn" type="submit">
            Submit <enhanced:img class="w-4" alt="submit button" src={rightArrowWhite} />
        </button>

        <p class="mt-4">{status}</p>
    </form>
</div>