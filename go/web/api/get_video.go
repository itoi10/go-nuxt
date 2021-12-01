/*
	動画情報取得

	YouTube API 実行コスト (1日上限 10000)
	videos list	1
*/
package api

import (
	"firebase.google.com/go/auth"
	"github.com/itoi10/go-nuxt/middlewares"
	"github.com/itoi10/go-nuxt/models"
	"github.com/labstack/echo"
	"github.com/sirupsen/logrus"
	"github.com/valyala/fasthttp"
	"google.golang.org/api/youtube/v3"
)

type VideoResponce struct {
	VideoList  *youtube.VideoListResponse `json:"video_list"`
	IsFavorite bool                       `json:"is_favorite"` // 動画をすでにお気に入りに登録しているかどうか
}

func GetVideo() echo.HandlerFunc {
	return func(c echo.Context) error {
		// echo.Contextからmiddlewareで設定したインスタンス等を取得
		yts := c.Get("yts").(*youtube.Service)
		dbs := c.Get("dbs").(*middlewares.DatabaseClient)
		token := c.Get("auth").(*auth.Token)

		// リクエストパラメータからid取得
		videoId := c.Param("id")

		isFavorite := false
		if token != nil {
			favorite := models.Favorite{}
			isFavoriteNotFound := dbs.DB.Table("favorites").
				Joins("INNER JOIN users ON users.id = favorites.user_id").
				Where(models.User{UID: token.UID}).
				Where(models.Favorite{VideoId: videoId}).
				First(&favorite).
				RecordNotFound()

			logrus.Debug("isFavoriteNotFound: ", isFavoriteNotFound)
			if !isFavoriteNotFound {
				isFavorite = true
			}
		}

		// YouTube API コール
		call := yts.Videos.List([]string{"id", "snippet"}).Id(videoId)
		res, err := call.Do()
		if err != nil {
			logrus.Fatalf("Error calling Youtube API: %v", err)
		}
		// APIのレスポンスをVideoResponse構造体に詰めてフロントに返す
		v := VideoResponce{
			VideoList:  res,
			IsFavorite: isFavorite,
		}
		return c.JSON(fasthttp.StatusOK, v)
	}
}
