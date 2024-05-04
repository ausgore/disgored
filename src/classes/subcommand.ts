import { ChatInputCommandInteraction, Collection } from "discord.js";
import { SubcommandProps } from "../typings";
import { promises as fs } from "fs";
import path from "path";

export default class Subcommand implements SubcommandProps {
	name: string;
	group?: string;
	run: (interaction: ChatInputCommandInteraction) => void;
	constructor(props: SubcommandProps) {
		this.name = props.name;
		this.group = props.group;
		this.run = props.run;
	}
}

const loadSubcommands = async function(dir: string, collection: Collection<string, Subcommand>) {
	const files = await fs.readdir(dir);
	for (const file of files) {
		const filePath = path.join(dir, file);
		const stats = await fs.stat(filePath);
		if (stats.isDirectory()) loadSubcommands(dir, collection);
		else {
			const module = await import(filePath);
			if (module.default) collection.set(module.default.name, module.default);
			else for (const name in module) collection.set(`${name}-${module[name].group}`, module[name]);
		}
	}
}

export {
	loadSubcommands
}