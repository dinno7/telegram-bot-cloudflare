import { Context } from 'hono';
import { html, raw } from 'hono/html';

export const webHookPage = async (ctx: Context) => {
	const origin = new URL(ctx.req.url).origin;
	const originalBotToken = process.env.BOT_TOKEN;

	return ctx.html(html` <html lang="en">
		<head>
			<meta charset="UTF-8" />
			<meta
				name="viewport"
				content="width=device-width, initial-scale=1.0" />
			<title>Webhook management</title>
		</head>
		<body>
			<h1>Manage your Telegram Bot WebHook</h1>
					<p>Set or Delete your bot webhook without VPN connection :]</p>
					<hr />
					<label for="botToken"> Enter your bot token </lable>
					<input
						id="botToken"
						type="text" />
					<br />
					<br />
					<button id="btnSetWebhook">Set webhook</button>
					<button id="btnDeleteWebhook">Delete webhook</button>

					<br />
					<br />
					<a href="${raw(origin)}">Back</a>

					<script>
						const botTokenInput = document.getElementById('botToken');
						const btnSetWebhook = document.getElementById('btnSetWebhook');
						const btnDeleteWebhook = document.getElementById('btnDeleteWebhook');

						btnSetWebhook.addEventListener('click', (e) => {
							const url = getWebhookUrl('set');
							url && window.open(url, '_blank');
						});

							btnDeleteWebhook.addEventListener('click', (e) => {
							const url = getWebhookUrl('del');
							url && window.open(url, '_blank');
						});

						function getWebhookUrl(type = ''){
							if(!['set','del'].includes(type)) return ''
							const token = botTokenInput.value;

							if (!token || !/[0-9]+:[a-zA-Z0-9]+/.test(token) || '${originalBotToken}' !== token)
								return alert(
									'Please provide valid bot token, Your bot token must be equal to token which set in server',
								);
							return '${raw(origin)}/webhook/' + type + '/' + token;
							
						}
					</script>
		</body>
	</html>`);
};

export const deleteWebhookController = async (ctx: Context) => {
	const botToken = ctx.req.param('botToken');
	if (botToken !== process.env.BOT_TOKEN) {
		return ctx.json({
			ok: false,
			msg: 'Bot token is not valid',
		});
	}

	const webhookUrl = `https://api.telegram.org/bot${botToken}/deleteWebhook`;

	const deleteWebhookResponse = await fetch(new Request(webhookUrl));
	return ctx.json(await deleteWebhookResponse.json());
};

export const setWebhookController = async (ctx: Context) => {
	const botToken = ctx.req.param('botToken');
	if (botToken !== process.env.BOT_TOKEN) {
		return ctx.json({
			ok: false,
			msg: 'Bot token is not valid',
		});
	}

	const { origin } = new URL(ctx.req.url);
	const secretToken = process.env.SECRET_TOKEN;
	const webhookUrl = `https://api.telegram.org/bot${botToken}/setWebhook?url=${origin}&secret_token=${secretToken}`;

	const setWebhookResponse = await fetch(new Request(webhookUrl));
	return ctx.json(await setWebhookResponse.json());
};
