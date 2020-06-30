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

const getGrouping = async (route) => {
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
};

const banner = () => getListing('albumbanner.json');

const latest = () => getGrouping('latest.json');

const posts = (type) => getListing(`${type}.json`);

const post = (type, slug) => getSingle(`posts/${type}-${slug}.json`);

const tags = () => getGrouping('tags.json');

const tag = (slug) => getSingle(`tags/${slug}.json`);

export {
    banner,
    latest,
    posts,
    post,
    tags,
    tag,
}