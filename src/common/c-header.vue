<template>
  <div class="c-header">
    <router-link
      class="icon-go"
      to="">
    </router-link>
    <span class="icon-go" @click="$router.go(-1)" v-else></span>
    <slot name="title"></slot>
  </div>
</template>

<script type="text/ecmascript-6">


</script>

<style lang="less" scoped>
  .c-header {
    background-color: #F8FCFF;
    text-align: center;
    position: relative;
    height: 12vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 4vw;
  h1 {
  .fz(font-size,34);
    letter-spacing: .2vw;
    font-weight: 600;
    margin-right: 36vw;
  }
  span,a {
    display: inline-block;
  .fz(font-size,46);
    transform: rotate(-180deg);
  &::before {
     color:#333;
   }
  }
  }
</style>
