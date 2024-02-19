<script setup lang="ts">
type ErrorProperties = 'url' | 'statusCode' | 'statusMessage' | 'message' | 'stack' | (string & {})
type Error = { [Err in ErrorProperties]: string }
const { locale } = useI18n()
const localePath = useLocalePath()

defineProps<{
  error: Error
}>()

const head = useLocaleHead({
  addDirAttribute: true,
  identifierAttribute: 'id',
  addSeoAttributes: true
})
</script>
<template>
  <Html :lang="head?.htmlAttrs?.lang" :dir="head?.htmlAttrs?.dir">
    <NuxtLayout name="default" :error="!!error">
      <template #error>
        <div class="flex h-full w-full">
          <div class="flex h-full w-full flex-col items-center justify-center gap-2">
            <div class="relative flex flex-col items-center justify-center gap-4">
              <!-- <h4 class="font-mono text-[32vw] font-semibold text-transparent lg:text-[20em]">
                {{ error.statusCode ? Number(error.statusCode).toLocaleString(locale) : '' }}
              </h4> -->
              <div class="main-glitch flex w-full select-none items-center justify-center text-center">
                <div class="glitch-box flex items-center justify-center">
                  <div class="glitch text-[10vw]">
                    <span aria-hidden="true"> {{ error.statusCode ? Number(error.statusCode).toLocaleString(locale) : '' }}</span>
                    <p class="invisible">
                      {{ error.statusCode ? Number(error.statusCode).toLocaleString(locale) : '' }}
                    </p>
                    <span aria-hidden="true"> {{ error.statusCode ? Number(error.statusCode).toLocaleString(locale) : '' }}</span>
                  </div>
                </div>
              </div>

              <p class="text-bg-200 mt-12 flex pb-12 text-[6vw] font-bold tracking-tight lg:text-5xl">
                {{ $t('somethingWentWrong') }}
              </p>

              <NuxtLink v-if="localePath" :to="localePath('/')"> back </NuxtLink>
            </div>

            <DevOnly>
              <div class="bg-bg-600 mt-2 rounded-xl p-4">
                <code class="my-8 flex max-h-[24rem] max-w-5xl overflow-auto rounded-lg p-7 text-xs text-white">
                  <pre dir="ltr" class="whitespace-pre-wrap break-all">{{ error }}</pre>
                </code>
              </div>
            </DevOnly>
          </div>
        </div>
      </template>
    </NuxtLayout>
  </Html>
</template>

<style scoped lang="scss">
.main-glitch {
  --semiTranslate: 20px;
  display: flex;
  font-family: 'Finger Paint' !important;
  text-align: center;
}

.glitch {
  position: relative;
}

.glitch span {
  position: absolute;
  top: 0;
  left: 0;
}

// .glitch-box {
//   position: absolute;
//   inset: 0;

//   div {
//     position: absolute;
//     padding: 0.2rem 0;
//   }

//   div:nth-child(1) {
//     top: 1rem;
//     left: 0;
//     width: 2rem;
//   }

//   div:nth-child(2) {
//     bottom: 1rem;
//     left: 0;
//     width: 2rem;
//   }
//   div:nth-child(3) {
//     top: 50%;
//     left: 50%;
//     width: 2rem;
//   }
//   div:nth-child(4) {
//     top: 30%;
//     right: 30%;
//     width: 2rem;
//   }
//   div:nth-child(5) {
//     bottom: 1rem;
//     left: 2rem;
//     width: 2rem;
//   }
//   div:nth-child(6) {
//     bottom: 60%;
//     left: 2rem;
//     width: 2rem;
//   }

//   div:nth-child(even) {
//     @apply bg-primary;
//   }
//   div:nth-child(odd) {
//     @apply bg-secondary;
//   }
// }

// E9436F
// 09F7A0
.glitch span:first-child {
  // transform: translate(-0.04em, -0.03em);

  clip-path: polygon(0 0, 100% 0, 100% 45%, 0 50%);
  animation: glitch-semi-top 3s infinite;
  // glitch-text-top 2s infinite;
  text-shadow:
    0.03em 0 0 #e9436f,
    -0.03em -0.03em 0 #09f7a0;
}

.glitch span:last-child {
  // transform: translate(-0.1em, -0.02em);

  clip-path: polygon(0 54%, 100% 45%, 100% 100%, 0 100%);
  animation: glitch-semi-bottom 3s infinite;
  text-shadow:
    0.03em 0 0 #09f7a0,
    -0.03em -0.03em 0 #e9436f;
}

@keyframes glitch-text-top {
  0%,
  5% {
    text-shadow:
      0.05em 0 0 #e9436f,
      -0.03em -0.04em 0 #09f7a0;
  }

  5%,
  5.01% {
    text-shadow:
      -0.06em 0 0 #e9436f,
      0.05em -0.02em 0 #09f7a0;
  }

  6%,
  6.01% {
    text-shadow:
      0.06em 0 0 #e9436f,
      -0.07em -0.07em 0 #09f7a0;
  }
  7%,
  7.01%,
  100% {
    text-shadow:
      -0.05em 0 0 #e9436f,
      0.03em -0.04em 0 #09f7a0;
  }
  // 21%,
  // 21.55% {
  //   text-shadow:
  //     -0.07em 0 0 #e9436f,
  //     0.04em 0.02em 0 #09f7a0;
  // }
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
</style>
