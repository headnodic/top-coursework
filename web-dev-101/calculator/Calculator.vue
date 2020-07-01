<template>
  <div id="main"></div>
</template>

<script>
import calculator from "./index.js";
export default {
  name: "Calculator",
  mounted() {
    calculator();
  }
};
</script>

<style scoped lang="css"></style>
