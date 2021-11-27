/*
	ルーティングを設定するファイル
*/

package routes

import (
	"github.com/itoi10/go-nuxt/web/api"
	"github.com/labstack/echo"
)

func Init(e *echo.Echo) {
	// このブロック内で定義するエンドポイントは接頭辞として/apiが付与される
	g := e.Group("/api")
	{
		// /api/popularにアクセスすることでこの関数が返すJSONを表示できる
		// curl -XGET http://localhost:8080/api/popular
		g.GET("/popular", api.FetchMostPopularVideos())

		// 動画情報取得                                 動画ID
		// curl -XGET http://localhost:8080/api/video/jNQXAC9IVRw
		g.GET("/video/:id", api.GetVideo())

		// 関連動画取得
		// curl -XGET http://localhost:8080/api/related/jNQXAC9IVRw
		g.GET("/related/:id", api.FetchRelatedVideos())

		// 動画検索
		// curl -XGET 'http://localhost:8080/api/search?q=searchword'
		g.GET("/search", api.SearchVideos())
	}
}
