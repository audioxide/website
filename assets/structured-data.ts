import { Route } from 'vue-router'
import {
  SITE_DESCRIPTION,
  GITHUB_URL,
  TWITTER_URL,
  FACEBOOK_URL,
  INSTAGRAM_URL,
  SITE_URL,
  SITE_NAME,
  SITE_FOUNDING_YEAR
} from './siteConstants'
import { generateBreadcrumbs } from './utilities'

const audioxideStructuredData = () => ({
  '@context': 'http://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  copyrightYear: SITE_FOUNDING_YEAR,
  creator: [
    {
      '@type': 'Person',
      name: 'André Dack',
      sameAs: 'https://twitter.com/andredack'
    },
    {
      '@type': 'Person',
      name: 'Andrew Bridge',
      sameAs: 'https://www.andrewhbridge.co.uk'
    },
    {
      '@type': 'Person',
      name: "Frederick O'Brien",
      sameAs: 'https://frederickobrien.com'
    }
  ],
  url: SITE_URL,
  sameAs: [FACEBOOK_URL, TWITTER_URL, INSTAGRAM_URL, GITHUB_URL],
  isAccessibleForFree: true
})

const createReviewStructuredData = (
  metadata: ReviewMetadata,
  datePublished: string,
  dateModified: string,
  route: Route
) => {
  return [
    {
      type: 'application/ld+json',
      json: {
        '@context': 'http://schema.org',
        '@type': 'Review',
        headline: metadata.title,
        description: metadata.summary || metadata.blurb || '',
        datePublished,
        dateModified,
        author: metadata.author.authors.map((author) => ({
          '@type': 'Person',
          name: author.name
        })),
        itemReviewed: {
          '@type': 'MusicAlbum',
          name: metadata.album,
          '@id': `https://musicbrainz.org/release-group/${metadata.albumMBID}`,
          image: (metadata.featuredimage || {})['medium-square'] || '',
          albumReleaseType: 'http://schema.org/AlbumRelease',
          byArtist: {
            '@type': 'MusicGroup',
            name: metadata.artist,
            '@id': `https://musicbrainz.org/artist/${metadata.artistMBID}`
          }
        },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: metadata.totalscore.given,
          worstRating: 0,
          bestRating: metadata.totalscore.possible
        },
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: [
            '.review-header__album',
            '.review-header__artist',
            '.review-sidebar__summary'
          ]
        },
        publisher: audioxideStructuredData(),
        breadcrumb: generateBreadcrumbs(route, [
          'Album Reviews',
          `${metadata.album} // ${metadata.artist}`
        ])
      }
    }
  ]
}

export { audioxideStructuredData, createReviewStructuredData }
