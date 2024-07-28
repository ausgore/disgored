import { CommandProps } from "../typings";

export default class Command implements CommandProps {
	public data: any;
	public run: (interaction) => void;
	public autocomplete?: (interaction) => void;
	public button?: (interaction) => void;
	public modal?: (interaction) => void;
	public select?: (interaction) => void;
	constructor(props: CommandProps) {
		for (const prop in props) this[prop] = props[prop] ?? null;
	}
}