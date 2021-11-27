/*
	＊youtube.Service生成
	*youTube.Serviceを生成してEchoのコンテキストにインスタンスを登録しておく。
	使用する際はコンテキストから取得するようにする
*/

package middlewares

import (
	"context"
	"os"

	"github.com/labstack/echo"
	"github.com/sirupsen/logrus"
	"google.golang.org/api/option"
	"google.golang.org/api/youtube/v3"
)

// middlewareはecho.HandlerFuncを返す関数を作る

// How to write a custom middleware?
// https://echo.labstack.com/cookbook/middleware/

func YouTubeService() echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			key := os.Getenv("API_KEY")

			ctx := context.Background()
			service, err := youtube.NewService(ctx, option.WithAPIKey(key))
			if err != nil {
				logrus.Fatalf("Error creating YouTube service: %v", err)
			}

			// ytsという名前でコンテキストにサービス設定
			c.Set("yts", service)

			if err := next(c); err != nil {
				return err
			}

			return nil
		}
	}
}
