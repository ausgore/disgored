import { AutocompleteInteraction, CommandInteraction, SlashCommandBuilder } from "discord.js";
import { CommandProps } from "../typings";

export default class Command implements CommandProps {
	public data: SlashCommandBuilder;
	public run: (interaction: CommandInteraction) => void;
	public autocomplete?: (interaction: AutocompleteInteraction) => void;
	constructor(props: CommandProps) {
		for (const prop in props) this[prop] = props[prop] ?? null;
	}
}