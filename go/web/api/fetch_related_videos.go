/*
	関連動画取得

	YouTube API 実行コスト (1日上限 10000)
	search list	100
*/
package api

import (
	"github.com/labstack/echo"
	"github.com/sirupsen/logrus"
	"github.com/valyala/fasthttp"
	"google.golang.org/api/youtube/v3"
)

// 関連動画取得
func FetchRelatedVideos() echo.HandlerFunc {
	return func(c echo.Context) error {
		yts := c.Get("yts").(*youtube.Service)
		// リクエストパラメータ取得
		videoId := c.Param("id")
		// YouTube APIコール
		call := yts.Search.
			List([]string{"id", "snippet"}).
			RelatedToVideoId(videoId).
			Type("video").
			MaxResults(3)
		res, err := call.Do()
		if err != nil {
			logrus.Fatalf("Error calling Youtube API: %v", err)
		}

		return c.JSON(fasthttp.StatusOK, res)
	}
}
