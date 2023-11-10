<template>
  <div id="main">
    <div class="background">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {};
  },
};
</script>

<style scoped>
#main {
  background: #ee4d2d;
  height: 100vh;
}

#main .background {
  max-width: 1200px;
  height: 100%;
  margin: 0 auto;
  background-image: url('../assets/shopee_background.png');
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
