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
exports.getSubcommand = exports.loadSubcommands = void 0;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
class Subcommand {
    constructor(props) {
        this.name = props.name;
        this.group = props.group;
        this.run = props.run;
    }
}
exports.default = Subcommand;
const loadSubcommands = function (dir, collection) {
    return __awaiter(this, void 0, void 0, function* () {
        const files = yield fs_1.promises.readdir(dir);
        for (const file of files) {
            const filePath = path_1.default.join(dir, file);
            const stats = yield fs_1.promises.stat(filePath);
            if (stats.isDirectory())
                loadSubcommands(dir, collection);
            else {
                const module = yield Promise.resolve().then(() => __importStar(require(filePath)));
                if (module.default)
                    collection.set(module.default.name, module.default);
                else
                    for (const name in module)
                        collection.set(`${module[name].name}-${module[name].group}`, module[name]);
            }
        }
    });
};
exports.loadSubcommands = loadSubcommands;
const getSubcommand = function (subcommands, subcommand, subcommandGroup) {
    return subcommands.get(subcommandGroup ? `${subcommand}-${subcommandGroup}` : subcommand);
};
exports.getSubcommand = getSubcommand;
//# sourceMappingURL=subcommand.js.map