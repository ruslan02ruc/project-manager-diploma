import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as Pusher from 'pusher'

@Injectable()
export class PusherService {
	private pusher: Pusher

	constructor(private configService: ConfigService) {
		this.pusher = new Pusher({
			appId: process.env.PUSHER_APP_ID,
			key: process.env.PUSHER_APP_KEY,
			secret: process.env.PUSHER_APP_SECRET,
			cluster: process.env.PUSHER_CLUSTER
		})
	}

	trigger(channel: string, event: string, data: any) {
		return this.pusher.trigger(channel, event, data)
	}
}
