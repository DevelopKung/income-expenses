<template>
<div>
  logout
</div>
</template>

<script>
export default {
  layout: 'blank',
  created() {
    this.$auth.logout()
    this.$router.replace('/')
  },
}
</script>

<style lang="scss" scoped>

</style>
