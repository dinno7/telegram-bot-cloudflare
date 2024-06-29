import { Hono } from 'hono';
import { Env } from '../types';
import botWebhookRoutes from './routes/bot-webhooks.route';

import { homePage } from './controllers/home.controller';

// ? For more detail, read Hono document >> https://hono.dev/
export default function fetchHanoApp(...args: [Request, Env, ExecutionContext]) {
	const app = new Hono();

	// > Set routes
	app.route('/webhook', botWebhookRoutes);

	app.get('/', homePage);

	app.all('*', async ({ req, ...ctx }) => {
		return ctx.json({
			ok: false,
			msg: 'This route not implemented',
			route: req.path,
		});
	});

	return app.fetch(...args);
}
