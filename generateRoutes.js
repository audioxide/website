const fs = require('fs');
const fetchPonyfill = require('fetch-ponyfill');
const { fetch } = fetchPonyfill();

const getData = (route) => fetch(`${process.env.API_URL}/${route}.json`).then(r => r.json());

module.exports = async () => {
    const routes = [];
    const types = await getData('types');
    types.pages.forEach(route => routes.push(`/${route}`));
    await Promise.all(
        types.postTypes
            .map(type => getData(type)
                .then(posts => posts
                    .forEach(({ metadata: { type, slug } }) => routes.push(`/${type}/${slug}`)),
                ),
            ),
    );
    return routes;
}