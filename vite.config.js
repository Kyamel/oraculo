import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Caminho relativo: o bundle funciona em qualquer subpasta
  // (ex.: usuario.github.io/oraculo/) sem precisar saber o nome do repo.
  base: './',
  plugins: [react()],
})
