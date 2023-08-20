import http from 'http'
import { host, port } from './config'
import { loginListener } from './login'

const server = http.createServer(async (req, res) => {
    console.log('responding')
    if (req.url === '/login') {
        console.log('login')
        loginListener(req, res)
    }
})
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
})
