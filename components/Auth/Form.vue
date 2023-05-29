<template>
  <div>
    <div class="pt-5 space-y-6">
      <UIInput
        v-model="data.username"
        label="Username"
        placeholder="Username"
      ></UIInput>
      <UIInput
        v-model="data.password"
        label="Password"
        placeholder="********"
        type="password"
      ></UIInput>
      <UIButton @click="handleLogin" liquid :disabled="isButtonDisabled">
        <div v-if="data.loading" class="flex items-center justify-center w-5 h-5">
          <UISpinner />
        </div>
        <span v-else>Login</span>
      </UIButton>
    </div>
  </div>
</template>
<script setup>
const data = reactive({
  username: "",
  password: "",
  loading: false,
});

async function handleLogin() {
  const { login } = useAuth();

  data.loading = true;

  try {
    await login({
      username: data.username,
      password: data.password,
    });
  } catch (error) {
    console.log(error);
  } finally {
    data.loading = false;
  }
}

const isButtonDisabled = computed(() => {
    return (!data.username || !data.password) || data.loading
})

</script>
