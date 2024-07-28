import { SubcommandProps } from "../typings";

export default class Subcommand implements SubcommandProps {
	command: string;
	subcommand: string;
	group?: string;
	run: (interaction) => void;
	autocomplete?: (interaction) => void;
	button?: (interaction) => void;
	modal?: (interaction) => void;
	select?: (interaction) => void;
	constructor(props: SubcommandProps) {
		for (const prop in props) this[prop] = props[prop] ?? null;
	}
}