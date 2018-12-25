const fs = require('fs')

/**
 * 更新文件内容
 * @param filePath
 * @param handler
 */
const updateFile = (filePath, handler) => {
	fs.readFile(filePath, { encoding: 'utf8' }, (err, data) => {
		if (err) throw err
		const writeJSONFile = (res, callback) => {
			fs.writeFile(filePath, res, 'utf8', (err) => {
				if (err) throw err
				callback()
			})
		}
		handler(data.toString(), writeJSONFile)
	})
}

module.exports = {
	updateFile
}