<template>
  <div class="control-wrapper" :style="`background-image: url('${require('../assets/images/271963.webp')}')`">
    <div class="col-50">
      <router-link to="/admin-login">admin</router-link>
    </div>
    <div class="col-50">
      <router-link to="/owner-login">owner</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Control"
}
</script>
