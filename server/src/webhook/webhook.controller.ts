import { Body, Controller, Get, Post } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { WebhookService } from './webhook.service'

@Controller('webhook')
export class WebhookController {
	constructor(
		private readonly webhookService: WebhookService,
		private readonly configService: ConfigService
	) {}

	@Get('github')
	async getGitHubWebhook() {
		return 'Webhook is working'
	}

	// @Post('github')
	// handleWebhook(
	//   @Req() req: Request,
	//   @Res() res: Response,
	//   @Headers('x-hub-signature-256') signature: string,
	// ): void {
	//   const secret = process.env.WEBHOOK_SECRET;

	//   // Проверка подписи
	//   const payload = JSON.stringify(req.body);
	//   const hmac = crypto.createHmac('sha256', secret);
	//   const digest = `sha256=${hmac.update(payload).digest('hex')}`;

	//   if (signature !== digest) {
	//     this.logger.warn('Signature mismatch');
	//     return res.status(HttpStatus.FORBIDDEN).send('Invalid signature');
	//   }

	//   this.logger.log('Webhook received');
	//   this.webhookService.processPayload(req.body);
	//   res.status(HttpStatus.OK).send('Success');
	// }

	@Post('new-message')
	async handleNewMessage(@Body() messageData: any): Promise<void> {
		const webhookUrl = 'http://localhost:3000' // URL внешнего приложения
		await this.webhookService.sendWebhook(webhookUrl, messageData)
	}
}
