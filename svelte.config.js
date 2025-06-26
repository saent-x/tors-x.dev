import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { escapeSvelte, mdsvex } from 'mdsvex';
import { dirname } from 'path';
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript';
import { getSingletonHighlighterCore } from 'shiki/core';
import { fileURLToPath } from 'url';

const config = {
  extensions: ['.svelte', '.md'],
  preprocess: [
    vitePreprocess(),
    mdsvex({
      extensions: ['.md'],
      layout: dirname(fileURLToPath(import.meta.url)) + '/src/lib/components/BlogPostLayout.svelte',
      highlight: {
        highlighter: async (code, lang = 'text') => {
          const highlighter = await getSingletonHighlighterCore({
            themes: [import('@shikijs/themes/rose-pine-dawn')],
            langs: [
              import('@shikijs/langs/javascript'),
              import('@shikijs/langs/typescript'),
              import('@shikijs/langs/svelte'),
              import('@shikijs/langs/rust'),
              import('@shikijs/langs/csharp'),
              import('@shikijs/langs/css'),
              import('@shikijs/langs/sql'),
              import('@shikijs/langs/yaml'),
              
              import ('@shikijs/langs/dockerfile'),
              import ('@shikijs/langs/bash'),
              import ('@shikijs/langs/hcl')

            ],
            engine: createJavaScriptRegexEngine()
          });
          
          // await highlighter.loadLanguage('javascript', 'typescript', 'svelte', 'rust', 'c#', 'css', 'sql', 'yaml');
          const html = escapeSvelte(highlighter.codeToHtml(code, { lang, theme: 'rose-pine-dawn' }));
                    
          return `{@html \`${html}\` }`;
        }
      }
    })
  ],
  kit: { adapter: adapter() }
};

export default config;
