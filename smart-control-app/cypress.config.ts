import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    
    },
    viewportHeight:1200,
    viewportWidth:500
  },
});
