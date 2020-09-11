const APIURL = process.env.apiUrl;

const resolveFeaturedImage = post => {
    let imageObj;
    if ('metadata' in post && 'featuredimage' in post.metadata) {
        imageObj = post.metadata.featuredimage;
    }
    if ('featuredimage' in post) {
        imageObj = post.featuredimage;
    }
    if (!imageObj) return;
    Object.entries(imageObj).forEach(([key, imageUrl]) => {
        // Add API url to make an absolute URL and remove duplicate /
        imageObj[key] = APIURL + imageUrl.substr(1);
    });
}

const getData = (route) => fetch(APIURL + route).then(r => r.json());

/* const getGrouping = async (route) => {
    const data = await getData(route);
    // Object.values(data).forEach(posts => posts.forEach(resolveFeaturedImage));
    return data;
};

const getListing = async (route) => {
    const data = await getData(route);
    // data.forEach(resolveFeaturedImage);
    return data;
};

const getSingle = async (route) => {
    const data = await getData(route);
    // resolveFeaturedImage(data);
    return data;
}; */

const banner = () => getData('albumbanner.json');

const latest = () => getData('latest.json');

const posts = (type) => getData(`${type}.json`);

const post = (type, slug) => getData(`posts/${type}-${slug}.json`);

const page = (slug) => getData(`pages/${slug}.json`);

const tags = () => getData('tags.json');

const tag = (slug) => getData(`tags/${slug}.json`);

const types = () => getData('types.json');

export {
    banner,
    latest,
    posts,
    post,
    page,
    tags,
    tag,
    types,
}