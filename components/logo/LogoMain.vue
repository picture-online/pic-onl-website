<script setup lang="ts">
defineProps<{
  animation: 'NONE' | 'FULL' | 'SEMI'
  mt?: string
  width?: string
  height?: string
  lazy?: boolean
}>()
</script>

<template>
  <div class="logo relative isolate flex flex-col">
    <!-- <img src="~/assets/images/logo/ip-online-head.png" alt="ip online logo head" class="head-img -ml-2 w-full transform-gpu will-change-transform" /> -->
    <!-- <img src="~/assets/images/logo/ip-online-bottom.png" alt="ip online logo bottom" class="bottom-img -mt-[12px] w-full transform-gpu will-change-transform" /> -->
    <img
      v-if="animation !== 'NONE'"
      draggable="false"
      src="~/assets/images/logo/ip-online-head.svg"
      alt="ip online logo head"
      width="163px"
      height="23px"
      :loading="lazy ? 'lazy' : 'eager'"
      class="head-img z-20 h-[23px] w-[163px] transform-gpu will-change-transform"
      :class="[animation]"
    />
    <img
      v-if="animation !== 'NONE'"
      draggable="false"
      src="~/assets/images/logo/ip-online-bottom.svg"
      alt="ip online logo bottom"
      width="163px"
      :loading="lazy ? 'lazy' : 'eager'"
      height="26px"
      class="bottom-img h-[26px] w-[163px] transform-gpu will-change-transform"
      :class="[mt, animation]"
    />

    <img
      v-if="animation === 'NONE'"
      :loading="lazy ? 'lazy' : 'eager'"
      :width="width ?? '192px'"
      :height="height ?? '55px'"
      src="~/assets/images/logo/ip-online.webp"
      alt="ip online logo bottom"
      class="transform-gpu will-change-transform"
      :class="[{ 'w-[192px]': !width, 'h-[55px]': !height }]"
    />
  </div>
</template>

<style scoped lang="scss">
.logo {
  --semiTranslate: 20px;

  .head-img.SEMI {
    animation: glitch-semi-top 4s linear infinite alternate-reverse;
  }

  .bottom-img.SEMI {
    animation: glitch-semi-bottom 4s linear infinite alternate-reverse;
  }

  .head-img.FULL {
    animation: glitch-full-top 0.01s linear infinite alternate-reverse;
  }

  .bottom-img.FULL {
    animation: glitch-full-bottom 0.01s linear infinite alternate-reverse;
  }

  @keyframes glitch-full-top {
    0%,
    39% {
      transform: translateX(0);
    }

    40% {
      transform: translateX(-5px);
    }
    55%,
    95% {
      transform: translateX(0);
    }

    99% {
      transform: translateX(60px);
    }
    100% {
      transform: translateX(0);
    }
  }

  @keyframes glitch-full-bottom {
    0%,
    39% {
      transform: translateX(0);
    }

    40% {
      transform: translateX(5px);
    }
    55%,
    95% {
      transform: translateX(0);
    }

    99% {
      transform: translateX(-60px);
    }
    100% {
      transform: translateX(0);
    }
  }

  @keyframes glitch-semi-top {
    0%,
    19.99% {
      transform: translateX(0);
    }
    20%,
    20.55% {
      transform: translateX(var(--semiTranslate));
    }

    21%,
    22%,
    49% {
      transform: translateX(0);
    }

    50%,
    50.55% {
      transform: translateX(var(--semiTranslate));
    }

    51%,
    51.55% {
      transform: translateX(calc(var(--semiTranslate) * -1));
    }

    52%,
    52.55% {
      transform: translateX(var(--semiTranslate));
    }

    53%,
    53.55%,
    100% {
      transform: translateX(0);
    }
  }

  @keyframes glitch-semi-bottom {
    0%,
    19.99% {
      transform: translateX(0);
    }
    20%,
    20.55% {
      transform: translateX(calc(var(--semiTranslate) * -1));
    }

    21%,
    22%,
    49% {
      transform: translateX(0);
    }

    50%,
    50.55% {
      transform: translateX(calc(var(--semiTranslate) * -1));
    }

    51%,
    51.55% {
      transform: translateX(var(--semiTranslate));
    }

    52%,
    52.55% {
      transform: translateX(calc(var(--semiTranslate) * -1));
    }

    53%,
    53.55%,
    100% {
      transform: translateX(0);
    }
  }
}
</style>
