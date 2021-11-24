<template>
  <sectoin class="section">
    <div class="container">

    </div>
  </sectoin>
</template>

<script lang="ts">
import ROUTES from '..//routes/api'

export default {
  async fetch({store}: any) {
    const payload = {
      uri: ROUTES.GET.POPULARS
    }
    // Vuexストアのアクションに処理をdispatch
    await store.dispatch('fetchPopularVideos', payload)
  }
}
</script>
