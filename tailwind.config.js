/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		container: {
			center: true,
		},
		colors: {
			white: {
				100: 'hsla(178, 54%, 99%, 1)',
				200: 'hsla(178, 54%, 90%, 1)',
				300: 'hsla(178, 54%, 80%, 1)',
			},
			blue: {
				100: 'hsla(178, 44%, 70%, 1)',
				200: 'hsla(178, 44%, 60%, 1)',
				300: 'hsla(178, 44%, 50%, 1)',
			},
			black: {
				100: 'hsla(291, 19%, 23%, 1)',
				200: 'hsla(291, 19%, 13%, 1)',
				300: 'hsla(291, 19%, 3%, 1)',
			},
			purple: {
				100: 'hsla(291, 35%, 28%, 1)',
				200: 'hsla(291, 35%, 18%, 1)',
				300: 'hsla(291, 35%, 8%, 1)',
			},
			lavender: {
				100: 'hsla(264, 49%, 85%, 1)',
				200: 'hsla(264, 49%, 75%, 1)',
				300: 'hsla(264, 49%, 65%, 1)',
			},
			yellow: {
				100: 'hsla(55, 100%, 80%, 1)',
				200: 'hsla(55, 100%, 70%, 1)',
				300: 'hsla(55, 100%, 50%, 1)',
			},
			green: {
				100: 'hsla(153, 100%, 43%, 1)',
				200: 'hsla(153, 100%, 33%, 1)',
				300: 'hsla(153, 100%, 23%, 1)',
			},
		},
		fontSize: {
			'step--2': ['clamp(0.6944rem, 0.6919rem + 0.0124vw, 0.7038rem)'],
			'step--1': 'clamp(0.8331rem, 0.8057rem + 0.1378vw, 0.9375rem)',
			'step-0': 'clamp(1rem, 0.9344rem + 0.33vw, 1.25rem)',
			'step-1': 'clamp(1.2rem, 1.0777rem + 0.6155vw, 1.6663rem)',
			'step-2': 'clamp(1.44rem, 1.235rem + 1.0314vw, 2.2213rem)',
			'step-3': 'clamp(1.7281rem, 1.4047rem + 1.6271vw, 2.9606rem)',
			'step-4': 'clamp(2.0738rem, 1.5823rem + 2.4728vw, 3.9469rem)',
			'step-5': 'clamp(2.4881rem, 1.7607rem + 3.6601vw, 5.2606rem)',
		},
		letterSpacing: {
			'3xs': '-1.5%',
			'2xs': '-0.5%',
			xs: '-0.25%',
			s: '0',
			m: '0.25%',
			l: '0.5%',
			xl: '1.5%',
			'2xl': '2%',
		},
		extend: {
			screens: {
				tablet: '960px',
				desktop: '1530px',
				'3xl': '1920px',
			},
			spacing: {
				'space-3xs': 'clamp(0.25rem, 0.2336rem + 0.0825vw, 0.3125rem)',
				'space-2xs': 'clamp(0.5rem, 0.4672rem + 0.165vw, 0.625rem)',
				'space-xs': 'clamp(0.75rem, 0.7008rem + 0.2475vw, 0.9375rem)',
				'space-s': 'clamp(1rem, 0.9344rem + 0.33vw, 1.25rem)',
				'space-m': 'clamp(1.5rem, 1.4016rem + 0.495vw, 1.875rem)',
				'space-l': 'clamp(2rem, 1.8688rem + 0.6601vw, 2.5rem)',
				'space-xl': 'clamp(3rem, 2.8032rem + 0.9901vw, 3.75rem)',
				'space-2xl': 'clamp(4rem, 3.7376rem + 1.3201vw, 5rem)',
				'space-3xl': 'clamp(6rem, 5.6064rem + 1.9802vw, 7.5rem)',
			},
			animation: {
				scroll: 'scroll 28s linear infinite',
			},
			keyframes: {
				scroll: {
					from: { transform: 'translateX(0%)' },
					to: { transform: 'translateX(-100%)' },
				},
			},
			cursor: {
				fancy: 'url(cursor-default.png), auto',
				fancyFocus: 'url(cursor-green.png), pointer',
			},
			scale: {
				'-1': '-1',
				200: '2',
				400: '4',
			},
		},
	},
	plugins: [],
}
