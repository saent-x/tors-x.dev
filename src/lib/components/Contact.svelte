<script lang="ts">
    import { PUBLIC_WEBFORMS_ACCESS_KEY } from "$env/static/public";
    import rightArrowWhite from "../../assets/right-arrow-white.png?enhanced";

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
</script>

<div id="contact" class="w-full px-[12%] py-10 scroll-mt-20 bg-[url('/assets/public/footer-bg-color.png')] dark:bg-none bg-no-repeact bg-center bg-[length:90%_auto">
    <h4 class="text-center mb-2 text-lg font-ovo">Connect with me</h4>
    <h2 class="text-center text-5xl font-ovo">Get in touch</h2>

    <p class="text-center max-w-2xl mx-auto mt-5 mb-12 font-ovo">
        Have something on your mind? I'd love to connect with you! 
        Whether you have questions, thoughts, or suggestions, feel 
        free to reach out using the form below.
    </p>

    <form class="max-w-2xl mx-auto" onsubmit={handleSubmit}>
        <input type="hidden" name="access_key" value={PUBLIC_WEBFORMS_ACCESS_KEY}>
        <div class="grid grid-cols-[var(--grid-cols-auto)] gap-6 mt-10 mb-8">
            <input class="contact-input" name="name" type="text" placeholder="Enter your name" required />
            <input class="contact-input" name="email" type="email" placeholder="Enter your email" required />
        </div>

        <textarea class="contact-textarea" name="message" rows={6} placeholder="Enter your message" required></textarea>
        <button class="contact-btn" type="submit">
            Submit <enhanced:img class="w-4" alt="submit button" src={rightArrowWhite} />
        </button>

        <p class="mt-4">{status}</p>
    </form>
</div>