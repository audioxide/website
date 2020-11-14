import fetchPonyfill from 'fetch-ponyfill';
const { fetch } = fetchPonyfill();

const getData = (route) => fetch(process.env.API_URL + route + '.json').then(r => r.json());

export default () => {
    const routes = [];
    const types = await getData('types');
    types.pages.forEach(route => routes.push(`/${route}`));
    return Promise.all(
        types.postTypes
            .map(type => getData(type)
                .then(posts => posts
                    .forEach(({ metadata: { type, slug } }) => routes.push(`/${type}/${slug}`)),
                ),
            ),
    );
}