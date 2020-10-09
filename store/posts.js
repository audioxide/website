import Vue from 'vue';
import { latest, posts, post, tag } from '../api';

const loaded = new Set();

/*
- post type comes in
- for each new post
    - check by path (type + slug) if it already exists
        - Object.assign new post into existing object
    - else push it to the end of that post type array
- at the end, sort all change post type arrays by date created
*/
const sortPostArray = (arr) => arr.sort((a, b) => {
    const aTime = a.metadata.created;
    const bTime = b.metadata.created;
    if (aTime === bTime) return 0;
    return (((aTime < bTime) * 2) - 1);
});

const mergePost = (postObject, lookup, newPost, sort = false) => {
    const type = newPost.metadata.type;
    const slug = newPost.metadata.slug;
    const path = `${type}/${slug}`;
    if (path in lookup) {
        Object.keys(newPost).forEach(key => Vue.set(lookup[path], key, newPost[key]));
        return false;
    }
    if (!Array.isArray(postObject[type])) {
        Vue.set(postObject, type, []);
    }
    postObject[type].push(newPost);
    if (sort) sortPostArray(postObject[type]);
    return true;
};

const mergePosts = (postObject, lookup, newPosts) => {
    const changed = new Set();
    newPosts.forEach(post => {
        if (mergePost(postObject, lookup, post)) {
            changed.add(post.metadata.type);
        }
    });
    changed.forEach(type => sortPostArray(postObject[type]));
}

export const state = () => ({
    posts: {},
    postData: {},
    tags: [],
});

export const getters = {
    pathLookup: ({ posts }) => Object.values(posts).reduce((acc, grouping) => {
        grouping.forEach(post => {
            acc[`${post.metadata.type}/${post.metadata.slug}`] = post;
        });
        return acc;
    }, {}),
    byTag: ({ posts, tags }) => tags.reduce((acc, key) => Object.assign(
        acc,
        { [key]: Object.values(posts).reduce((acc, typeList) => acc.concat(typeList.filter(post => post.metadata.tags.includes(key))), []) }
    ), {}),
    latestPost: ({ posts }) => Object.values(posts).reduce((latest, [post]) => !latest || new Date(post.metadata.created) > new Date(latest.metadata.created) ? post : latest, undefined),
};

const getterId = 'posts/pathLookup';
export const mutations = {
    setPostsObject(state, posts) {
        Object.values(posts).forEach(postArr => mergePosts(state.posts, this.getters[getterId], postArr));
    },
    setPostsArray(state, posts) {
        mergePosts(state.posts, this.getters[getterId], posts);
    },
    setPost(state, post) {
        mergePost(state.posts, this.getters[getterId], post, true);
    },
    addTag(state, tag) {
        if (!state.tags.includes(tag)) {
            state.tags.push(tag);
        }
    }
};

export const actions = {
    async getLatestData({ commit }) {
        const id = 'latest';
        if (loaded.has(id)) return;
        loaded.add(id);
        try {
            commit('setPostsObject', await latest());
        } catch {
            loaded.delete(id);
        }
    },
    async getPostType({ commit }, type) {
        const id = `posts/${type}`;
        if (loaded.has(id)) return;
        loaded.add(id);
        try {
            commit('setPostsArray', await posts(type));
        } catch {
            loaded.delete(id);
        }
    },
    async getPostTag({ commit }, tagSlug) {
        const id = `posts/tags/${tagSlug}`;
        if (loaded.has(id)) return;
        loaded.add(id);
        try {
            commit('setPostsArray', await tag(tagSlug));
            commit('addTag', tagSlug);
        } catch {
            loaded.delete(id);
        }
    },
    async getPost({ commit }, { type, slug }) {
        const id = `post/${type}/${slug}`;
        if (loaded.has(id)) return;
        loaded.add(id);
        try {
            commit('setPost', await post(type, slug));
        } catch {
            loaded.delete(id);
        }
    },
};
