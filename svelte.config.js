import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { escapeSvelte, mdsvex } from 'mdsvex';
import { dirname } from 'path';
import { createHighlighterCore } from 'shiki/core';
import { fileURLToPath } from 'url';

const config = {
  extensions: ['.svelte', '.md'],
  preprocess: [
    vitePreprocess(),
    mdsvex({
      extensions: ['.md'],
      layout:  dirname(fileURLToPath(import.meta.url)) + '/src/lib/components/BlogPostLayout.svelte',
      highlight: {
        highlighter: async (code, lang = 'text') => {
          const highlighter = await createHighlighterCore({
            themes: ['rose-pine-dawn'],
            langs: ['javascript', 'typescript', 'svelte', 'rust', 'c#', 'css', 'sql', 'yaml']
          });
          
          await highlighter.loadLanguage('javascript', 'typescript', 'svelte', 'rust', 'c#', 'css', 'sql', 'yaml');
          const html = escapeSvelte(highlighter.codeToHtml(code, { lang, theme: 'rose-pine-dawn' }));
          
          return `{@html \`${html}\` }`
        }
      }
    })
  ],
  kit: { adapter: adapter() }
};

export default config;
