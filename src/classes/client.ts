import { Client as DiscordClient, ClientOptions, REST, Routes, Collection } from "discord.js";
import { ClientProps } from "../typings";
import Command from "./command";
import { promises as fs } from "fs";
import path from "path";
import Event from "./event";
import Subcommand from "./subcommand";

export default class Client extends DiscordClient implements ClientProps {
	public commands: Collection<string, Command> = new Collection();
	public subcommands: Collection<string, Subcommand> = new Collection();
	constructor(options: ClientOptions) {
		super(options);
	}

	public async init(token: string) {
		await this.register(`${path.dirname(require.main.filename)}/commands`);
		await this.register(`${path.dirname(require.main.filename)}/events`);
		this.once("ready", async (client) => {
			if (this.commands.size) await this.loadSlashCommands();
			console.log(`Successfully logged in as \u001b[32m${client.user.tag}\u001b[0m!`);
		});
		this.login(token);
	}

	private async register(dir: string) {
		const files = await fs.readdir(dir).catch(() => null);
		if (!files?.length) return console.log(`\x1b[31m - ${dir.split("/")[1].slice(0, 1).toUpperCase() + dir.split("/")[1].slice(1, -1)} folder cannot be found\x1b[37m`);

		const processFile = async (file) => {
			const filePath = path.join(dir, file);
			const stats = await fs.lstat(filePath);
			if (stats.isDirectory()) await this.register(filePath);
			else if ([".ts", ".js"].includes(file.slice(-3))) {
				const module = await import(filePath);
				const data = module.default ?? module;
				if (data instanceof Command) this.commands.set(data.data.name, data);
				else if (data instanceof Event) this.on(data.event, data.on.bind(null, this));
				else if (data instanceof Subcommand) this.subcommands.set(`${data.command}${data.subcommandGroup ? `-${data.subcommandGroup}` : ""}-${data.subcommand}`, data);
				else if (typeof data == "object") {
					for (const key in data) {
						if (data.hasOwnProperty(key)) {
							if (data[key] instanceof Subcommand) {
								const minidata = data[key] as Subcommand;
								this.subcommands.set(`${minidata.command}${minidata.subcommandGroup ? `-${minidata.subcommandGroup}` : ""}-${minidata.subcommand}`, minidata);
							}
						}
					}
				}
			}
		};

		await Promise.all(files.map(file => processFile(file)));
	}

	public getSubcommand(command: string, subcommand: string, subcommandGroup?: string | null) {
		return this.subcommands.get(`${command}${subcommandGroup ? `-${subcommandGroup}` : ""}-${subcommand}`);
	}

	public async loadSlashCommands() {
		console.log(" - Clearing existing \u001b[34;1mapplication (/) commands\u001b[0m");
		const rest = new REST().setToken(this.token);
		const commands = this.commands.map(c => c.data);
		await rest.put(Routes.applicationCommands(this.user.id), { body: commands });
		console.log(" - Successfully reloaded \u001b[34;1mapplication (/) commands\u001b[0m");
	}
}