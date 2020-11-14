const SITE_URL=process.env.SITE_URL || 'https://audioxide.com';
const SITE_NAME='Audioxide';
const SITE_DESCRIPTION='Independent music webzine. Publishes reviews, articles, interviews, and other oddities.';
const SITE_FOUNDING_YEAR=2015;

// Content channels
const RSS_BASE='/feed';
const RSS_URL=SITE_URL + RSS_BASE;
const NEWSLETTER_URL='https://eepurl.com/cox6qr';

// Social media
const TWITTER_HANDLE='audioxide';
const TWITTER_URL=`https://twitter.com/${TWITTER_HANDLE}`;
const FACEBOOK_HANDLE='audioxide';
const FACEBOOK_URL=`https://facebook.com/${FACEBOOK_HANDLE}`;
const INSTAGRAM_HANDLE='audioxidecom';
const INSTAGRAM_URL=`https://instagram.com/${INSTAGRAM_HANDLE}`;

export {
    SITE_URL,
    SITE_NAME,
    SITE_DESCRIPTION,
    SITE_FOUNDING_YEAR,
    RSS_BASE,
    RSS_URL,
    NEWSLETTER_URL,
    TWITTER_HANDLE,
    TWITTER_URL,
    FACEBOOK_HANDLE,
    FACEBOOK_URL,
    INSTAGRAM_HANDLE,
    INSTAGRAM_URL,
};