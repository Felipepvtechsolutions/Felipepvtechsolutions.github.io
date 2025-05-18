    import { defineConfig } from 'vite'
    import react from '@vitejs/plugin-react'
    
    const repoName = 'Felipepvtechsolutions.github.io'; 
    export default defineConfig({
      plugins: [react()],
      base: `/${repoName}/`, 

      server: {
        proxy: {
          
          '/contato': 'http://localhost:5000'
        }
      }
    })
    