import { defineConfig } from "vite"
import { VitePWA } from "vite-plugin-pwa"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		VitePWA({
			manifest: {
				start_url: "/",
				name: "Mercatura Tracker",
				short_name: "Mercatura Tracker",
				theme_color: "#ffffff",
				icons: [
					{
						src: "/icon-192px.png",
						sizes: "192x192",
						type: "image/png",
					},
					{
						src: "/icon-512px.png",
						sizes: "512x512",
						type: "image/png",
					},
				],
			},
		}),
	],
	base: "./",
})
