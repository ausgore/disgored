import { AnySelectMenuInteraction, AutocompleteInteraction, ButtonInteraction, ChatInputCommandInteraction, ModalSubmitInteraction } from "discord.js";
import { SubcommandProps } from "../typings";
export default class Subcommand implements SubcommandProps {
    command: string;
    subcommand: string;
    group?: string;
    run: (interaction: ChatInputCommandInteraction) => void;
    autocomplete?: (interaction: AutocompleteInteraction) => void;
    button?: (interaction: ButtonInteraction) => void;
    modal?: (interaction: ModalSubmitInteraction) => void;
    select?: (interaction: AnySelectMenuInteraction) => void;
    constructor(props: SubcommandProps);
}
