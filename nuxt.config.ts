import wasm from "@rollup/plugin-wasm";

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', 'nuxt-shiki'],
  shiki: { defaultTheme: 'nord' },
  devServer: { port: 4000 },
  vite: {
    plugins: [wasm()],
  },
})