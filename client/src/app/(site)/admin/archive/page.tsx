import { Metadata } from 'next'

import ArchiveProject from '@/components/features/projects/ArchiveProject'

import { NO_INDEX_PAGE } from '@/libs/constants/seo.constants'

export const metadata: Metadata = {
	title: 'Архив',
	...NO_INDEX_PAGE
}

export default function ProjectsPage() {
	return <ArchiveProject />
}
