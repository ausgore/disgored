import { AnySelectMenuInteraction, AutocompleteInteraction, ButtonInteraction, ChatInputCommandInteraction, ClientEvents, Collection, ModalSubmitInteraction, SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder } from "discord.js";
import Client from "./classes/client";
import Command from "./classes/command";
import Subcommand from "./classes/subcommand";

export interface ClientProps {
	commands: Collection<string, Command>;
	subcommands: Collection<string, Subcommand>;
}

export interface InitOptionsProps {
	directories?: {
		commands?: string;
		events?: string;
	}
}

export interface ExtendedClient {
	client: Client<true>;
}

export interface CommandProps {
	data: any,
	run: (interaction: ChatInputCommandInteraction & ExtendedClient) => void;
	autocomplete?: (interaction: AutocompleteInteraction & ExtendedClient) => void;
	button?: (interaction: ButtonInteraction & ExtendedClient) => void;
	modal?: (interaction: ModalSubmitInteraction & ExtendedClient) => void;
	select?: (interaction: AnySelectMenuInteraction & ExtendedClient) => void;
}

export interface SubcommandProps {
	command: string;
	subcommand: string;
	group?: string;
	run: (interaction: ChatInputCommandInteraction & ExtendedClient) => void;
	autocomplete?: (interaction: AutocompleteInteraction & ExtendedClient) => void;
	button?: (interaction: ButtonInteraction & ExtendedClient) => void;
	modal?: (interaction: ModalSubmitInteraction & ExtendedClient) => void;
	select?: (interaction: AnySelectMenuInteraction & ExtendedClient) => void;
}

export interface EventProps<T extends string | keyof ClientEvents> {
	event: T;
	on: (client: Client, ...args: T extends keyof ClientEvents ? (ClientEvents)[T] : any[]) => void;
}