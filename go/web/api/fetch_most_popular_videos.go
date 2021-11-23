/*
	動画を取得するアクションを定義するファイル
*/
package api

import (
	"github.com/labstack/echo"
	"github.com/valyala/fasthttp"
)

// YouTube APIを使って動画を取得する処理を実装する
func FetchMostPopularVideos() echo.HandlerFunc {
	return func(c echo.Context) error {
		// ステータス200でJSONを返す
		return c.JSON(fasthttp.StatusOK, "Hello World!")
	}
}
