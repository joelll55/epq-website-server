const fetch = require('node-fetch')

fetch('http://localhost:8000/login', {
	method: 'POST',
	body: JSON.stringify({
		username: 'admin',
		password: 'admin0',
		isRegister: false
	}),
	headers: {
		'Content-type': 'application/json'
	}
})
	.then((res) => res.json())
	.then((json) => console.log(json))
