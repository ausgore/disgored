"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSubcommand = exports.loadSubcommands = exports.Subcommand = exports.Client = exports.Event = exports.Command = void 0;
const command_1 = __importDefault(require("./classes/command"));
exports.Command = command_1.default;
const event_1 = __importDefault(require("./classes/event"));
exports.Event = event_1.default;
const client_1 = __importDefault(require("./classes/client"));
exports.Client = client_1.default;
const subcommand_1 = __importDefault(require("./classes/subcommand"));
exports.Subcommand = subcommand_1.default;
const subcommand_2 = require("./classes/subcommand");
Object.defineProperty(exports, "loadSubcommands", { enumerable: true, get: function () { return subcommand_2.loadSubcommands; } });
Object.defineProperty(exports, "getSubcommand", { enumerable: true, get: function () { return subcommand_2.getSubcommand; } });
//# sourceMappingURL=index.js.map