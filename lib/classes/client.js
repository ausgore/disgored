var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Client as DiscordClient, REST, Routes, Collection } from "discord.js";
import Command from "./command";
import { promises as fs } from "fs";
import path from "path";
import Event from "./event";
export default class Client extends DiscordClient {
    constructor(options) {
        super(options);
        this.commands = new Collection();
    }
    init(token) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.register(`${path.dirname(import.meta.url)}/commands`);
            yield this.register(`${path.dirname(import.meta.url)}/events`);
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
            const files = yield fs.readdir(dir).catch(() => null);
            if (!(files === null || files === void 0 ? void 0 : files.length))
                return console.log(`\x1b[31m - ${dir.split("/")[1].slice(0, 1).toUpperCase() + dir.split("/")[1].slice(1, -1)} folder cannot be found\x1b[37m`);
            yield Promise.all(files.map((file) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                const filePath = path.join(dir, file);
                const stats = yield fs.lstat(filePath);
                if (stats.isDirectory())
                    this.register(filePath);
                else if ([".ts", ".js"].includes(file.slice(-3))) {
                    const module = yield import(`${filePath}`);
                    const data = (_a = module.default) !== null && _a !== void 0 ? _a : module;
                    if (data instanceof Command)
                        this.commands.set(data.data.name, data);
                    else if (data instanceof Event)
                        this.on(data.event, data.on.bind(null, this));
                }
            })));
        });
    }
    loadSlashCommands() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(" - Clearing existing \u001b[34;1mapplication (/) commands\u001b[0m");
            const rest = new REST().setToken(this.token);
            const commands = this.commands.map(c => c.data);
            yield rest.put(Routes.applicationCommands(this.user.id), { body: commands });
            console.log(" - Successfully reloaded \u001b[34;1mapplication (/) commands\u001b[0m");
        });
    }
}
//# sourceMappingURL=client.js.map