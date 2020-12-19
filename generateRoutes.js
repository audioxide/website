const fs = require('fs');
const path = require('path');
const fetchPonyfill = require('fetch-ponyfill');
const { fetch } = fetchPonyfill();

// This is only run on servers and run before proxy redirects are implemented. Use the real API url
const getData = (route) => fetch(`${process.env.EXT_API_URL}/${route}.json`).then(r => r.json());

const cacheFilePath = path.resolve(__dirname, './routes.json');

module.exports = async () => {
    if (fs.existsSync(cacheFilePath)) return JSON.parse(await fs.promises.readFile(cacheFilePath));
    const routes = ['/'];
    const [types, tags] = await Promise.all([getData('types'), getData('tags')]);
    types.pages.forEach(route => routes.push(`/${route}/`));
    tags.forEach(tag => routes.push(`/tags/${tag.replace(/ /g, '-')}`));
    await Promise.all(
        types.postTypes
            .map(type => routes.push(`/${type}`) && getData(type)
                .then(posts => posts
                    .forEach(({ metadata: { type, slug } }) => routes.push(`/${type}/${slug}/`)),
                ),
            ),
    );
    await fs.promises.writeFile(cacheFilePath, JSON.stringify(routes), { encoding: 'utf-8'});
    return routes;
}