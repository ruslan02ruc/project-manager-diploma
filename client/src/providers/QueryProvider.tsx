'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PropsWithChildren, useState } from 'react'

export const QueryProvider = ({ children }: PropsWithChildren<unknown>) => {
	const [client] = useState(
		new QueryClient({
			defaultOptions: {
				queries: {
					refetchOnWindowFocus: false
				}
			}
		})
	)
	return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}
