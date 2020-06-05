const APIURL = process.env.apiUrl;

const getData = (route) => fetch(APIURL + route).then(r => r.json());

const latest = () => getData('latest.json');

const posts = (type) => getData(`${type}.json`);

const post = (type, slug) => getData(`posts/${type}-${slug}.json`);

const tags = () => getData('tags.json');

const tag = (slug) => getData(`tags/${slug}.json`);

export {
    latest,
    posts,
    post,
    tags,
    tag,
}