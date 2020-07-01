<template>
  <div id="rps-app"></div>
</template>

<script>
import rockPaperScissors from "./index.js";
export default {
  name: "RockPaperScissors",
  mounted() {
    rockPaperScissors();
  }
};
</script>

<style scoped lang="css"></style>
