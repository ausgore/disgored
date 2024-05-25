import { ChatInputCommandInteraction, Collection } from "discord.js";
import { SubcommandProps } from "../typings";
import { promises as fs } from "fs";
import path from "path";

export default class Subcommand implements SubcommandProps {
	command: string;
	subcommand: string;
	subcommandGroup?: string;
	run: (interaction: ChatInputCommandInteraction) => void;
	constructor(props: SubcommandProps) {
		this.command = props.command;
		this.subcommand = props.subcommand;
		this.subcommandGroup = props.subcommandGroup;
		this.run = props.run;
	}
}