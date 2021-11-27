/*
	動画を取得するアクションを定義するファイル
*/
package api

import (
	"github.com/labstack/echo"
	"github.com/sirupsen/logrus"
	"github.com/valyala/fasthttp"
	"google.golang.org/api/youtube/v3"
)

// YouTube APIを使って人気動画を取得する処理
func FetchMostPopularVideos() echo.HandlerFunc {
	return func(c echo.Context) error {
		// middlewaresのyoutube.Serviceを使う
		yts := c.Get("yts").(*youtube.Service)

		// API実行条件設定
		// https://developers.google.com/youtube/v3/docs/videos/list?hl=ja
		call := yts.Videos.List([]string{"id", "snippet"}).Chart("mostPopular").MaxResults(3)

		// リクエストのパラメータにpageTokenが設定されている場合はYouTube APIコール時にpageToken使用
		pageToken := c.QueryParam("pageToken")
		if len(pageToken) > 0 {
			call = call.PageToken(pageToken)
		}

		// API実行
		res, err := call.Do()
		if err != nil {
			logrus.Fatalf("Error calling Youtube API: %v", err)
		}
		// APIから取得したJSONを返す
		return c.JSON(fasthttp.StatusOK, res)
	}
}
