<template>
  <div>
    <MainSection title="Home" :loading="loading">
      <Head>
        <Title>Search</Title>
      </Head>

      <TweetListFeed :tweets="searchTweets" />
    </MainSection>
  </div>
</template>
<script setup>
const { getTweets } = useTweets();

const loading = ref(false);
const searchTweets = ref([]);

watch(() => useRoute().fullPath, () => getTweet());

const { useAuthUser } = useAuth();
const user = useAuthUser();

onBeforeMount(() => {
  getTweet();
});

async function getTweet() {
  const searchQuery = useRoute().query.s;
  
  loading.value = true;

  try {
    const { tweets } = await getTweets({
      query: searchQuery,
    });

    searchTweets.value = tweets;
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
}

function handleFormSuccess(tweet) {
  navigateTo(`/status/${tweet.id}`, {
    external: true
  });
}
</script>
