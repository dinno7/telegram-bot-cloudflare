import { Context } from 'hono';
import { html, raw } from 'hono/html';

export const homePage = async (ctx: Context) => {
	const origin = new URL(ctx.req.url).origin;

	return ctx.html(html` <html lang="en">
		<head>
			<meta charset="UTF-8" />
			<meta
				name="viewport"
				content="width=device-width, initial-scale=1.0" />
			<title>Home</title>
		</head>
		<body>
			<h1>Manage your Telegram Bot WebHook</h1>

			<hr />
			<a href="${raw(origin)}/webhook">WebHook management</a>
		</body>
	</html>`);
};
