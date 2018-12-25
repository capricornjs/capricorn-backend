const router = require('koa-router')()
const mysql = require('mysql')

router.get('/aaa', async (ctx) => {
	const data = {
		success: true,
		allow_items: ['device', 'alarm', 'createaccount', 'delaccount', 'createid', 'adminaccount'],
		token: 'token112344555'
	}

	console.log('Login: ', ctx.request.body)

	ctx.body = data
})

module.exports = router
