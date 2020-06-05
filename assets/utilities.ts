const padNum = (
    number: number,
    length = 2,
    character = '0',
) => number.toString().padStart(length, character);

const isObject = (obj: any): obj is object => typeof obj === 'object' && obj !== null;

const resolveAuthorLink = (author) => {
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
                text: linkData,
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
}

export {
    padNum,
    isObject,
    resolveAuthorLink,
}