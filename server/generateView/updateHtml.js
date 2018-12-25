const { updateFile } = require('../../core/util')

/**
 * 更新html
 * @param pageAddress
 * @param pageInfo
 * @param moduleList
 * @param handler
 */
const updateHtml = (pageAddress, pageInfo, moduleList, handler) => {
	const htmlPath = `${pageAddress}/index.html`
	updateFile(htmlPath, (htmlData, done) => {
		let htmlString = htmlData.toString()
		let scriptString = '',
			styleString = ''
		moduleList.forEach(v => {
			scriptString += `<script src="./lib/${v.name}/app.js"></script>
`
			styleString += `<link rel="stylesheet" href="./lib/${v.name}/app.css">
`
		})
		scriptString += '</body>'
		styleString += '<script src="./lib/index.js"></script>\n'
		styleString += '</head>'
		htmlString = htmlString.replace('</body>', scriptString)
		htmlString = htmlString.replace('</head>', styleString)
		htmlString = htmlString.replace('<title>capricorn</title>', `<title>${pageInfo.pageName}</title>`)
		done(htmlString, () => {
			console.log('index.html更新成功！')
			console.log('开始安装依赖')
			handler()
		})
	})
}
module.exports = updateHtml