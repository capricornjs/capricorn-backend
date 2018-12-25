const mysql = require('mysql')
const sqlConfig = require('./config')
let connection = null

// 创建连接
const creatConnect = () => {
	connection = mysql.createConnection(sqlConfig)
	connection.on('error', function (err) {
		if (!err.fatal) {
			return
		}
		if (err.code !== 'PROTOCOL_CONNECTION_LOST') {
			throw err
		}
		console.log('Re-connecting lost connection: ' + err.stack)
		connection = mysql.createConnection(sqlConfig)
		connection.connect()
	})
}

/**
 * sql查询
 * @param sql
 * @returns {Promise}
 */
const handler = (sql) => {
	return new Promise((resolve, reject) => {
		connection.query(sql, (err, data) => {
			if (err) {
				reject({ message: err.message })
			}
			resolve(data)
		})
	})
}

module.exports = {
	creatConnect,
	handler
}