import { AutocompleteInteraction, ChatInputCommandInteraction, ClientEvents, SlashCommandBuilder } from "discord.js";
import Client from "./classes/client";
import Command from "./classes/command";

export interface ClientProps {
	commands: Map<string, Command>;
}

export interface CommandProps {
	data: SlashCommandBuilder,
	run: (interaction: ChatInputCommandInteraction) => void;
	autocomplete?: (interaction: AutocompleteInteraction) => void;
}

export interface EventProps<T extends keyof ClientEvents> {
	event: T;
	on: (client: Client, ...args: (ClientEvents)[T]) => void;
}