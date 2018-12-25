const { updateFile } = require('../../core/util')

/**
 * 更新package.json
 * @param pageAddress
 * @param pageInfo
 * @param packageList
 * @param handler
 */
const updatePackage = (pageAddress, pageInfo, packageList, handler) => {
	const packagePath = `${pageAddress}/package.json`
	updateFile(packagePath, (res, done) => {
		let packageData = JSON.parse(res)
		const { description } = pageInfo
		packageData.name = pageInfo.pageName
		packageData.description = description
		packageList.forEach(v => {
			packageData.dependencies[`@capricorn/${v.moduleName}`] = 'latest'
		})
		done(JSON.stringify(packageData, null, 4), () => {
			console.log('package.json更新成功！')
			handler()
		})
	})
}
module.exports = updatePackage