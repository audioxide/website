import Vue from 'vue';
import { latest, posts, post } from '../api';

const loaded = new Set();

export const state = () => ({
    posts: {},
    postData: {},
    tags: {},
});

export const getters = {
    slugLookup: ({ posts }) => posts.reduce((acc, post) => Object.assign(acc, { [post.slug]: post}), {}),
    idLookup: ({ posts }) => posts.reduce((acc, post) => Object.assign(acc, { [post.id]: post }), {}),
    byTag: ({ posts, tags }) => Object.keys(tags).map(id => parseInt(id)).reduce((acc, key) => Object.assign(
        acc,
        { [key]: posts.filter(post => post.date >= (tags[key] || Number.MIN_SAFE_INTEGER) && post.categories.includes(key)) }
    ), {}),
    latestPost: ({ posts }) => Object.values(posts).reduce((latest, [post]) => !latest || new Date(post.metadata.created) > new Date(latest.metadata.created) ? post : latest, undefined),
};

export const mutations = {
    setPosts(state, posts) {
        Vue.set(state, 'posts', posts)
    },
    setPostsByType(state, { type, posts }) {
        Vue.set(state.posts, type, posts);
    },
    setPostData(state, { type, slug, data }) {
        if (!(type in state.postData)) {
            Vue.set(state.postData, type, {});
        }
        Vue.set(state.postData[type], slug, data);
    },
    tag(state, { post, category }) {
        Vue.set(state.tags, category, new Date(post.date));
    },
};

export const actions = {
    async getLatestData({ commit }) {
        commit('setPosts', await latest());
    },
    async getPostType({ commit }, type) {
        commit('setPostsByType', { type, posts: await posts(type) });
    },
    async getPost({ commit, state }, { type, slug }) {
        if (!(type in state.postData) || !(slug in state.postData[type])) {
            commit('setPostData', { type, slug, data: await post(type, slug) });
        }
        return state.postData[type][slug];
    },
    async getPostsInCategory({ state, commit }, category) {
        const params = { categories: [category] };
        if (state.tags[category]) {
            params.before = state.tags[category];
        }
        const posts = await getPosts(params);
        commit('setPosts', posts);
        commit('tag', { post: posts[posts.length - 1], category });
    },
    async getReviews({ state, commit }) {
        const params = {};
        if (state.lastSerialReviewDate !== -1) {
            params.before = state.lastSerialReviewDate;
        }
        const reviews = await getReviews(params);
        commit('setPosts', reviews);
        commit('tag', { post: reviews[reviews.length - 1], category: 2 });
    },
    async getReview({ commit, getters }, slug) {
        if (!(slug in getters.slugLookup)) {
            commit('setPosts', await getReviewBySlug(slug));
        }
        return getters.slugLookup[slug];
    },
    async getArticles({ state, commit }) {
        const params = {};
        if (state.lastSerialArticleDate !== -1) {
            params.before = state.lastSerialArticleDate;
        }
        const articles = await getArticles(params);
        commit('setPosts', articles);
        commit('tag', { post: articles[articles.length - 1], category: 1 });
    },
    async getArticle({ commit, getters }, slug) {
        if (!(slug in getters.slugLookup)) {
            commit('setPosts', await getArticleBySlug(slug));
        }
        return getters.slugLookup[slug];
    }
};
