<template functional>
  <div class="newsletter-signup-container" :class="data.staticClass || ''">
    <form
      action="https://audioxide.us12.list-manage.com/subscribe/post?u=e64765d1225ec57b443bbcacf&amp;id=70cfb59a7a"
      method="post"
      id="mc-embedded-subscribe-form"
      name="mc-embedded-subscribe-form"
      class="validate"
      target="_blank"
      novalidate
    >
      <div id="mc_embed_signup_scroll">
        <h2>Sign up for monthly roundups.</h2>
        <div class="mc-field-group">
          <label for="mce-EMAIL">Email Address </label>
          <input
            type="email"
            value=""
            name="EMAIL"
            class="required email"
            id="mce-EMAIL"
          />
        </div>
        <div id="mce-responses" class="clear">
          <div
            class="response"
            id="mce-error-response"
            style="display: none"
          ></div>
          <div
            class="response"
            id="mce-success-response"
            style="display: none"
          ></div>
        </div>
        <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
        <div style="position: absolute; left: -5000px" aria-hidden="true">
          <input
            type="text"
            name="b_e64765d1225ec57b443bbcacf_70cfb59a7a"
            tabindex="-1"
            value=""
          />
        </div>
        <div class="clear">
          <input
            type="submit"
            value="Subscribe"
            name="subscribe"
            id="mc-embedded-subscribe"
            class="button"
          />
        </div>
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
@import '~assets/styles/variables';

.newsletter-signup-container {
  font-family: $heading-fontstack;
  font-weight: bold;
  text-align: center;
  color: black;
  width: 100%;
  margin: auto;
  padding: 1em;
  border: $line-width solid $line-colour;
  border-radius: 15px;
}
</style>