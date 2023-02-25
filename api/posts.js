import wp from './provider'
import { searchBySlug, searchById } from './users'
import { applyParams, resolveFeaturedMedia, parseMetaField } from './utilities'

// A bunch of nasty string parsing to get some structured data from the WP content
const parseReview = async (html) => {
  const container = document.createElement('div')
  container.innerHTML = html
  const reviewerName = container.querySelector('h3').textContent.trim()
  const reviewer = await searchBySlug(reviewerName)
  const body = html
    .replace(/^.+?<\/h3>(.+?)<span class="score".+?$/s, '$1')
    .replace(/tabindex="\d"/g, '')
    .trim()
  const scoreWrap = container.querySelector('span.score')
  const scoreJson = scoreWrap.getAttribute('data-score')
  let score = {}
  try {
    score = JSON.parse(scoreJson)
  } catch {}
  const trackWrap = scoreWrap.nextElementSibling
  trackWrap.removeChild(trackWrap.querySelector('strong'))
  const tracks = trackWrap.innerHTML
    .split('<br>')
    .map((track) => track.replace(/\s*&nbsp;\s*|\n/g, ''))
  return {
    reviewer,
    body,
    score,
    tracks,
  }
}

const parseColours = (colours) => {
  const coloursSplit = colours.split(';')
  return {
    primary: coloursSplit[0],
    secondary: coloursSplit[1],
    tertiary: coloursSplit[2],
  }
}

const parseTracks = (tracks) => tracks.split(';').map((track) => track.trim())

const parseScore = (score) => {
  const [given, possible] = score.split('/').map((i) => parseInt(i))
  return {
    given,
    possible,
    fraction: given / possible,
  }
}

const processPost = async (post) => {
  post.date = new Date(post.date)
  post.date_gmt = new Date(post.date_gmt)
  post.modified = new Date(post.modified)
  post.modified_gmt = new Date(post.modified_gmt)
  post.author = await searchById(post.author, 'id')
  resolveFeaturedMedia(post)
  return post
}

const processReview = async (post) => {
  processPost(post)
  const reviews = post.content.rendered.split('<hr />')
  post.reviews = await Promise.all(reviews.map(parseReview))
  parseMetaField(post, 'Post Colours', parseColours)
  parseMetaField(post, 'Overall Score', parseScore)
  parseMetaField(post, 'Essential Tracks', parseTracks)
  parseMetaField(post, 'Favourite Tracks', parseTracks)
  return post
}

const processPosts = async (cb) => Promise.all((await cb).map(processPost))

const processReviews = async (cb) => Promise.all((await cb).map(processReview))

const getRawPosts = () => wp.posts()

const getRawReviews = (params = {}) =>
  applyParams(getRawPosts().categories(2), params)

const getRawArticles = (params = {}) =>
  applyParams(getRawPosts().excludeCategories(2), params)

export const getPosts = (params = {}) =>
  applyParams(getRawPosts(), params).then((posts) => {
    return Promise.all(
      posts.map(async (post) => {
        if (post.categories.includes(2)) {
          return processReview(post)
        }
        return processPost(post)
      })
    )
  })

export const getArticleBySlug = (slug) =>
  processPosts(getRawArticles().slug(slug))

export const getArticles = (params) =>
  processPosts(getRawArticles(params).get())

export const getReviewBySlug = (slug) =>
  processReviews(getRawReviews().slug(slug))

export const getReviews = (params) =>
  processReviews(getRawReviews(params).get())
