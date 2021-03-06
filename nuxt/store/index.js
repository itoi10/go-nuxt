// ストアを定義

import firebase from "../plugins/firebase";
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
  // お気に入り動画リスト
  favoriteItems: [],
  // アカウント登録用
  token: '',
})

export const actions = {
  // 人気動画リスト取得
  async fetchPopularVideos({commit}, payload) {
    console.log("dispatch [fetchPopularVideos]")

    // APIをリクエストするためのリクエストクライアント生成
    const client = createRequestClient(this.$axios, this.$cookies, this)
    // GETリクエスト送信
    const res = await client.get(payload.uri, payload.params)
    // APIのレスポンスをcommitに渡す
    commit('mutatePopularVideos', res)
  },

  // 動画情報取得
  async findVideo({commit}, payload) {
    console.log("dispatch [findVideo]")

    const client = createRequestClient(this.$axios, this.$cookies, this)
    const res = await client.get(payload.uri)
    const params = {
      ...res.video_list,
    }
    // お気に入り
    params.isFavorite = res.is_favorite || false

    commit('mutateVideo', params)
  },

  // 関連動画取得
  async fetchRelatedVideos({commit}, payload) {
    console.log("dispatch [fetchRelatedVideos]")

    const client = createRequestClient(this.$axios, this.$cookies, this)
    const res = await client.get(payload.uri)
    commit('mutateRelatedVideos', res)
  },

  // 動画検索
  async searchVideos({commit}, payload) {
    console.log("dispatch [searchVideos]")

    const client = createRequestClient(this.$axios, this.$cookies, this)
    const res = await client.get(payload.uri, payload.params)
    commit('mutateSearchVideos', res)
  },

  // サインアップ
  async signUp({commit, dispatch}, payload) {
    // メールアドレスとパスワードを引数にして、アカウント作成
    await firebase.auth().createUserWithEmailAndPassword(
      payload.email, payload.password
    )
    // ログイン
    const res = await firebase.auth().signInWithEmailAndPassword(
      payload.email,
      payload.password
    )
    // サーバサイドでユーザ認証にJWTを使用するためトークン取得
    const token = await res.user.getIdToken()
    // トークンをCookieに保存
    this.$cookies.set('jwt_token', token)

    // cookieにリフレッシュトークン保存
    const refresh_token = res.user.refreshToken
    this.$cookies.set('refresh_token', refresh_token)

    // トークンをstoreに保存
    commit('mutateToken', token)
    // トップページに遷移
    this.app.router.push('/')
  },

  async setToken({commit}, payload) {
    this.$cookies.set('jwt_token', payload)
    commit('mutateToken', payload)
  },

  // ログイン
  async login({commit, dispatch}, payload) {
    // ログイン実行
    const res = await firebase.auth().signInWithEmailAndPassword(
      payload.email,
      payload.password
    )
    // トークンをCookieとstateに保存
    const token = await res.user.getIdToken()
    console.log('login action: ' + token)
    this.$cookies.set('jwt_token', token)

    const refresh_token = res.user.refreshToken
    this.$cookies.set('refresh_token', refresh_token)

    commit('mutateToken', token)
    // トップページに遷移
    this.app.router.push('/')
  },

  // ログアウト
  async logout({commit}) {
    // ログアウト実行
    await firebase.auth().signOut()
    // Cookieとstateからトークンをクリア
    commit('mutateToken', null)
    this.$cookies.remove('jwt_token')
    // トップページに遷移
    this.app.router.push('/')
  },

  // お気に入り追加・削除
  async toggleFavorite({commit}, payload) {
    const client = createRequestClient(this.$axios, this.$cookies, this)
    const res = await client.post(payload.uri)
    commit('mutateToggleFavorite', res.is_favorite)
  },

  // お気に入り動画リスト取得
  async fetchFavoriteVideos({commit}, payload) {
    console.log("action: fetchFavoriteVideos")
    const client = createRequestClient(this.$axios, this.$cookies, this)
    const res = await client.get(payload.uri)
    commit('mutateFavoriteVideos', res)
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
    params.isFavorite = payload.isFavorite || false
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

  mutateToken(state, payload) {
    state.token = payload
    console.log('state.token: ' + state.token)
  },

  mutateToggleFavorite(state, payload) {
    state.item.isFavorite = payload
  },

  mutateFavoriteVideos(state, payload) {
    state.favoriteItems = payload.items || []
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
  // ログイン状態か？
  isLoggedIn(state) {
    return !!state.token
  },
  getFavoriteVideos(state) {
    return state.favoriteItems
  }
}