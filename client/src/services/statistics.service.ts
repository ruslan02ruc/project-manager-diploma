import { axiosWithAuth } from '@/api/interceptors'

import { API_URL } from '@/libs/constants/api.constants'
import { IStatistics } from '@/types/statistics'

class StatisticsService {
	async getProjectStatistics() {
		return axiosWithAuth.get<IStatistics>(API_URL.statistics(`/user`))
	}
}

export const statisticsService = new StatisticsService()
