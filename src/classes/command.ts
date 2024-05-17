import { AutocompleteInteraction, ChatInputCommandInteraction, SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder } from "discord.js";
import { CommandProps } from "../typings";

export default class Command implements CommandProps {
	public data: SlashCommandBuilder | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup"> | SlashCommandSubcommandsOnlyBuilder;
	public run: (interaction: ChatInputCommandInteraction) => void;
	public autocomplete?: (interaction: AutocompleteInteraction) => void;
	constructor(props: CommandProps) {
		for (const prop in props) this[prop] = props[prop] ?? null;
	}
}