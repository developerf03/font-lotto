<script setup>
// Imports
// import { useProviderStore } from '~/stores/provider'
// import { storeToRefs } from 'pinia'
import flag1 from '~/assets/icons/flags/1.png'
import flag2 from '~/assets/icons/flags/2.png'
import flag3 from '~/assets/icons/flags/3.png'
import flag4 from '~/assets/icons/flags/4.png'
import flag5 from '~/assets/icons/flags/5.png'
import flag6 from '~/assets/icons/flags/6.png'
import logo from '~/assets/images/logo.png'

// Composables
const { user, balance } = useAuth()
const colorMode = useColorMode()
const { handleLoginModal, handleRegisterModal, handleLanguageModal } = useModals()

// Stores
// const { providers } = storeToRefs(useProviderStore())

// Functions
const handleThemeChange = (theme) => {
  colorMode.preference = theme
}

const mockup = [
  {
    name: 'ดูผลหวยรัฐบาลไทย',
    flag: flag1,
    background:
      'https://s3-alpha-sig.figma.com/img/204d/e726/3a1c86e963b5a2251a80867ab95bae88?Expires=1730678400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=gDAlj9zwPVJgOEyN1C27tOXjoiJC~Lo1EMfT-1djCQmoEdcEFpFC7yFd1aHfH~w7kKnvBSESSxE4ONtqkkWz0irxLNelVdr46FvBkr192mryubmwN4XCbhlqZM1orT17O3qVFin5aIhke87zN3dJRyGmQ6HnCjfTw0CVh8hiw8nPUPTwhVToiurkCjW5CpQoroDjFOP2WsnB7ENc6PSZ~3QhVAezdD~Thw1PWtRhrLbUPZmnpi9ZL4XIndLRUOcz266YlTSy7QE2ZzlFLrI2mFKaPqb7eewek3OkWx-Geb1Qyi6s4Jjy5jac8DViajRa9rkCFdw~LmuQezV7SpAxwA__',
  },
  {
    name: 'ดูผลหวยออมสิน',
    flag: flag2,
    background:
      'https://s3-alpha-sig.figma.com/img/d35e/1773/d0055d23f354770c1f74343d751ad7e0?Expires=1730678400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hqRG0fW3W3ggWS3lXj5WQSTC733cJbIRbDeDzUrhSuw3GdDCB8nBFcz3JTY0A9DC-lRoxw3HnZl711HzGW8iY6y6RpE14VK9REOhr0EJiaoS2USH-GQKvvasVEJiB43jy8iw1n5hYG6swEsR0N2flNNrJexCbv0NG~J5q7ZHfNGsBnmva0LzxCoV8OBERdW-rXa7DgSjDjNzfh669GmkZ8NE5tFmY6juiUlPwwe46N8x4SGwV0kMk6nbU3s~pKFPkuHrkZuo~AFCWGJ8agyGaU0scfR9EBTOFrtPQjNcaH6Z-FakCS-MD3-qFBzl4hJVcuVZP0YuPfbE8dgFqTOd9A__',
  },
  {
    name: 'ดูผลหวยหุ้นไทย',
    flag: flag3,
    background:
      'https://s3-alpha-sig.figma.com/img/ec00/1236/ee41c23037d8b85c415110a067659718?Expires=1730678400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ljXbCL8HJ~mXfLq-zRS4URutetmRct4oJbS-TwxC~G-8sRqfLz9JAbCz4uVsNkp6o0bo1kmLZhek3Ay1QBAHEj4l3Dr1Mqbched5C~Vaxeedd2o7EbKphB1mskjlZWsDaiJV4eExvYfPGtc08BRQNsNCEo~2M6iAZ43bDAsSDey0dq5byDDdubnAAlgEbIFcEGkF7YWx5ZbDU6nt1C0G~ncq8FtIuH2lg2S89QfkmJJgHcFO70nsXRSHr2UlXCq71e1DC5KFKhEEkx1q9gcQjlsddcCkbcaW9PZqekGahFDI-rAnff8tDRCiYmgjwk5-BWhsuWsDKAhzsqN7KLUcYA__',
  },
  {
    name: 'ดูผลหวยหุ้นต่างประเทศ',
    flag: flag4,
    background:
      'https://s3-alpha-sig.figma.com/img/84bd/11e3/0599867e437c35656c754b860400e04e?Expires=1730678400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=eXsNbpgkby1mi7ycEX7-gHGiM8rqEJEynDSM5FpoGt-UMorgiZ6a9HU5E20rcyLGDvlfT0S4JE01KNpuWCEyHLaZIJwWyVtccKuJbdpK1-c4A3i0nDYSyLq1rBUrg-~fdnMJ1ObwVEvgzp7pwv0SjO40Mo2odxu4xzfkDRobukP1voyPfHBYAONuJAobW1HnoGucWxe59ApaMrii0qLVfdjktem4FvHBP-yop0yyTeRtHnGkhXZ1OXuvUmwWiNdkEvF5NTc4drwhQ6Ml4W0e9Kv54HCuE9GkRHjiB9CdyiowYumKEBqI7y1bnDuaNIqBNnDxtbvnewVQ1xRvWwefRg__',
  },
  {
    name: 'ดูผลหวยเลขชุด',
    flag: flag5,
    background:
      'https://s3-alpha-sig.figma.com/img/5fa6/7212/6262c093f25ad8ccb9f8e641d24d9518?Expires=1730678400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=c8pijBPfm6AbP5nlo~VzIv786mSlPxN0tegseUZKhYHIEqHVYj0havI2ydabmtBm8IZmoUE~A-C8bXEifTKsbHCyBSyRn~vk2x9z3KVXMJEwIzsEUVShy8SoO5hQxTRtlh1vaMeo4sCKhNWhbNZfJmfWmbWXBzR-zZ2Fxt-YWkGwx07KhtYFTFQ8IjZfZ4sIV0F-MhSm5xJEQAtRJk~GBgmWWwJTlPAjBnzAgsJBoaVX44NPCfTafOzh83fqmRCHiAFGF6O0zpXaCdXGzEddYLTYm-TM6Nr6EBQ5FShBE0gP4wKLfze8abuZflivmiWlH6Bt3n2kCgrqv~35MXtFxw__',
  },
  {
    name: 'ดูผลจับยี่กี',
    flag: flag6,
    background:
      'https://s3-alpha-sig.figma.com/img/d6c9/f263/87df969420c8f1da4c664fe3e43bacc5?Expires=1730678400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Qww760pZUJkxX-sQMlEiC1enFVpADytKwSOXCuuAKMt9qfOfPN9lsClno616FLze5kQ2W4Qp7loqx1T5VNBHjNq5V7x6BF3ymNxcwwwssOsA~qoGtPYTL4-Q9lRvRfFJMafhjtg05jRBxK1Gda6~xVSfLvsp12zZqYk5Yup9djfyP4J30P0zDrTNBnCHY0gwudNJHWuo8GowZqSPbFoaC05F4VgypBr7DpTRcKyGYk~7L5x2qB-q9fK4JGKmoGxCPqnp4qq1FblUaBVSysu9AYgldF3MND8trmmnM-ZhHHPoA9e0X2Ht-XnnQKb1Lcjcis3TVX97T0qFpptQSukczQ__',
  },
]
</script>

