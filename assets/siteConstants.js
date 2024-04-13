const SITE_URL = process.env.SITE_URL || 'https://audioxide.com'
const SITE_NAME = 'Audioxide'
const SITE_DESCRIPTION =
  'Three friends reviewing an album a week. Also publish articles, interviews, listening parties, and other oddities when the mood takes them.'
const SITE_FOUNDING_YEAR = 2015

// Content channels
const RSS_BASE = '/feed'
const RSS_URL = SITE_URL + RSS_BASE
const GITHUB_URL = 'https://github.com/audioxide'

// Social media
const TWITTER_HANDLE = 'audioxide'
const TWITTER_URL = `https://twitter.com/${TWITTER_HANDLE}`
const FACEBOOK_HANDLE = 'audioxide'
const FACEBOOK_URL = `https://facebook.com/${FACEBOOK_HANDLE}`
const INSTAGRAM_HANDLE = 'audioxidecom'
const INSTAGRAM_URL = `https://instagram.com/${INSTAGRAM_HANDLE}`

export {
  SITE_URL,
  SITE_NAME,
  SITE_DESCRIPTION,
  SITE_FOUNDING_YEAR,
  RSS_BASE,
  RSS_URL,
  GITHUB_URL,
  TWITTER_HANDLE,
  TWITTER_URL,
  FACEBOOK_HANDLE,
  FACEBOOK_URL,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL
}
