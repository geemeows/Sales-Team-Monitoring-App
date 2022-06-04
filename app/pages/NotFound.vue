<template>
  <div class="c-not-found">
    <div class="c-not-found__container">
      <div class="c-not-found__info">
        <h1 class="c-not-found__title">
          Oops!
        </h1>
        <div class="c-not-found__content">
          <span class="c-not-found__description">
            Sorry, the page you visited does not exist!
          </span>
          <span class="c-not-found__code"> Error code: 404 </span>
          <a
            class="c-not-found__link"
            href="/"
          >Go Home</a>
        </div>
      </div>
      <div class="c-not-found__image">
        <img
          :src="NotFoundGif"
          alt="404-error"
        >
      </div>
    </div>
  </div>
</template>
<script>
import NotFoundGif from '../assets/404.gif';
export default {
  name: 'NotFoundPageComponent',
  data: () => ({
    NotFoundGif,
  }),
};
</script>
