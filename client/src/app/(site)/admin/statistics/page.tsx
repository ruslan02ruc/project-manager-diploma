import type { Metadata } from 'next'

import Statistics from '@/components/features/projects/statistics/Statistics'

import { NO_INDEX_PAGE } from '@/libs/constants/seo.constants'

export const metadata: Metadata = {
	title: 'Статистика',
	...NO_INDEX_PAGE
}

export default function StatisticsPage() {
	return <Statistics />
}
