import { browser } from '$app/environment';

const initialValue = browser ? (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) : false;
console.log(`browser: ${browser}`)

export const theme = $state({
    isDarkMode: initialValue,
    isInitialized: browser
});

console.log(`initial: ${theme.isDarkMode}`)

export function toggleDarkMode() {
    theme.isDarkMode = !theme.isDarkMode;
}