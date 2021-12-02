<template>
  <div class="section">
    <div class="columns">
      <div class="column is-full">
        <div class="block video-player">
          <!-- vue-youtube $routeオブジェクトを使用しid取得 -->
          <youtube
            :video-id="this.$route.params.id"
            ref="youtube"
          />
        </div>

        <div class="box description">
          <p>
            <span class="title is-4">{{ item.snippet.title }}</span>
          </p>

          <div class="level">
            <div class="level-left">
              {{ item.snippet.channelTitle }}
              <br/>
              {{ item.snippet.publishedAt }}
            </div>
            <!-- お気に入り -->
            <div v-if="isLoggedIn" class="level-right">
              <a href="#" @click.prevent="toggleFavorite">
                <span class="icon is-large">
                  <span class="fa-stack fa-lg">
                    <i class="fas fa-heart fa-stack-1x"
                      :class="[item.isFavorite ? 'active' : 'has-text-grey-light']"
                    ></i>
                  </span>
                </span>
              </a>
            </div>
          </div>

          <hr/>
          <p>{{ item.snippet.description }}</p>
        </div>
      </div>


    </div>
  </div>
</template>

<script>
  import ROUTES from '../../routes/api'

  export default {
    computed: {
      item() {
        return this.$store.getters.getVideo
      },
      // 関連動画
      relatedItems() {
        return this.$store.getters.getRelatedVideos
      },
      // ログイン中か
      isLoggedIn() {
        return this.$store.getters.isLoggedIn
      }
    },

    methods: {
      async toggleFavorite() {
        await this.$store.dispatch('toggleFavorite', {
          uri: ROUTES.POST.TOGGLE_FAVORITE.replace(':id', this.$route.params.id)
        })
      }
    },

    async fetch({store, route}) {
      await store.dispatch('findVideo', {
        uri: ROUTES.GET.VIDEO.replace(':id', route.params.id),
      }),
      await store.dispatch('fetchRelatedVideos', {
        uri: ROUTES.GET.RELATED.replace(':id', route.params.id),
      })
    }
  }
</script>

<style>
  iframe {
    width: 100%;
    height: 500px;
  }

  .video-player {
    max-width: 880px;
  }

  .description {
    max-width: 880px;
  }

  .fa-heart.active {
    color: #FF1493;
  }

</style>