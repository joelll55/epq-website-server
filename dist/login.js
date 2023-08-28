"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginListener = void 0;
const fs_1 = __importDefault(require("fs"));
function loginListener(req, res) {
    if (req.method === 'POST') {
        // Get the body of the request
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
            console.log('body', body);
        });
        // When request is finished, parse the body and check the login details against storage
        req.on('end', () => {
            const { username, password, isRegister, bypass } = JSON.parse(body);
            const storage = JSON.parse(fs_1.default.readFileSync('./login.json', 'utf-8'));
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Access-Control-Allow-Origin', '*');
            if (isRegister) {
                // Create account
                if (storage.find((user) => user.username === username)) {
                    // Username already exists
                    res.statusCode = 409;
                    res.end(JSON.stringify({ message: 'Username already exists' }));
                }
                else {
                    storage.push({ username, password, userData: {} });
                    fs_1.default.writeFileSync('./login.json', JSON.stringify(storage));
                    res.statusCode = 200;
                    res.end(JSON.stringify({ message: 'Login successful' }));
                }
            }
            else {
                // Login to account
                const user = storage.find((user) => user.username === username);
                if (user && (user.password === password) || bypass) {
                    // Login details are correct
                    res.statusCode = 200;
                    res.end(JSON.stringify({ message: 'Login successful' }));
                }
                else {
                    // Login details are incorrect
                    res.statusCode = 401;
                    res.end(JSON.stringify({ message: 'Login failed' }));
                }
            }
        });
    }
}
exports.loginListener = loginListener;
