import NewsletterSignup from '../components/NewsletterSignup.vue';

export default {
    component: NewsletterSignup,
    title: 'Components/Newsletter Signup Box',
  };

  export const Main = () => ({
    components: { NewsletterSignup },
    template: '<newsletter-signup />',
  });