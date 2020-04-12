import wp from './provider';

export const applyParams = (call, params) => Object.entries(params).reduce((acc, param) => acc.param(...param), call).get();

export const parseMetaField = (post, field, cb) => {
    if (typeof post === 'object'
    && post !== null
    && typeof post.meta === 'object'
    && post.meta !== null
    && post.meta[field]) {
        post.meta[field] = cb(post.meta[field]);
    }
}

export const resolveFeaturedMedia = async (post) => {
    if (!post.featured_media) return;
    post.featured_media = await wp.media().id(post.featured_media).get();
}