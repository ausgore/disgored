import { CommandProps } from "../typings";
export default class Command implements CommandProps {
    data: any;
    run: (interaction: any) => void;
    autocomplete?: (interaction: any) => void;
    button?: (interaction: any) => void;
    modal?: (interaction: any) => void;
    select?: (interaction: any) => void;
    constructor(props: CommandProps);
}
