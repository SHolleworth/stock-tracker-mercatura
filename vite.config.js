import { defineConfig } from "vite"
import { VitePWA } from "vite-plugin-pwa"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		VitePWA({
			strategies: "injectManifest",
			srcDir: "src",
			outDir: "dist",
			filename: "sw.ts",
			includeAssets: [
				"apple-icon-114x114.png",
				"apple-icon-120x120.png",
				"apple-icon-144x144.png",
				"apple-icon-152x152.png",
				"apple-icon-180x180.png",
				"apple-icon-57x57.png",
				"apple-icon-60x60.png",
				"apple-icon-72x72.png",
				"apple-icon-76x76.png",
				"apple-icon-precomposed.png",
				"apple-icon.png",
				"favicon-16x16.png",
				"favicon-32x32.png",
				"favicon-96x96.png",
				"favicon.ico",
				"ms-icon-144x144.png",
				"ms-icon-150x150.png",
				"ms-icon-70x70.png",
				"ms-icon-310x310.png",
			],
			manifest: {
				name: "Mercatura Tracker",
				short_name: "Mercatura Tracker",
				theme_color: "#ffffff",
				icons: [
					{
						src: "android-icon-36x36.png",
						sizes: "36x36",
						type: "image/png",
						density: "0.75",
					},
					{
						src: "android-icon-48x48.png",
						sizes: "48x48",
						type: "image/png",
						density: "1.0",
					},
					{
						src: "android-icon-72x72.png",
						sizes: "72x72",
						type: "image/png",
						density: "1.5",
					},
					{
						src: "android-icon-96x96.png",
						sizes: "96x96",
						type: "image/png",
						density: "2.0",
					},
					{
						src: "android-icon-144x144.png",
						sizes: "144x144",
						type: "image/png",
						density: "3.0",
					},
					{
						src: "android-icon-192x192.png",
						sizes: "192x192",
						type: "image/png",
						density: "4.0",
					},
					{
						src: "logo512.png",
						sizes: "512x512",
						type: "image/png",
					},
				],
			},
		}),
	],
	base: process.env.BASE_URL ? `${process.env.BASE_URL}` : "./",
})
