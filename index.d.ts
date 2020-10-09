type ImageDimensions = { w: number, h?: number };

type ImageSizeResolutions = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';

type ImageSizeAspectRatios = 'standard' | 'square' | 'original';

type ImageSizes = [
    "xsmall-standard",
    "xsmall-square",
    "xsmall-original",
    "small-standard",
    "small-square",
    "small-original",
    "medium-standard",
    "medium-square",
    "medium-original",
    "large-standard",
    "large-square",
    "large-original",
    "xlarge-standard",
    "xlarge-square",
    "xlarge-original",
];

type ImageSizesObj = { [key in ImageSizes[number]]: string };

type AuthorLinkTypes = "twitter" | "instagram" | "facebook" | "email" | "website";

type AuthorLinks = {
    [K in AuthorLinkTypes]: string;
} & { default: AuthorLinkTypes};

type Author = {
    name: string,
    slug: string,
    links?: AuthorLinks,
}

type ReviewScore = {
    given: number,
    possible: number,
    fraction: number,
}

type ContentItem = {
    [key: string]: any,
} & {
    content?: string,
    body?: string,
}

interface ReviewItem extends ContentItem {
    author: Author,
    review: string,
    tracks: string[],
    score: ReviewScore,
}

interface PostMetadata {
    created: Date,
    modified: Date,
    slug: string,
    title: string,
    type: string,
    summary?: string,
    blurb?: string,
    featuredimage?: ImageSizesObj,
    tags?: string[],
}

interface ArticleMetadata extends PostMetadata {
    author: Author,
}

interface ReviewMetadata extends PostMetadata {
    album: string,
    artist: string,
    totalscore: ReviewScore,
    colours: [string, string, string],
    pullquote: string,
    week: number,
    essentialtracks?: string[],
    favouritetracks?: string[],
    artistMBID: string,
    albumMBID: string,
}

interface Post {
    metadata: PostMetadata,
    content: (string | ContentItem)[],
}

interface Article extends Post {
    metadata: ArticleMetadata,
}

interface Review extends Post {
    metadata: ReviewMetadata,
    content: (string | ReviewItem)[],
}

type PostListing<T extends Post> = T[];

type PostGrouping<T extends Post> = { [key: string]: PostListing<T> };
