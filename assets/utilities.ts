import { Route } from 'vue-router';
import he from 'he';
import {
    SITE_DESCRIPTION,
    TWITTER_URL,
    FACEBOOK_URL,
    INSTAGRAM_URL,
    SITE_URL,
    SITE_NAME,
    SITE_FOUNDING_YEAR,
} from './siteConstants';

const rand = (
    min: number,
    max: number,
) => (Math.floor(Math.pow(10,14)*Math.random()*Math.random())%(max-min+1))+min;

const padNum = (
    number: number,
    length = 2,
    character = '0',
) => number.toString().padStart(length, character);

const toTitleCase = (str: string, divisor = ' ') => str
    .split(divisor)
    .map(word => word[0].toUpperCase() + word.substr(1))
    .join(divisor);

const isObject = (obj: any): obj is object => typeof obj === 'object' && obj !== null;

const metaTitle = (str: string) => `${he.decode(str)} // Audioxide`;

const albumCoverAlt = (review: Review) => `Album artwork of '${review.metadata.album}' by ${review.metadata.artist}`;

type Procedure = (...args: any[]) => void;
type ThrottledFunction<T extends Procedure> = (...args: Parameters<T>) => void;
const throttle = <T extends Procedure>(func: T, waitMs: number): ThrottledFunction<T> => {
    let timeoutUID: number = NaN;
    type FuncArgs = Parameters<T>;
    const call = (...args: FuncArgs) => {
        timeoutUID = NaN;
        func(...args);
    };
    return (...args: FuncArgs) => {
        if (Number.isNaN(timeoutUID)) {
            timeoutUID = setTimeout(call, waitMs, ...args);
        }
    };
};

const resolveAuthorLink = (author?: Author) => {
    if (!author || !isObject(author.links)) return null;
    const linkData = author.links[author.links.default];
    switch(author.links.default) {
        case 'twitter':
            return {
                text: `@${linkData}`,
                url: `https://twitter.com/${linkData}`,
            };
        case 'instagram':
            return {
                text: `@${linkData}`,
                url: `https://instagram.com/${linkData}`,
            };
        case 'facebook':
            return {
                text: linkData,
                url: `https://facebook.com/${linkData}`,
            };
        case 'email':
            return {
                text: linkData,
                url: `mailto:${linkData}`,
            };
        default:
            return {
                text: linkData,
                url: linkData,
            };
    }
};

const authorDivider = (key: number, length: number) => {
    if (key === length - 1) {
        return '';
    }
    if (key === length - 2) {
        return ', and ';
    }
    return ', ';
};

const audioxideStructuredData = () => ({
    '@context': 'http://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    foundingDate: SITE_FOUNDING_YEAR.toString(),
    founder: [
        {
            '@type': 'Person',
            'name': 'André Dack',
            'sameAs': 'https://twitter.com/andredack'
        },
        {
            '@type': 'Person',
            'name': 'Andrew Bridge',
            'sameAs': 'http://www.andrewhbridge.co.uk'
        },
        {
            '@type': 'Person',
            'name': 'Frederick O\'Brien',
            'sameAs': 'https://frederickobrien.com'
        }
    ],
    url: SITE_URL,
    logo: `${SITE_URL}/full-logo-black-on-white.png`,
    sameAs: [ FACEBOOK_URL, TWITTER_URL, INSTAGRAM_URL ],
});

const generateBreadcrumbs = (route: Route, titles: Array<string | null> = []) => ({
    '@type': 'BreadcrumbList',
    'itemListElement': route.path.substr(1).split('/').map((part, ind, arr) => ({
        '@type': 'ListItem',
        position: ind + 1,
        item: 'https://audioxide.com/' + arr.slice(0, ind + 1).join('/'),
        name: titles[ind] || toTitleCase(part, '-'),
    })),
});

export {
    rand,
    padNum,
    isObject,
    toTitleCase,
    metaTitle,
    albumCoverAlt,
    throttle,
    resolveAuthorLink,
    authorDivider,
    audioxideStructuredData,
    generateBreadcrumbs,
}