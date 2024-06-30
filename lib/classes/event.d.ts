import { ClientEvents } from "discord.js";
import { EventProps } from "../typings";
export default class Event<T extends string | keyof ClientEvents = keyof ClientEvents> implements EventProps<T> {
    event: T;
    on: (client: any, ...args: any[]) => void;
    constructor(props: EventProps<T>);
}
