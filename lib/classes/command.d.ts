import { AutocompleteInteraction, ChatInputCommandInteraction } from "discord.js";
import { CommandProps } from "../typings";
export default class Command implements CommandProps {
    data: any;
    run: (interaction: ChatInputCommandInteraction) => void;
    autocomplete?: (interaction: AutocompleteInteraction) => void;
    constructor(props: CommandProps);
}
