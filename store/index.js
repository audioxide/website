import Vue from 'vue';
import { banner } from '../api';

export const strict = false;

export const state = () => ({
    banner: {},
});

export const mutations = {
    setBannerData(state, data) {
        Vue.set(state, 'banner', data)
    },
};

export const actions = {
    async getBannerData({ commit }) {
        commit('setBannerData', await banner());
    },
};
