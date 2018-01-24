<template>
  <supervise></supervise>
</template>

<script>
export default {
  name: 'complaintHandle',
  data: function() {
  return {
  }
  }
}
</script>

<style>
  /* 路由切换动效 */
.fade-enter-active, .fade-leave-active {
  transition: all .5s;
}
.fade-enter, .fade-leave-active {
  opacity: 0;
}

  .list-enter-active, .list-leave-active {
    transition: all 1s;
  }
  .list-enter, .list-leave-active {
    opacity: 0;
    transform: translateY(30px);
  }

</style>
