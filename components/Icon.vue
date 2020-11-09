<script>
  import Vue from 'vue';
  import { library } from '@fortawesome/fontawesome-svg-core';
  import {
    faEnvelope,
    faEnvelopeOpen,
    faRss,
    faSearch,
    faBrain,
  } from '@fortawesome/free-solid-svg-icons';
  import {
    faFacebookF,
    faTwitter,
    faInstagram,
  } from '@fortawesome/free-brands-svg-icons';
  import {
    faSpinnerThird,
  } from '@audioxide/licensed-assets/js/@fortawesome/pro-duotone-svg-icons';
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

  library.add({
    faEnvelope,
    faEnvelopeOpen,
    faFacebookF,
    faTwitter,
    faInstagram,
    faRss,
    faSearch,
    faBrain,
    faSpinnerThird,
  });

  export default Vue.component('icon', FontAwesomeIcon);
</script>
