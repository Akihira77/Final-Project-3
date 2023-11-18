export {};

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			PORT: string;
			JWT_SECRET: string;
			DB_POSTGRES: string;
			NODE_ENV: string;
		}
	}
}
