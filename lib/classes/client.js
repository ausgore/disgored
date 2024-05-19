"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const command_1 = __importDefault(require("./command"));
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const event_1 = __importDefault(require("./event"));
class Client extends discord_js_1.Client {
    constructor(options) {
        super(options);
        this.commands = new discord_js_1.Collection();
    }
    init(token) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.register(`${path_1.default.dirname(require.main.filename)}/commands`);
            yield this.register(`${path_1.default.dirname(require.main.filename)}/events`);
            this.once("ready", (client) => __awaiter(this, void 0, void 0, function* () {
                if (this.commands.size)
                    yield this.loadSlashCommands();
                console.log(`Successfully logged in as \u001b[32m${client.user.tag}\u001b[0m!`);
            }));
            this.login(token);
        });
    }
    register(dir) {
        return __awaiter(this, void 0, void 0, function* () {
            const files = yield fs_1.promises.readdir(dir).catch(() => null);
            if (!(files === null || files === void 0 ? void 0 : files.length))
                return console.log(`\x1b[31m - ${dir.split("/")[1].slice(0, 1).toUpperCase() + dir.split("/")[1].slice(1, -1)} folder cannot be found\x1b[37m`);
            const processFile = (file) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                const filePath = path_1.default.join(dir, file);
                const stats = yield fs_1.promises.lstat(filePath);
                if (stats.isDirectory())
                    yield this.register(filePath);
                else if ([".ts", ".js"].includes(file.slice(-3))) {
                    const module = yield Promise.resolve().then(() => __importStar(require(filePath)));
                    const data = (_a = module.default) !== null && _a !== void 0 ? _a : module;
                    if (data instanceof command_1.default)
                        this.commands.set(data.data.name, data);
                    else if (data instanceof event_1.default)
                        this.on(data.event, data.on.bind(null, this));
                }
            });
            yield Promise.all(files.map(file => processFile(file)));
        });
    }
    loadSlashCommands() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(" - Clearing existing \u001b[34;1mapplication (/) commands\u001b[0m");
            const rest = new discord_js_1.REST().setToken(this.token);
            const commands = this.commands.map(c => c.data);
            yield rest.put(discord_js_1.Routes.applicationCommands(this.user.id), { body: commands });
            console.log(" - Successfully reloaded \u001b[34;1mapplication (/) commands\u001b[0m");
        });
    }
}
exports.default = Client;
//# sourceMappingURL=client.js.map