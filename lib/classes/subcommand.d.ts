import { ChatInputCommandInteraction } from "discord.js";
import { SubcommandProps } from "../typings";
export default class Subcommand implements SubcommandProps {
    command: string;
    subcommand: string;
    subcommandGroup?: string;
    run: (interaction: ChatInputCommandInteraction) => void;
    constructor(props: SubcommandProps);
}
