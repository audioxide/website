import { API_URL, SITE_NAME, SITE_URL } from '$lib/constants';
import type { LatestPostsObject } from '../+page.server';

export async function GET({ fetch }) {
	const response = await fetch(`${API_URL}/latest.json`);
	const latest: LatestPostsObject = await response.json();
	const mostRecentPostCreationDate = Object.values(latest)
		.flat()
		.sort(
			(a, b) => new Date(b.metadata.created).getTime() - new Date(a.metadata.created).getTime()
		)[0].metadata.created;
	const latestAsRss = Object.values(latest)
		.flat()
		.sort((a, b) => new Date(b.metadata.created).getTime() - new Date(a.metadata.created).getTime())
		.map((post) => {
			const metadata = post.metadata;
			const postLink = `${SITE_URL}/${metadata.type}/${metadata.slug}`;
			return `
            <item>
                <title>${metadata.type === 'reviews' ? 'Review: ' : ''}${metadata.title}</title>
                <link>${postLink}</link>
                <guid>${postLink}</guid>
                <pubDate>${new Date(metadata.created).toUTCString()}</pubDate>
                <description>${metadata.summary}</description>
            </item>
        `;
		});
	const feed = `
        <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
            <channel>
                <title>${SITE_NAME}</title>
                <link>${SITE_URL}</link>
                <description>Three friends reviewing albums together. Also publish articles, interviews, and other oddities when the mood takes them.</description>
                <language>en</language>
                <lastBuildDate>${new Date(mostRecentPostCreationDate).toUTCString()}</lastBuildDate>
                <atom:link href="${SITE_URL}/feed" rel="self" type="application/rss+xml" />
                ${latestAsRss.join('')}
            </channel>
        </rss>
    `;
	return new Response(feed, {
		headers: {
			'Content-Type': 'application/rss+xml'
		}
	});
}