<template>
  <div
    class="home-menu-wrapper w-full bg-[var(--card-primary)] text-[var(--font-primary)] rounded-[20px] px-4 py-[14px] flex flex-col items-center sm:(p-5) 2xl:px-8 mlg:rounded-[60px]"
  >
    <!-- LOGO -->
    <img :src="logo" alt="logo" srcset="" class="h-[69px] mb-4 mx-auto hidden mlg:block" >
    <!-- WALLET AND PROFILE -->
    <div
      v-if="user"
      class="w-full flex-col gap-4 pb-4 mb-4 border-b border-b-solid border-b-[var(--color-100)] hidden mlg:flex"
    >
      <HomeMenuUser :phone="user?.player?.phone" />
      <HomeMenuWallet :balance="balance" />
    </div>

    <!-- BUTTON => LOGIN / REGISTER -->
    <div
      v-else
      class="w-full flex-col gap-4 pb-4 mb-4 border-b border-b-solid border-b-[var(--color-100)] hidden mlg:flex"
    >
      <UButton :label="t('login')" variant="outline" size="lg" @click="handleLoginModal(true)" />
      <UButton
        :label="t('register')"
        variant="solid"
        size="lg"
        @click="handleRegisterModal(true)"
      />
    </div>

    <!-- LAUNCHER -->
    <div class="w-full gap-3 flex flex-col sm:(grid grid-cols-2) mlg:(flex flex-col)">
      <!-- <HomeMenuItem
        v-for="item in providers"
        :key="item?.description"
        :title="item?.lang?.[locale] || item?.description"
        :icon="flag1"
        :background="item?.images?.['dark']?.url"
      /> -->
      <HomeMenuItem
        v-for="(item, index) in mockup"
        :key="index"
        :name="item?.name"
        :icon="item?.flag"
        :background="item?.background"
      />
    </div>

    <!-- LANGUAGE AND THEME -->
    <div class="w-full h-6 my-auto divide-x-1 hidden mlg:flex">
      <!-- <div class="flex-1 flex items-center justify-center gap-4">
        <span class="cursor-pointer" @click="setLocale('th')">TH</span>
        <span class="cursor-pointer" @click="setLocale('en')">EN</span>
        <span class="cursor-pointer" @click="setLocale('vi')">VI</span>
      </div> -->
      <div class="flex-1 flex items-center justify-center gap-4">
        <span class="cursor-pointer" @click="handleThemeChange('dark')">Dark</span>
        <span class="cursor-pointer" @click="handleThemeChange('light')">Light</span>
      </div>
    </div>

    <div class="cursor-pointer text-lg" @click="handleLanguageModal(true)">Language Modal</div>
  </div>
</template>
