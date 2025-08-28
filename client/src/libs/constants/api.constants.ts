export const SERVER_URL = `${process.env.SERVER_URL}/api` as string

export const API_URL = {
	root: (url = '') => `${url ? url : ''}`,

	auth: (url = '') => API_URL.root(`/auth${url}`),
	users: (url = '') => API_URL.root(`/users${url}`),
	projects: (url = '') => API_URL.root(`/projects${url}`),
	assistant: (url = '') => API_URL.root(`/project-members${url}`), // FIXME: изменить url
	files: (url = '') => API_URL.root(`/files${url}`),
	tasks: (url = '') => API_URL.root(`/tasks${url}`),
	comments: (url = '') => API_URL.root(`/comments${url}`),
	chat: (url = '') => API_URL.root(`/chats${url}`),
	statistics: (url = '') => API_URL.root(`/statistics${url}`)
}
