import wp from './provider';
import { search } from './users';
import { applyParams, resolveFeaturedMedia, parseMetaField } from './utilities';

// A bunch of nasty string parsing to get some structured data from the WP content
const parseReview = async (html) => {
    const container = document.createElement('div');
    container.innerHTML = html;
    const reviewerName = container.querySelector('h3').textContent.trim();
    const reviewer = await search(reviewerName);
    const body = html.replace(/^.+?<\/h3>(.+?)<span class="score".+?$/s, "$1").trim();
    const scoreWrap = container.querySelector('span.score');
    const scoreJson = scoreWrap.getAttribute('data-score');
    let score = {};
    try {
        score = JSON.parse(scoreJson);
    } catch { }
    const trackWrap = scoreWrap.nextElementSibling;
    trackWrap.removeChild(trackWrap.querySelector('strong'));
    const tracks = trackWrap.innerHTML.split('<br>').map(track => track.replace(/\s*&nbsp;\s*|\n/g, ''));
    return {
        reviewer,
        body,
        score,
        tracks,
    };
}

const parseColours = (colours) => {
    const coloursSplit = colours.split(';');
    return {
        primary: coloursSplit[0],
        secondary: coloursSplit[1],
        tertiary: coloursSplit[2],
    };
};

const parseTracks = (tracks) => tracks.split(';').map(track => track.trim());

const parseScore = (score) => {
    const [given, possible] = score.split('/').map(i => parseInt(i));
    return {
        given,
        possible,
        fraction: given/possible,
    };
};

const processReview = async (post) => {
    const reviews = post.content.rendered.split('<hr />');
    post.reviews = await Promise.all(reviews.map(parseReview));
    post.date = new Date(post.date);
    post.date_gmt = new Date(post.date_gmt);
    resolveFeaturedMedia(post);
    parseMetaField(post, 'Post Colours', parseColours);
    parseMetaField(post, 'Overall Score', parseScore);
    parseMetaField(post, 'Essential Tracks', parseTracks);
    parseMetaField(post, 'Favourite Tracks', parseTracks);
    return post;
}

const processReviews = async (cb) => Promise.all((await cb).map(processReview));

const getRawPosts = () => wp.posts();

const getRawReviews = (params = {}) => applyParams(getRawPosts().categories(2), params);

const getRawArticles = (params = {}) => applyParams(getRawPosts().excludeCategories(2), params);

export const getArticleBySlug = (slug) => getRawArticles().slug(slug);

export const getArticles = (params) => getRawArticles(params);

export const getReviewBySlug = (slug) => processReviews(getRawReviews().slug(slug));

export const getReviews = (params) => processReviews(getRawReviews(params));
