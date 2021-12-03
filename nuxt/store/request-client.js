// リクエストを送信するクライアント
// リクエスト送信にはaxiosを使用するが直接呼び出さずラップする

export class RequestClient {
  constructor(axios) {
    this.axios = axios
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

    }
}

// RequestClientインスタンス生成に使う関数
export function createRequestClient(axios) {
  return new RequestClient(axios)
}