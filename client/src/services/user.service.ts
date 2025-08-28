import { axiosWithAuth } from '@/api/interceptors'

import { IUser } from '@/types/user.types'

import { API_URL } from '@/libs/constants/api.constants'
import { TypeUpdateUserSchema } from '@/schemas/user/update-user.scema'

class UserService {
	async getAll(searchTerm?: string) {
		const { data } = await axiosWithAuth.get<IUser[]>(API_URL.users(''), {
			params: searchTerm
				? {
						searchTerm
					}
				: {}
		})

		return data
	}

	async getProfile() {
		const response = await axiosWithAuth.get<IUser>(API_URL.users('/profile'))
		return response
	}

	async getProfileMiddleware(refreshToken: string) {
		const { data: profile } = await axiosWithAuth.get<IUser>(
			API_URL.users('/profile'),
			{
				headers: {
					Authorization: `Bearer ${refreshToken}`
				}
			}
		)

		return profile
	}

	async getById(id: string) {
		return axiosWithAuth.get<IUser>(API_URL.users(`/by-id/${id}`))
	}

	async update(data: TypeUpdateUserSchema) {
		return axiosWithAuth.put<string>(API_URL.users(''), data)
	}

	async delete() {
		return axiosWithAuth.delete<string>(API_URL.users(''))
	}
}

export const userService = new UserService()
