const { creatConnect, handler } = require('../core/sql')
const code = require('../data/code')

creatConnect()

/**
 * 查询所有的模块列表
 * @returns {Promise.<T>}
 */
const moduleList = () => {
	const sql = 'SELECT * FROM CAP_Modules'
	return handler(sql).then((list) => {
		return {
			list,
			code: code.SUCCESS
		}
	}).catch(e => {
		console.log(e)
	})
}

/**
 * 创建模块
 * @param body
 * @returns {Promise}
 */
const addModule = (body) => {
	const { name, description, packageName, configDeclare } = body
	const sql = `INSERT INTO CAP_Modules (name, description, packageName, configDeclare) VALUES ('${name}', '${description}', '${packageName}', '${configDeclare}')`
	return handler(sql).then(() => {
		return {
			code: code.SUCCESS,
			message: '操作成功'
		}
	}).catch(e => {
		console.log(e)
	})
}

module.exports = {
	moduleList,
	addModule
}