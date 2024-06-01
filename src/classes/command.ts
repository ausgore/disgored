import { AutocompleteInteraction, ButtonInteraction, ChatInputCommandInteraction, ModalSubmitInteraction } from "discord.js";
import { CommandProps } from "../typings";

export default class Command implements CommandProps {
	public data: any;
	public run: (interaction: ChatInputCommandInteraction) => void;
	public autocomplete?: (interaction: AutocompleteInteraction) => void;
	public button?: (interaction: ButtonInteraction) => void;
	public modal?: (interaction: ModalSubmitInteraction) => void;
	constructor(props: CommandProps) {
		for (const prop in props) this[prop] = props[prop] ?? null;
	}
}