<script lang="ts">
    import logo from "/src/assets/logo.png?enhanced";
    import mail_icon from "/src/assets/mail_icon.png?enhanced";

    const current_year = new Date().getFullYear();
</script>

<div class="mt-20">
    <div class="text-center">
        <enhanced:img class="w-20 mx-auto mb-2" src={logo} alt="logo"/>

        <div class="w-max flex items-center gap-2 mx-auto">
            <enhanced:img class="w-6" src={mail_icon} alt="logo"/>
            vangerwua@outlook.com
        </div>
    </div>

    <div class="footer-links">
        <p class="text-[#626262]">© {current_year} Vangerwua Johnpaul. All rights reserved.</p>
        <ul class="footer-links-container text-[#626262]">
            <li><a class="hover:underline" target="_blank" href="https://github.com/saent-x">Github</a></li>
            <li><a class="hover:underline" target="_blank" href="https://github.com/saent-x">LinkedIn</a></li>
            <li><a class="hover:underline" target="_blank" href="https://github.com/saent-x">X</a></li>
        </ul>
    </div>
</div>