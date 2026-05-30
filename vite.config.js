import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        demo: resolve(__dirname, "demo/index.html"),
        newYorkHeating: resolve(__dirname, "demo/new-york-heating/index.html"),
        iceAgeMechanical: resolve(__dirname, "demo/ice-age-mechanical/index.html"),
        coilTechs: resolve(__dirname, "demo/coil-techs/index.html"),
        tonnageHvac: resolve(__dirname, "demo/tonnage-hvac/index.html"),
        airWaveAc: resolve(__dirname, "demo/air-wave-ac/index.html"),
      },
    },
  },
});
