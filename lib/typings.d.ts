import { AutocompleteInteraction, ChatInputCommandInteraction, ClientEvents } from "discord.js";
import Client from "./classes/client";
import Command from "./classes/command";
export interface ClientProps {
    commands: Map<string, Command>;
}
export interface CommandProps {
    data: any;
    run: (interaction: ChatInputCommandInteraction) => void;
    autocomplete?: (interaction: AutocompleteInteraction) => void;
}
export interface SubcommandProps {
    name: string;
    group?: string;
    run: (interaction: ChatInputCommandInteraction) => void;
}
export interface EventProps<T extends keyof ClientEvents> {
    event: T;
    on: (client: Client, ...args: (ClientEvents)[T]) => void;
}
