import Vue from 'vue';
import { getReviews, getReviewBySlug } from '../api/posts';

export const state = () => ({
    posts: [],
    lastSerialReviewDate: -1,
    lastSerialArticle: -1,
});

export const getters = {
    slugLookup: ({ posts }) => posts.reduce((acc, post) => Object.assign(acc, { [post.slug]: post}), {}),
    idLookup: ({ posts }) => posts.reduce((acc, post) => {
        acc[post.id] = post;
        return acc;
    }, {}),
    reviews: ({ lastSerialReviewDate, posts }) => posts.filter(post => post.date >= lastSerialReviewDate && post.categories.includes(2)).sort((a, b) => ((b.date > a.date) * 2) - 1),
    articles: ({ posts }) => posts.filter(post => !post.categories.includes(2)),
};

export const mutations = {
    setPosts(state, posts) {
        state.posts.push(...posts);
    },
    tagLastReview(state, post) {
        state.lastSerialReviewDate = new Date(post.date);
    },
    tagLastArticle(state, post) {
        state.lastSerialArticle = post;
    }
};

export const actions = {
    async getReviews({ state, commit, getters }) {
        const params = {};
        if (state.lastSerialReviewDate !== -1) {
            params.before = state.lastSerialReviewDate;
        }
        const reviews = await getReviews(params);
        commit('setPosts', reviews);
        commit('tagLastReview', reviews[reviews.length - 1]);
        // eslint-disable-next-line no-console
        console.log(getters.idLookup);
    },
    async getReview({ commit, getters }, slug) {
        if (!(slug in getters.slugLookup)) {
            commit('setPosts', await getReviewBySlug(slug));
        }
        return getters.slugLookup[slug];
    }
};
