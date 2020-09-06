import Vue from 'vue';
import { banner } from '../api';

export const strict = false;

export const plugins = [
    store => {
        const setBreakpoint = () => {
            const currentBp = store.state.breakpoint;
            let newBp = 'base';
            const isBetween = (min, max) => window.innerWidth >= min && window.innerWidth < max;
            if (isBetween(480, 960)) {
                newBp = 'small';
            } else if (isBetween(960, 1440)) {
                newBp = 'medium';
            } else if (isBetween(1440, Infinity)) {
                newBp = 'large';
            }
            if (currentBp !== newBp) {
                store.commit('setBreakpoint', newBp);
            }
        };
        window.addEventListener('DOMContentLoaded', setBreakpoint);
        window.addEventListener('resize', setBreakpoint);
    },
]

export const state = () => ({
    banner: {},
    breakpoint: 'base',
});

export const mutations = {
    setBannerData(state, data) {
        Vue.set(state, 'banner', data)
    },
    setBreakpoint(state, breakpoint) {
        state.breakpoint = breakpoint;
    }
};

export const actions = {
    async getBannerData({ commit }) {
        commit('setBannerData', await banner());
    },
};
