import { ChatInputCommandInteraction, Collection } from "discord.js";
import { SubcommandProps } from "../typings";
export default class Subcommand implements SubcommandProps {
    name: string;
    group?: string;
    run: (interaction: ChatInputCommandInteraction) => void;
    constructor(props: SubcommandProps);
}
declare const loadSubcommands: (dir: string, collection: Collection<string, Subcommand>) => Promise<void>;
export { loadSubcommands };
