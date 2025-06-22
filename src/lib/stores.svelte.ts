import { browser } from '$app/environment';

const initialValue = browser ? (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) : false;

export const theme = $state({
    isDarkMode: initialValue,
    isInitialized: browser
});

export function toggleDarkMode() {
    theme.isDarkMode = !theme.isDarkMode;
}