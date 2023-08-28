const fetch = require('node-fetch')

// fetch('http://localhost:8080/login', {
// 	method: 'POST',
// 	body: JSON.stringify({
// 		username: 'admin',
// 		password: 'admin0',
// 		isRegister: false
// 	}),
// 	headers: {
// 		'Content-type': 'application/json'
// 	}
// })
// 	.then((res) => res.json())
// 	.then((json) => console.log(json))

fetch('http://localhost:8080/leaderboard', {
	method: 'POST',
	body: JSON.stringify({
		mode: 'add',
		username: 'best',
		score: 21,
		difficulty: 'intermediate'
	}),
	headers: {
		'Content-type': 'application/json'
	}
})
	.then((res) => res.json())
	.then((json) => console.log(json))