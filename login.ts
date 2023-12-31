import http from 'http'
import fs from 'fs'

interface ILoginDetails {
	username: string
	password: string
	isRegister: boolean
	bypass: boolean
}

export function loginListener(req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage> & { req: http.IncomingMessage }) {
	if (req.method === 'POST') {
		// Get the body of the request
		let body = ''
		req.on('data', (chunk) => {
			body += chunk.toString()
			console.log('body', body)
		})

		// When request is finished, parse the body and check the login details against storage
		req.on('end', () => {
			const { username, password, isRegister, bypass }: ILoginDetails = JSON.parse(body)
            const storage: any[] = JSON.parse(fs.readFileSync('./login.json', 'utf-8'))
            res.setHeader('Content-Type', 'application/json')
			res.setHeader('Access-Control-Allow-Origin', '*')

			if (isRegister) {
				// Create account
                if (storage.find((user) => user.username === username)) {
                    // Username already exists
                    res.statusCode = 409
                    res.end(JSON.stringify({ message: 'Username already exists' }))
                } else {
                    storage.push({ username, password, userData: {} })
                    fs.writeFileSync('./login.json', JSON.stringify(storage))
                    res.statusCode = 200
					res.end(JSON.stringify({ message: 'Login successful' }))
                }
			} else {
				// Login to account
                const user = storage.find((user) => user.username === username)
				if (user && (user.password === password) || bypass) {
					// Login details are correct
					res.statusCode = 200
					res.end(JSON.stringify({ message: 'Login successful' }))
				} else {
					// Login details are incorrect
					res.statusCode = 401
					res.end(JSON.stringify({ message: 'Login failed' }))
				}
			}
		})
	}
}
