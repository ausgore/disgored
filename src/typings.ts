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

export interface CommandProps {
	data: any,
	run: (interaction: ChatInputCommandInteraction) => void;
	autocomplete?: (interaction: AutocompleteInteraction) => void;
	button?: (interaction: ButtonInteraction) => void;
	modal?: (interaction: ModalSubmitInteraction) => void;
	select?: (interaction: AnySelectMenuInteraction) => void;
}

export interface SubcommandProps {
	command: string;
	subcommand: string;
	group?: string;
	run: (interaction: ChatInputCommandInteraction) => void;
	autocomplete?: (interaction: AutocompleteInteraction) => void;
	button?: (interaction: ButtonInteraction) => void;
	modal?: (interaction: ModalSubmitInteraction) => void;
	select?: (interaction: AnySelectMenuInteraction) => void;
}

export interface EventProps<T extends string | keyof ClientEvents> {
	event: T;
	on: (client: Client, ...args: T extends keyof ClientEvents ? (ClientEvents)[T] : any[]) => void;
}