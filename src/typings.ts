import { AutocompleteInteraction, ButtonInteraction, ChatInputCommandInteraction, ClientEvents, Collection, SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder } from "discord.js";
import Client from "./classes/client";
import Command from "./classes/command";
import Subcommand from "./classes/subcommand";

export interface ClientProps {
	commands: Collection<string, Command>;
	subcommands: Collection<string, Subcommand>;
}

export interface CommandProps {
	data: any,
	run: (interaction: ChatInputCommandInteraction) => void;
	autocomplete?: (interaction: AutocompleteInteraction) => void;
	button?: (interaction: ButtonInteraction) => void;
}

export interface SubcommandProps {
	command: string;
	subcommand: string;
	subcommandGroup?: string;
	run: (interaction: ChatInputCommandInteraction) => void;
}

export interface EventProps<T extends keyof ClientEvents> {
	event: T;
	on: (client: Client, ...args: (ClientEvents)[T]) => void;
}