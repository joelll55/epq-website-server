"use strict";
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
const http_1 = __importDefault(require("http"));
const config_1 = require("./config");
const login_1 = require("./login");
const leaderboard_1 = require("./leaderboard");
const server = http_1.default.createServer((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('responding');
    if (req.url === '/login') {
        console.log('login');
        (0, login_1.loginListener)(req, res);
    }
    else if (req.url === '/leaderboard') {
        console.log('leaderboard');
        (0, leaderboard_1.leaderboardListener)(req, res);
    }
}));
server.listen(config_1.port, config_1.host, () => {
    console.log(`Server is running on http://${config_1.host}:${config_1.port}`);
});
