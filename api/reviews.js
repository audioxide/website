import wp from './provider';
import { resolveFeaturedMedia, parseMetaField } from './utilities';

// TODO: Move this to Vuex
const users = wp.users().perPage(30).get();

// A bunch of nasty string parsing to get some structured data from the WP content
const parseReview = async (html) => {
    const container = document.createElement('div');
    container.innerHTML = html;
    const reviewerName = container.querySelector('h3').textContent.trim();
    // TODO: Improve this hack
    const reviewer = (await users).find(({ slug }) => reviewerName.toLowerCase().replace('é', 'e') === slug);
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

export default async () => {
    const posts = await wp.posts().categories(2);
    for (const post of posts) {
        const reviews = post.content.rendered.split('<hr />');
        post.reviews = await Promise.all(reviews.map(parseReview));
        resolveFeaturedMedia(post);
        parseMetaField(post, 'Post Colours', parseColours);
        parseMetaField(post, 'Overall Score', parseScore);
        parseMetaField(post, 'Essential Tracks', parseTracks);
        parseMetaField(post, 'Favourite Tracks', parseTracks);
    }
    return posts;
};