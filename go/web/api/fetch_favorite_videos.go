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

// お気に入り動画一覧取得
func FetchFavoriteVideos() echo.HandlerFunc {
	return func(c echo.Context) error {
		dbs := c.Get("dbs").(*middlewares.DatabaseClient)
		token := c.Get("auth").(*auth.Token)

		// ログインユーザのお気に入りデータ取得
		user := models.User{}
		dbs.DB.Table("users").Where(models.User{UID: token.UID}).First(&user)
		favorites := []models.Favorite{}
		dbs.DB.Model(&user).Related(&favorites)

		// 動画IDをカンマ区切りにする
		videoIds := ""
		for _, f := range favorites {
			if len(videoIds) == 0 {
				videoIds += f.VideoId
			} else {
				videoIds += "," + f.VideoId
			}
		}

		// APIから動画取得
		yts := c.Get("yts").(*youtube.Service)
		call := yts.Videos.List([]string{"id", "snippet"}).
			Id(videoIds).  // 動画ID指定
			MaxResults(10) // 最大取得数
		res, err := call.Do()
		if err != nil {
			logrus.Fatalf("Error calling Youtube API: %v", err)
		}

		return c.JSON(fasthttp.StatusOK, res)
	}
}
