<script setup lang="ts"></script>

<template>
  <div class="loader loader-1">
    <div class="loader-outter"></div>
    <div class="loader-inner"></div>
  </div>
</template>

<style scoped lang="scss">
.loader {
  --semiTranslate: 20px;
  // E9436F
  // 09F7A0
  display: inline-block;
  position: relative;
  vertical-align: middle;
  filter: drop-shadow(0 0px 4px #f90345);
  // animation: dropshadow 4s infinite;
  margin: 75px;
  border-radius: 50%;
  width: 60px;
  height: 60px;
}

.loader-star {
  position: absolute;
  top: calc(50% - 12px);
}

.loader-1 .loader-outter {
  @apply border-primary;
  position: absolute;
  -webkit-animation: loader-1-outter 1s cubic-bezier(0.42, 0.61, 0.58, 0.41) infinite;
  animation: loader-1-outter 1s cubic-bezier(0.42, 0.61, 0.58, 0.41) infinite;
  border: 2px solid;
  border-bottom: 0;
  border-left-color: transparent;
  border-radius: 50%;
  width: 100%;
  height: 100%;
}

.loader-1 .loader-inner {
  @apply border-primary;
  position: absolute;
  top: calc(50% - 20px);
  left: calc(50% - 20px);
  -webkit-animation: loader-1-inner 1s cubic-bezier(0.42, 0.61, 0.58, 0.41) infinite;
  animation: loader-1-inner 1s cubic-bezier(0.42, 0.61, 0.58, 0.41) infinite;
  border: 2px solid;
  border-right: 0;
  border-top-color: transparent;
  border-radius: 50%;
  width: 40px;
  height: 40px;
}

@-webkit-keyframes loader-1-outter {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes loader-1-outter {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@-webkit-keyframes loader-1-inner {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(-360deg);
    transform: rotate(-360deg);
  }
}

@keyframes loader-1-inner {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(-360deg);
    transform: rotate(-360deg);
  }
}
</style>
