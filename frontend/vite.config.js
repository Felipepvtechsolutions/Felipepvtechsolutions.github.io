import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Quando se usa um domínio personalizado (como www.pvtechsolutions.com.br)
// com o GitHub Pages, o site é servido a partir da raiz do domínio.
// Portanto, a base deve ser '/'.
// A variável repoName não é necessária neste caso para definir a base.
// const repoName = 'Felipepvtechsolutions.github.io';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  base: '/', 

  server: {
    proxy: {
      
      '/contato': 'http://localhost:6000'
    }
  }
})

    