<template>
    <div class="bookSubOrder">
        {{form}}
    </div>
</template>
<script>
import axios from "axios";
export default {
  name: "bookSubOrder",
  data: function() {
    return {
        form:{}
    };
  },
  created:{

  },
  methods: {
    getParams() {
      let routerParams = this.$route.params.dataobj;
      this.form = routerParams;
    }
  }
};
</script>

<style>

</style>