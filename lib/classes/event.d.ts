import { ClientEvents } from "discord.js";
import { EventProps } from "../typings";
import Client from "./client";
export default class Event<T extends keyof ClientEvents> implements EventProps<T> {
    event: T;
    on: (client: Client, ...args: (ClientEvents)[T]) => void;
    constructor(props: EventProps<T>);
}
