import { AutocompleteInteraction, ButtonInteraction, ChatInputCommandInteraction } from "discord.js";
import { CommandProps } from "../typings";
export default class Command implements CommandProps {
    data: any;
    run: (interaction: ChatInputCommandInteraction) => void;
    autocomplete?: (interaction: AutocompleteInteraction) => void;
    button?: (interaction: ButtonInteraction) => void;
    constructor(props: CommandProps);
}
