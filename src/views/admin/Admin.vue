<template>
  <main class="admin-login">
    <LoginCreateForm @update-fields="updateFields"/>
  </main>
</template>

<script>
import LoginCreateForm from "@/components/LoginCreateForm";

export default {
  name: "Admin",
  components: {
    LoginCreateForm
  },
  methods: {
    updateFields(obj) {
      console.log(obj);
    }
  }
}
</script>
