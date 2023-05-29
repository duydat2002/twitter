<template>
  <div>
    <div v-if="isEmptyTweet" class="p-4">
      <p class="text-center text-gray-500">
        No tweet 😢
      </p>
    </div>
    <div
      v-else
      class="pb-4 border-b cursor-pointer hover:bg-gray-100 dark:hover:bg-dim-300"
      :class="twitterBorderColor"
      v-for="tweet in props.tweets"
      :key="tweet.id"
      @click="redirect(tweet)"
    >
      <TweetItem :tweet="tweet" compact/>
    </div>
  </div>
</template>
<script setup>
const { twitterBorderColor } = useTailwindConfig();

const props = defineProps({
  tweets: {
    type: Array,
    required: true,
  },
});

const isEmptyTweet = computed(() => props.tweets.length === 0);

function redirect(tweet) {
  navigateTo(`/status/${tweet.id}`, {
    external: true
  });
}
</script>
