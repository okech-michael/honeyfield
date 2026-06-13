import { defineNitroConfig } from "nitro";

export default defineNitroConfig({
  preset: "vercel",
  vercel: {
    functions: {
      runtime: "nodejs24.x",
    },
  },
});
