import { AutocompleteInteraction, Client, ClientEvents, CommandInteraction, SlashCommandBuilder } from "discord.js";
import Command from "./classes/command";
export interface ClientProps {
    commands: Map<string, Command>;
}
export interface CommandProps {
    data: SlashCommandBuilder;
    run: (interaction: CommandInteraction) => void;
    autocomplete?: (interaction: AutocompleteInteraction) => void;
}
export interface EventProps<T extends keyof ClientEvents> {
    event: T;
    on: (client: Client, ...args: (ClientEvents)[T]) => void;
}
