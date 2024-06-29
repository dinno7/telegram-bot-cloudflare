import { Bot } from 'grammy';
import { UserFromGetMe } from 'grammy/types';
import { injectBotInstructions } from './instructions';
let botInfo: UserFromGetMe | undefined = undefined;

// ! Do not change below function❌
export default async function getBot(token: string) {
	const bot = new Bot(token, { botInfo });

	if (botInfo === undefined) {
		await bot.init();
		botInfo = bot.botInfo;
	}

	await injectBotInstructions(bot);

	return bot;
}
