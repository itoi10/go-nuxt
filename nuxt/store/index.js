// ストアを定義

import { createRequestClient } from "./request-client";

export const state = () => ({
  items: [],
  meta: {},
})

export const actions = {
  async fetchPopularVideos({commit}, payload) {
    // APIをリクエストするためのリクエストクライアント生成
    const client = createRequestClient(this.$axios) //#
    // GETリクエスト送信
    const res = await client.get(payload.uri, payload.params)
    // APIのレスポンスをcommitに渡す
    commit('mutatePopularVideos', res)
  },
}

export const mutations = {
  mutatePopularVideos(state, payload) {
    // ステートにAPIのレスポンスを設定.            新しいitemsを連結
    state.items = payload.items ? state.items.concat(payload.items) : []
    state.meta = payload
  }
}

// Vueコンポーネントからステートを参照するためのgetter
export const getters = {
  getPopularVideos(state) {
    return state.items
  }
}