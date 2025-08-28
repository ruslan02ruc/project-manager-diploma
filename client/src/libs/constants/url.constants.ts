export const APP_URL = process.env.APP_URL as string

export const PUBLIC_URL = {
	root: (url = '') => `${url ? url : ''}`,

	home: () => PUBLIC_URL.root('/'),
	auth: () => PUBLIC_URL.root('/auth')
}

export const ADMIN_URL = {
	root: (url = '') => `/admin${url ? '/' + url : ''}`,

	profile: () => ADMIN_URL.root('profile'),

	statistics: () => ADMIN_URL.root('statistics'),

	users: () => ADMIN_URL.root('users'),
	userEdit: (id = '') => ADMIN_URL.root(`users/${id}`),

	projects: () => ADMIN_URL.root(`projects`),
	project: (id = '') => ADMIN_URL.root(`projects/${id}`),

	strangerProjects: () => ADMIN_URL.root(`stranger-projects`),
	strangerProject: (id = '') => ADMIN_URL.root(`stranger-projects/${id}`),

	tasks: () => ADMIN_URL.root(`tasks`),
	taskEdit: (id = '') => ADMIN_URL.root(`tasks/${id}`),

	assistants: () => ADMIN_URL.root(`project-members`), // FIXME: изменить url
	assistantsEdit: (id = '') => ADMIN_URL.root(`project-members/${id}`),

	comments: () => ADMIN_URL.root(`comments`),
	commentEdit: (id = '') => ADMIN_URL.root(`comments/${id}`),

	chats: () => ADMIN_URL.root(`chat`),
	chatEdit: (id = '') => ADMIN_URL.root(`chat/${id}`),

	archive: () => ADMIN_URL.root(`archive`),
}
