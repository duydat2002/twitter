<template>
  <div>
    <MainSection title="Tweet" :loading="loading">
      <Head>
        <Title>Tweet {{tweet.id}}</Title>
      </Head>

      <TweetDetail :tweet="tweet" :user="user" />
    </MainSection>
  </div>
</template>
<script setup>
const { getTweetById } = useTweets();
const { useAuthUser } = useAuth();

const loading = ref(false);
const tweet = ref(null);
const user = useAuthUser();

watch(() => useRoute().fullPath, () => getTweet());

function getTweetIdFromRoute() {
  return useRoute().params.id;
}

async function getTweet() {
  loading.value = true;
  try {
    const response = await getTweetById(getTweetIdFromRoute());

    tweet.value = response.tweet;
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
}

onBeforeMount(() => {
  getTweet();
});
</script>
