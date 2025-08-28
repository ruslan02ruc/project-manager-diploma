'use client'

import { useProjects } from '@/hooks/project/useProjects'

import Projects from './Projects'

export default function ClientProject() {
	const params = {
		isArchive: false
	}
	const { data } = useProjects(params)

	return <Projects data={data || []} />
}
