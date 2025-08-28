import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import axios from 'axios'

import { PrismaService } from '../prisma.service'

@Injectable()
export class WebhookService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly httpService: HttpService
	) {}

	async saveCommits(commits: any[], repository: string) {
		// return this.prisma.commit.createMany({
		// 	data: commits.map(commit => ({
		// 		sha: commit.id,
		// 		message: commit.message,
		// 		timestamp: new Date(commit.timestamp),
		// 		authorName: commit.author.name,
		// 		authorEmail: commit.author.email,
		// 		url: commit.url,
		// 		repository
		// 	})),
		// 	skipDuplicates: true // чтобы не дублировать коммиты
		// })
	}

	async updateGitHubProject(issueId: string, newStatusId: string) {
		const GITHUB_TOKEN = process.env.GITHUB_TOKEN
		const PROJECT_ID = process.env.PROJECT_ID

		const query = `
      mutation {
        updateProjectV2ItemFieldValue(input: {
          projectId: "${PROJECT_ID}",
          itemId: "${issueId}",
          fieldId: "STATUS_FIELD_ID",
          value: { singleSelectOptionId: "${newStatusId}" }
        }) {
          projectV2Item { id }
        }
      }
    `

		await axios.post(
			'https://api.github.com/graphql',
			{ query },
			{ headers: { Authorization: `Bearer ${GITHUB_TOKEN}` } }
		)
	}

	async sendWebhook(url: string, payload: any): Promise<void> {
		try {
			console.log(url);
			
			await this.httpService.post(url, payload).toPromise()
			console.log('Вебхук успешно отправлен')
		} catch (error) {
			console.error('Ошибка при отправке вебхука:', error)
		}
	}
}
