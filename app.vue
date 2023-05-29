<template>
  <div :class="{ dark: darkMode }">
    <div class="bg-white dark:bg-dim-900">
      <!-- App -->
      <LoadingPage v-if="isAuthLoading" />

      <div v-else-if="user" class="min-h-full">
        <div
          class="grid grid-cols-12 mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:gap-5"
        >
          <!-- Left sidebar -->
          <div class="sticky top-0 h-screen overflow-hidden hidden md:block xs:col-span-1 xl:col-span-2">
            <div class="h-screen overflow-y-auto hide-scrollbar sticky top-0">
              <SidebarLeft :user="user" @on-tweet="handleOpenTweetModal" @on-logout="handleLogout"/>
            </div>
          </div>
          <!-- Main content -->
          <main class="col-span-12 md:col-span-8 xl:col-span-6">
            <router-view />
          </main>
          <!-- Right sidebar -->
          <div class="hidden md:block xl:col-span-4 md:col-span-3">
            <div class="stiky top-0">
              <SidebarRight />
            </div>
          </div>
        </div>
      </div>

      <AuthPage v-else />
      <UIModal :isOpen="postTweetModal" @on-close="handleModalClose">
        <TweetForm :replyTo="replyTweet" show-reply :user="user" @onSuccess="handleFormSuccess" />
      </UIModal>
    </div>
  </div>
</template>

<script setup>
const darkMode = ref(false);

const emitter = useEmitter();

const { useAuthUser, initAuth, useAuthLoading, logout } = useAuth();
const isAuthLoading = useAuthLoading();
const user = useAuthUser();

const { closePostTweetModal, usePostTweetModal, openPostTweetModal, useReplyTweet } =
  useTweets();
const postTweetModal = usePostTweetModal();
const replyTweet = useReplyTweet();

emitter.$on('replyTweet', (tweet) => {
  openPostTweetModal(tweet);
})

emitter.$on('toggleDarkMode', () => {
  darkMode.value = !darkMode.value;
})

function handleFormSuccess(tweet) {
  closePostTweetModal();

  navigateTo(`/status/${tweet.id}`, {
    external: true
  });
}

function handleOpenTweetModal() {
  openPostTweetModal(null);
}

function handleModalClose() {
  closePostTweetModal();
}

function handleLogout() {
  logout();
}

onBeforeMount(() => {
  initAuth();
});
</script>
<style scoped>
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>