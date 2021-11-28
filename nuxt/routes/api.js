
export const ROUTES = {
  GET: {
    // トップページが表示された時にストアのアクションを呼び出す処理
    POPULARS: '/api/popular',
    // 動画情報取得
    VIDEO: '/api/video/:id',
    // 関連動画取得
    RELATED: '/api/related/:id',
    // 検索
    SEARCH: '/api/search',
  }
};

export default ROUTES