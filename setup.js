require('dotenv').config()
const path = require('path')
const fse = require('fs-extra')
const generateRoutes = require('./generateRoutes')

const init = async () => {
  const routesReady = generateRoutes()

  const getPath = (...paths) => path.resolve(__dirname, ...paths)
  const getDepPath = (...paths) =>
    getPath('./node_modules/@audioxide', ...paths)
  const getBrandDepPath = (...paths) => getDepPath('brand/assets', ...paths)

  const imgDir = getPath('assets/img')
  const staticDir = getPath('static')
  fse.copySync(getBrandDepPath('svg'), imgDir)

  fse.copySync(getBrandDepPath('favicon'), staticDir)

  const brandPngsDep = getBrandDepPath('png')
  fse.readdirSync(brandPngsDep).forEach((item) => {
    if (item.startsWith('award-')) {
      fse.copySync(getPath(brandPngsDep, item), getPath(imgDir, item))
    } else if (item.startsWith('social-tile') || item.startsWith('full-logo')) {
      fse.copySync(getPath(brandPngsDep, item), getPath(staticDir, item))
    }
  })

  await routesReady
}

init()
