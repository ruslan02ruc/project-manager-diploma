'use client'

import { useStrangerProjects } from '@/hooks/project/useStrangerProjects'

import Projects from './Projects'

export default function ClientStrangerProjects() {
	const params = {
		isArchive: false
	}
	const { data } = useStrangerProjects(params)

	return <Projects data={data || []} />
}
