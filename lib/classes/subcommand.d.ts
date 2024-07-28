import { SubcommandProps } from "../typings";
export default class Subcommand implements SubcommandProps {
    command: string;
    subcommand: string;
    group?: string;
    run: (interaction: any) => void;
    autocomplete?: (interaction: any) => void;
    button?: (interaction: any) => void;
    modal?: (interaction: any) => void;
    select?: (interaction: any) => void;
    constructor(props: SubcommandProps);
}
