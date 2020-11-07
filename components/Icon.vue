<script>
  import Vue from 'vue';
  import { library } from '@fortawesome/fontawesome-svg-core';
  import {
    faEnvelope,
    faEnvelopeOpen,
    faRss,
    faSearch,
    faBrain,
    faHourglass,
    faInfoCircle,
  } from '@fortawesome/free-solid-svg-icons';
  import {
    faFacebookF,
    faTwitter,
    faInstagram,
  } from '@fortawesome/free-brands-svg-icons';
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
    faHourglass,
    faInfoCircle,
  });

  export default Vue.component('icon', FontAwesomeIcon);
</script>
