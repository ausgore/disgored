import { AnySelectMenuInteraction, AutocompleteInteraction, ButtonInteraction, ChatInputCommandInteraction, ModalSubmitInteraction } from "discord.js";
import { CommandProps } from "../typings";
export default class Command implements CommandProps {
    data: any;
    run: (interaction: ChatInputCommandInteraction) => void;
    autocomplete?: (interaction: AutocompleteInteraction) => void;
    button?: (interaction: ButtonInteraction) => void;
    modal?: (interaction: ModalSubmitInteraction) => void;
    select?: (interaction: AnySelectMenuInteraction) => void;
    constructor(props: CommandProps);
}
