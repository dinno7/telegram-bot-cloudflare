import { BotError, GrammyError, HttpError } from 'grammy';

export default async function handleTelegramBotErrors(err: BotError) {
	let error = err.error;
	const ctx = err?.ctx;
	console.error(`Error while handling update ${ctx.update.update_id}:`);
	if (error instanceof GrammyError) {
		console.error('Error in request:');
		error = error.description;
	} else if (error instanceof HttpError) {
		console.error('Could not contact Telegram:');
	} else {
		console.error('Unknown error:');
	}

	await ctx?.reply?.('Sorry there is some problem, please try again');
	await ctx?.api?.sendMessage?.(process.env.ADMIN_ID, 'There is some error > ' + err?.message + '');

	return error;
}
