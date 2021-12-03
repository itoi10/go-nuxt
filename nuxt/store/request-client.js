
// トークン取得のリクエスト送信時に使用
import qs from 'qs'

import { firebaseConfig } from '~/plugins/firebaseConfig'

// リクエストを送信するクライアント
// リクエスト送信にはaxiosを使用するが直接呼び出さずラップする

export class RequestClient {
  constructor(axios, cookies, store) {
    this.axios = axios
    this.cookies = cookies
    this.store = store
    this.hasRetried = false
  }

  // GETリクエスト送信で使用するgetメソッド定義
  async get (uri, params={}) {
    // 引数のparamsからクエリ文字列を生成
    const queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&')
    const query = queryString.length > 0 ? `${uri}?${queryString}` : uri
    console.log("query: " + query)
    return await this.axios.$get(query)
      .catch(err => {
        return this.retry(err)
      })
  }

    // POST送信
    async post(uri) {
      return await this.axios.$post(uri)
        .catch(err => {
          return this.retry(err)
        })
    }

    // アクセストークン有効期限は１時間だが、切れた時はトークン再取得を試みるようにする。
    // 処理の流れは以下となる
    // 1. (nuxt) goにリクエスト送信
    // 2. (go)   トークン期限切れの場合401を返す
    // 3. (nuxt) リフレッシュトークンを使ってトークン再取得
    // 4. (nuxt) 新しいトークンでAPIリトライ
    // 5. (go)   新しいトークンを検証し結果返却

    // リクエスト失敗した時にretry実行
    async retry(err) {
      const code = parseInt(err.response && err.response.status)
      // cookieからリフレッシュトークン取得
      const refreshToken = this.cookies.get('refresh_token') || null

      // 認証失敗 && リフレッシュトークンあり && 1回目のリトライ
      if (code === 401 && refreshToken && this.hasRetried === false) {
        this.hasRetried = true
        if (refreshToken) {
          const data = {
            'grant_type': 'refresh_token',
            'refresh_token': refreshToken
          }
          // Firebase Auth REST APIを使用しトークン再取得
          // https://firebase.google.com/docs/reference/rest/auth#section-api-usage
          const res = await this.axios.$request({
            method: 'POST',
            headers: {'content-type': 'application/x-www-form-urlencoded'},
            data: qs.stringify(data),
            url: 'https://securetoken.googleapis.com/v1/token?key=' + firebaseConfig.apiKey
          })
          // 取得したトークンを保存
          this.store.dispatch('setToken', res.id_token)

          // リトライ
          return await this.axios.$request({
            method: err.response.config.method,
            headers: {'Authorization': `Bearer ${res.id_token}`},
            url: err.response.config.url,
            data: err.response.config.data
          })
        }

      }
    }
}

// RequestClientインスタンス生成に使う関数
export function createRequestClient(axios, cookies, store) {
  return new RequestClient(axios, cookies, store)
}