import { Metadata } from 'next'

import Project from '@/components/features/task/Project'

import { NO_INDEX_PAGE } from '@/libs/constants/seo.constants'

export const metadata: Metadata = {
	title: 'Проект',
	...NO_INDEX_PAGE
}

export default async function ProjectPage({
	params
}: {
	params: Promise<{ id: string }>
}) {
	const { id } = await params
	return <Project projectId={id} />
}
