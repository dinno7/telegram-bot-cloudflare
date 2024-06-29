import { BotError, webhookCallback } from 'grammy';
import fetchHanoApp from './api';
import getBot from './bot/';
import handleTelegramBotErrors from './bot/handle-errors';
import { Env } from './types';

export default {
	async fetch(...args: [Request, Env, ExecutionContext]) {
		try {
			const [req, env, _ctx] = args;
			process.env = { ...process.env, ...env };

			// > Check if request is related to telegram bot and handle it
			if (req.headers.get('x-telegram-bot-api-secret-token') === env.SECRET_TOKEN) {
				const bot = await getBot(env.BOT_TOKEN);
				const cb = webhookCallback(bot, 'cloudflare-mod', { secretToken: env.SECRET_TOKEN });
				return await cb(...args);
			}

			// > Or handle routes with Hano js :)
			return fetchHanoApp(...args);
		} catch (err) {
			let error = err;
			if (err instanceof BotError) {
				error = await handleTelegramBotErrors(err);
			}
			console.error('⭕️ ~ ERROR  ~ in src/index.ts ~> ❗', error);
			return new Response('There is some error');
		}
	},

	// async scheduled(controller: ScheduledController, env: Env, ctx: ExecutionContext): Promise<void> {
	// 	//Add this to wrangler.toml
	// 	// [triggers]
	// 	// crons = [ "1 * * * *" ]
	// 	const bot = getBot(env.BOT_TOKEN);
	// 	injectCrobJobsInstructions(bot, controller);
	// },
};
