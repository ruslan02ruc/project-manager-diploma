import { Metadata } from 'next'

import ClientProject from '@/components/features/projects/ClientProjects'

import { NO_INDEX_PAGE } from '@/libs/constants/seo.constants'

export const metadata: Metadata = {
	title: 'Проекты',
	...NO_INDEX_PAGE
}

export default function ProjectsPage() {
	return <ClientProject />
}
