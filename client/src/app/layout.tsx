import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import type { Metadata } from 'next'

import { SITE_DESCRIPTION, SITE_NAME } from '@/libs/constants/seo.constants'
import { APP_URL } from '@/libs/constants/url.constants'
import { cn } from '@/libs/utils'
import { QueryProvider } from '@/providers/QueryProvider'
import { ThemeProvider } from '@/providers/ThemeProvider'
import { ToastProvider } from '@/providers/ToastProvider'
import '@/styles/globals.css'

export const metadata: Metadata = {
	title: {
		absolute: SITE_NAME,
		template: `%s | ${SITE_NAME}`
	},
	description: SITE_DESCRIPTION,
	metadataBase: new URL(APP_URL),
	applicationName: SITE_NAME,
	authors: [
		{
			name: 'Ruslan02ruc',
			url: new URL('https://github.com/ruslan02ruc')
		}
	],
	generator: 'Next.js',
	creator: 'Ruslan',
	publisher: 'Ruslan02ruc',
	icons: {
		icon: '/favicon.ico',
		shortcut: '/favicon.ico',
		apple: '/touch-icons/256x256.png',
		other: {
			rel: 'touch-icons',
			url: '/touch-icons/256x256.png',
			sizes: '256x256',
			type: 'image/png'
		}
	},
	openGraph: {
		title: SITE_NAME,
		description: SITE_DESCRIPTION,
		type: 'website',
		emails: ['ruslan02ruc@gmail.com'],
		locale: 'ru_RU',
		images: [
			{
				url: '/touch-icons/512x512.png',
				width: 512,
				height: 512,
				alt: SITE_NAME
			}
		],
		url: new URL(APP_URL)
	}
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html
			lang='ru'
			className={cn([GeistSans.variable, GeistMono.variable])}
			suppressHydrationWarning
		>
			<body>
				<ThemeProvider
					attribute='class'
					defaultTheme='system'
					enableSystem
					disableTransitionOnChange
				>
					<ToastProvider />
					<QueryProvider>{children}</QueryProvider>
				</ThemeProvider>
			</body>
		</html>
	)
}
