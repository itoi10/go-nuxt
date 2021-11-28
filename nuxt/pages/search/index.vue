<template>
  <section class="section">
    <div class="container">

      <div class="block">
        <div class="block video-block" v-for="(item, key) in items" :key="key">
          <AppVideo
            :item="item"
            :video-id="item.id.videoId"
          />
        </div>

        <div class="block">
          <nav class="pagination">
            <a href.prevent="#" class="pagination-next" @click="loadMore">
              More
            </a>
          </nav>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import ROUTES from '../../routes/api'
  import AppVideo from '../../components/AppVideo'

  export default {
    components: {
      AppVideo
    },

    computed: {
      items() {
        return this.$store.getters.getSearchVideos
      },
      nextPageToken() {
        return this.$store.getters.getSearchMeta.nextPageToken || ""
      },
    },

    methods: {
      // さらに読み込む
      loadMore() {
        const q = encodeURIComponent(this.$route.query.q) || ""
        const payload = {
          uri: ROUTES.GET.SEARCH,
          params: {
            pageToken: this.nextPageToken,
            q
          }
        }
        // 検索アクション。 goから検索結果を取得してstoreに設定
        this.$store.dispatch('searchVideos', payload)
      }
    },

    // 最初に検索結果取得
    async fetch({store, query}) {
      // 検索ワードはURIエンコード
      const q = encodeURIComponent(query.q) || ""
      const payload = {
        uri: ROUTES.GET.SEARCH,
        params: {
          q
        }
      }
      if(store.getters.getSearchVideos && store.getters.getSearchVideos.length > 0) {
        return
      }
      await store.dispatch('searchVideos', payload)
    }
  }
</script>

<style scoped>
  .video-block {
    max-width: 900px;
  }
</style>