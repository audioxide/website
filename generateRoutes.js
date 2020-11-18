const fetchPonyfill = require('fetch-ponyfill');
const { fetch } = fetchPonyfill();

// This is only run on servers and run before proxy redirects are implemented. Use the real API url
const getData = (route) => fetch(`${process.env.EXT_API_URL}/${route}.json`).then(r => r.json());

module.exports = async () => {
    const routes = [];
    const types = await getData('types');
    types.pages.forEach(route => routes.push(`/${route}`));
    await Promise.all(
        types.postTypes
            .map(type => routes.push(`/${type}`) && getData(type)
                .then(posts => posts
                    .forEach(({ metadata: { type, slug } }) => routes.push(`/${type}/${slug}`)),
                ),
            ),
    );
    return routes;
}