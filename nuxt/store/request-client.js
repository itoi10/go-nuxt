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
    return await this.axios.$get(query)
  }
}

// RequestClientインスタンス生成に使う関数
export function createRequestClient(axios) {
  return new RequestClient(axios)
}