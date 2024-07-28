import { ClientEvents } from "discord.js";
import { EventProps } from "../typings";

export default class Event<T extends string | keyof ClientEvents = keyof ClientEvents> implements EventProps<T> {
	public event: T;
	public on: (client, ...args) => void;
	constructor(props: EventProps<T>) {
		for (const prop in props) this[prop] = props[prop] ?? null;
	}
}