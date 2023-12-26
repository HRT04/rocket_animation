import { defineConfig } from "vite";
import fs from "fs";
// https://vitejs.dev/config/
export default defineConfig({
    server: {
        host: "0.0.0.0",
        https: {
            key: fs.readFileSync("key.pem"),
            cert: fs.readFileSync("cert.pem"),
            passphrase: "0000",
        },
    },
});
