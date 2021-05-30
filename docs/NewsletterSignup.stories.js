import NewsletterSignup from '../components/NewsletterSignup.vue';

export default {
    component: NewsletterSignup,
    title: 'Components/NewsletterSignup',
  };

  export const Primary = () => ({
    components: { NewsletterSignup },
    template: '<newsletter-signup />',
  });