"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.leaderboardListener = void 0;
const fs_1 = __importDefault(require("fs"));
function leaderboardListener(req, res) {
    if (req.method === 'POST') {
        // Get the body of the request
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
            console.log('body', body);
        });
        // When request is finished, parse the body and check the login details against storage
        req.on('end', () => {
            // Parse the body of the request
            const { username, score, difficulty, mode } = JSON.parse(body);
            // Read the leaderboard file and parse it
            const storage = JSON.parse(fs_1.default.readFileSync('./leaderboard.json', 'utf-8'));
            // Set up the response
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Access-Control-Allow-Origin', '*');
            if (mode === 'get') {
                res.statusCode = 200;
                return res.end(JSON.stringify({ leaderboard: storage, message: 'Leaderboard retrieved' }));
            }
            else if (mode === 'add') {
                if (!username || !score || !difficulty) {
                    res.statusCode = 400;
                    return res.end(JSON.stringify({ message: 'Missing required fields' }));
                }
                // Check if a score already exists for this user
                const existingScore = storage[difficulty].find((entry) => entry.username === username);
                if (existingScore) {
                    // If the existing score is higher than the new score, return an error
                    if (existingScore.score > score) {
                        res.statusCode = 200;
                        return res.end(JSON.stringify({ message: 'Existing score for user is higher' }));
                    }
                    // Otherwise, remove the existing score
                    storage[difficulty] = storage[difficulty].filter((entry) => entry.username !== username);
                }
                // Add the score to the leaderboard
                storage[difficulty].push({ username, score, rank: 0 });
                // Sort the leaderboard
                storage[difficulty].sort((a, b) => b.score - a.score);
                // Add the rank to each entry
                storage[difficulty].forEach((entry, index) => entry.rank = index + 1);
                // Write the leaderboard to the file
                fs_1.default.writeFileSync('./leaderboard.json', JSON.stringify(storage));
                // Return the updated leaderboard
                res.statusCode = 200;
                return res.end(JSON.stringify({ message: 'Score added', leaderboard: storage }));
            }
        });
    }
}
exports.leaderboardListener = leaderboardListener;
