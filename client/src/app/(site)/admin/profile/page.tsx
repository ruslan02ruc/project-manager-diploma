import { Metadata } from 'next'

import Profile from '@/components/features/profile/Profile'

import { NO_INDEX_PAGE } from '@/libs/constants/seo.constants'

export const metadata: Metadata = {
	title: 'Профиль',
	...NO_INDEX_PAGE
}

export default function ProfilePage() {
	return <Profile />
}
