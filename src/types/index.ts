export interface Env {
	BOT_TOKEN: string;
	SECRET_TOKEN: string;
}

declare global {
	namespace NodeJS {
		interface ProcessEnv extends Env {
			[key: string]: string | undefined;
		}
	}
}
