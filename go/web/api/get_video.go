/*
	動画情報取得
*/
package api

import (
	"github.com/labstack/echo"
	"github.com/sirupsen/logrus"
	"github.com/valyala/fasthttp"
	"google.golang.org/api/youtube/v3"
)

type VideoResponce struct {
	VideoList *youtube.VideoListResponse `json:"video_list"`
}

func GetVideo() echo.HandlerFunc {
	return func(c echo.Context) error {
		// echo.Contextからyoutube.Service取得
		yts := c.Get("yts").(*youtube.Service)
		// リクエストパラメータからid取得
		videoId := c.Param("id")
		// YouTube API コール
		call := yts.Videos.List([]string{"id", "snippet"}).Id(videoId)
		res, err := call.Do()
		if err != nil {
			logrus.Fatalf("Error calling Youtube API: %v", err)
		}
		// APIのレスポンスをVideoResponse構造体に詰めてフロントに返す
		v := VideoResponce{
			VideoList: res,
		}
		return c.JSON(fasthttp.StatusOK, v)
	}
}
