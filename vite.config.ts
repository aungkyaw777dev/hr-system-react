import { defineConfig,loadEnv  } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
export default  ({mode}) => {
  const env = loadEnv(mode, process.cwd(), '')
return defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: env.VITE_API_URL,
        changeOrigin: false,
        secure: false
      }
    }
  }
});

}

