import { AutocompleteInteraction, CommandInteraction, SlashCommandBuilder } from "discord.js";
import { CommandProps } from "../typings";
export default class Command implements CommandProps {
    data: SlashCommandBuilder;
    run: (interaction: CommandInteraction) => void;
    autocomplete?: (interaction: AutocompleteInteraction) => void;
    constructor(props: CommandProps);
}
