// ストアを定義

import { createRequestClient } from "./request-client";

export const state = () => ({
  // 動画リスト
  items: [],
  meta: {},
  // 動画情報
  item: {},
  // 関連動画リスト
  relatedItems: [],
  // 検索動画リスト
  searchItems: [],
  searchMeta: {},
})

export const actions = {
  // 人気動画リスト取得
  async fetchPopularVideos({commit}, payload) {
    console.log("dispatch [fetchPopularVideos]")

    // APIをリクエストするためのリクエストクライアント生成
    const client = createRequestClient(this.$axios)
    // GETリクエスト送信
    const res = await client.get(payload.uri, payload.params)
    // APIのレスポンスをcommitに渡す
    commit('mutatePopularVideos', res)
  },

  // 動画情報取得
  async findVideo({commit}, payload) {
    console.log("dispatch [findVideo]")

    const client = createRequestClient(this.$axios)
    const res = await client.get(payload.uri)
    const params = {
      ...res.video_list,
    }
    commit('mutateVideo', params)
  },

  // 関連動画取得
  async fetchRelatedVideos({commit}, payload) {
    console.log("dispatch [fetchRelatedVideos]")

    const client = createRequestClient(this.$axios)
    const res = await client.get(payload.uri)
    commit('mutateRelatedVideos', res)
  },

  // 動画検索
  async searchVideos({commit}, payload) {
    console.log("dispatch [searchVideos]")

    const client = createRequestClient(this.$axios)
    const res = await client.get(payload.uri, payload.params)
    commit('mutateSearchVideos', res)
  }
}

// stateの値を変更する
export const mutations = {

  mutatePopularVideos(state, payload) {
    // ステートにAPIのレスポンスを設定.            新しいitemsを連結
    state.items = payload.items ? state.items.concat(payload.items) : []
    state.meta = payload
  },

  mutateVideo(state, payload) {
    // payload.itemsがあるなら0番目を設定
    const params = (payload.items && payload.items.length > 0) ? payload.items[0] : {}
    state.item = params
  },

  mutateRelatedVideos(state, payload) {
    state.relatedItems = payload.items || []
  },

  mutateSearchVideos(state, payload) {
    console.log("mutateSearchVideos" + payload.items)

    state.searchItems = payload.items ? state.searchItems.concat(payload.items) : []
    state.searchMeta = payload
  },
}

// Vueコンポーネントからステートを参照するためのgetter
export const getters = {
  getPopularVideos(state) {
    return state.items
  },
  getMeta(state) {
    return state.meta
  },
  getVideo(state) {
    return state.item
  },
  getRelatedVideos(state) {
    return state.relatedItems
  },
  getSearchVideos(state) {
    return state.searchItems
  },
  getSearchMeta(state) {
    return state.searchMeta
  },
}