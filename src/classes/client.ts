import { Client as DiscordClient, ClientOptions } from "discord.js";
import { ClientProps } from "../typings";
import Command from "./command";
import { promises as fs } from "fs";
import path from "path";
import Event from "./event";

export default class Client extends DiscordClient implements ClientProps {
	public commands: Map<string, Command> = new Map();
	constructor(options: ClientOptions) {
		super(options);
	}

	public async init(token: string) {
		await this.register(`${path.dirname(require.main.filename)}/commands`);
		await this.register(`${path.dirname(require.main.filename)}/events`);
		this.once("ready", async (client) => {
			console.log(`Successfully logged in as \u001b[32m${client.user.tag}\u001b[0m!`);
		});
		this.login(token);
	}

	private async register(dir: string) {
		const files = await fs.readdir(dir).catch(() => null);
		if (!files) return console.log(`\x1b[31m- ${dir.split("/")[1]} folder cannot be found.\x1b[37m`);

		await Promise.all(files.map(async (file) => {
			const filePath = path.join(dir, file);
			const stats = await fs.lstat(filePath);
			if (stats.isDirectory()) this.register(filePath);
			else if ([".ts", ".js"].includes(file.slice(-3))) {
				const module = await import(`${filePath}`);
				const data = module.default ?? module;
				if (data instanceof Command) this.commands.set(data.data.name, data);
				else if (data instanceof Event) this.on(data.event, data.on.bind(null, this));
			}
		}));
	}
}