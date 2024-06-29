import { Bot } from 'grammy';

// ? For more detail, read grammy document >> https://grammy.dev/
// > Add your telegram bot instructions just in this <injectBotInstructions> function👇
export async function injectBotInstructions(bot: Bot): Promise<void> {
	// ! You can use proces.env just inside this function
	bot.command('start', async (c) => {
		return c.reply('Hello ' + c.from?.first_name, {
			parse_mode: 'MarkdownV2',
			protect_content: true,
			reply_parameters: { message_id: c.message?.message_id || 0 },
		});
	});
}
