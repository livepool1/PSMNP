<template>
  <div class="bookSubOrder">
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "bookSubOrder",
  data: function() {
    return {
      form: {}
    };
  },
  created: function() {
    let routerParams = this.$route.params.dataobj;
    this.form = routerParams;
    console.log(this.form)
  },
  methods: {}
};
</script>

<style>

</style>