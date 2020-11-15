import fetchPonyfill from 'fetch-ponyfill';
import parseISO from 'date-fns/parseISO';

const { fetch } = fetchPonyfill();

const APIURL = process.env.apiUrl;
const SEARCHURL = process.env.searchUrl;

const processPost = (post) => {
    if (typeof post !== 'object'
        || post === null
        || !('metadata' in post)
        || typeof post.metadata !== 'object'
        || post.metadata === null) return post;
    const metadata = post.metadata;
    ['created', 'modified'].forEach(key => {
        if (key in metadata) {
            metadata[key] = parseISO(metadata[key]);
        }
    });
};

const getData = (route) => fetch(APIURL + route).then(r => r.json());

const getGrouping = async (route) => {
    const data = await getData(route);
    Object.values(data).forEach(posts => posts.forEach(processPost));
    return data;
};

const getListing = async (route) => {
    const data = await getData(route);
    data.forEach(processPost);
    return data;
};

const getSingle = async (route) => {
    const data = await getData(route);
    processPost(data);
    return data;
};

const banner = () => getListing('albumbanner.json');

const latest = () => getGrouping('latest.json');

const posts = (type) => getListing(`${type}.json`);

const post = (type, slug) => getSingle(`posts/${type}-${slug}.json`);

const indexedPost = (index) => getSingle(`posts/indexed/${index}.json`);

const page = (slug) => getSingle(`pages/${slug}.json`);

const tags = () => getGrouping('tags.json');

const tag = (slug) => getListing(`tags/${slug}.json`);

const types = () => getData('types.json');

const search = (term) => fetch(`${SEARCHURL}?term=${term}`).then(r => r.json());

export {
    banner,
    latest,
    posts,
    post,
    indexedPost,
    page,
    tags,
    tag,
    types,
    search,
}