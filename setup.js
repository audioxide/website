const path = require('path');
const fse = require('fs-extra');

const getPath = (...paths) => path.resolve(__dirname, ...paths);
const getDepPath = (...paths) => getPath('./node_modules/@audioxide', ...paths);

fse.copySync(
    getDepPath('licensed-assets/webfonts/allroundgothic_medium_macroman'),
    getPath('assets/webfonts/allroundgothic_medium_macroman'),
);

const brandAssetsDep = getDepPath('brand/assets');
const imgDir = getPath('assets/img');
fse.copySync(
    brandAssetsDep + '/svg',
    imgDir,
);

const brandPngsDep = brandAssetsDep + '/png/';
fse.readdirSync(brandPngsDep).forEach(item => {
    if (item.startsWith('ribbon-')) {
        fse.copySync(brandPngsDep + item, `${imgDir}/${item}`);
    }
});
