<template>
  <sectoin class="section">
    <div class="container">
      <div class="block">
        <div class="block video-block" v-for="(item, key) in items" :key="key" >
          <AppVideo
            :item="item"
            :video-id="item.id"
          />
        </div>
      </div>

      <div class="block">
        <nav class="pagination">
          <a
            href.prevent="#"
            class="pagination-next"
            @click="loadMore"
          >
            More
          </a>
        </nav>
      </div>
    </div>
  </sectoin>
</template>

<script>
import ROUTES from '../routes/api'
import AppVideo from '../components/AppVideo.vue'

export default {
  components: {
    AppVideo
  },

  computed: {
    // getterを使ってストアから動画一覧取得
    items() {
      const videos = this.$store.getters.getPopularVideos
      console.log('computed[item]: ' + videos)
      return videos
    },
    // ストアからnextPageToken取得
    nextPageToken() {
      const token = this.$store.getters.getMeta.nextPageToken
      console.log('computed[nextPageToken]' + token)
      return token
    },
  },

  methods: {
    loadMore() {
      const payload = {
        uri: ROUTES.GET.POPULARS,
        params: {
          pageToken: this.nextPageToken
        }
      }
      // actionを実行してgoサーバからデータ取得
      this.$store.dispatch('fetchPopularVideos', payload)
    }
  },

  async fetch({store}) {
    const payload = {
      uri: ROUTES.GET.POPULARS
    }

    if (store.getters.getPopularVideos && store.getters.getPopularVideos.length > 0) {
      return
    }

    // Vuexストアのアクションに処理をdispatch
    await store.dispatch('fetchPopularVideos', payload)
  }
}
</script>

<style scoped>
  .video-block {
    max-width: 900px;
  }
</style>