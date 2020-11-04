<template>
  <router-link :to="dataLink" class="preview-link">
    <td>detail</td>
  </router-link>
</template>

<script>
/* eslint-disable no-console */
export default {
  name: "RouteTableItem",
  components: {},
  props: {
    routeName: { type: String, required: true },
    data: { type: Object, required: true }
  },
  computed: {
    dataLink() {
      return {
        name: this.routeName,
        params: this.data
      };
    }
  }
};
</script>
