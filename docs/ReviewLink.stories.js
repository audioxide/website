import ReviewLink from '../components/ReviewLink.vue'

const reviewLinkDefaults = Object.entries(
  ReviewLink.sealedOptions.props
).reduce((acc, [key, val]) => {
  if (typeof val === 'object' && val !== null && 'default' in val) {
    acc[key] = val.default
  }
  return acc
}, {})

export default {
  title: 'Components/Review Link',
  component: ReviewLink,
  argTypes: {
    postArtist: { name: 'Artist' },
    postAlbum: { name: 'Album' },
    postBlurb: { name: 'Blurb' },
    postColour: { name: 'Colour', control: 'color' },
    imageFormat: {
      name: 'Image Aspect Ratio',
      options: ['standard', 'square', 'original'],
      control: {
        type: 'select',
        labels: {
          standard: 'Standard (3:2)',
          square: 'Square (1:1)',
          original: 'Use original image aspect ratio',
        },
      },
    },
    imageSize: {
      name: 'Image Size',
      control: 'select',
      options: ['xsmall', 'small', 'medium', 'large', 'xlarge'],
    },
    image: {
      name: 'Show image?',
      table: { defaultValue: { summary: true } },
    },
    title: {
      name: 'Show title?',
    },
    blurb: {
      name: 'Show blurb?',
    },
    author: {
      name: 'Show author?',
    },
  },
  args: reviewLinkDefaults,
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ReviewLink },
  render(h) {
    const {
      postAlbum,
      postArtist,
      postColour,
      postBlurb,
      postImagePrefix,
      ...rest
    } = this.$props
    return h(ReviewLink, { props: { ...rest, post: this.post } })
  },
  computed: {
    post() {
      return {
        metadata: {
          type: 'review',
          slug: 'a-test-slug',
          album: this.postAlbum,
          artist: this.postArtist,
          colours: [this.postColour],
          blurb: this.postBlurb,
          featuredimage: {
            [`${this.imageSize}-${this.imageFormat}`]: `${this.postImagePrefix}-${this.imageSize}-${this.imageFormat}.jpg`,
          },
        },
      }
    },
  },
})

export const Listing = Template.bind({})
Listing.args = {
  postAlbum: 'Test Album',
  postArtist: 'Test Artist',
  postColour: 'pink',
  postBlurb: 'Lorem ipsum dolor',
  postImagePrefix:
    'https://audioxide.com/api/images/album-artwork/mm-food-mf-doom',
}

export const RelatedLink = Template.bind({})
RelatedLink.args = {
  ...Listing.args,
  blurb: false,
}
