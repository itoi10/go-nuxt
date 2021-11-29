package middlewares

import (
	"context"
	"os"

	firebase "firebase.google.com/go"
	"github.com/labstack/echo"
	"github.com/sirupsen/logrus"
	"google.golang.org/api/option"
)

func Firebase() echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			// GCPからダウンロードした認証情報JSON
			opt := option.WithCredentialsFile(os.Getenv("KEY_JSON_PATH"))
			// FirebaseプロジェクトID
			config := &firebase.Config{ProjectID: os.Getenv("PROJECT_ID")}
			// 認証情報とプロジェクトIDを使用し*firebase.App生成
			app, err := firebase.NewApp(context.Background(), config, opt)
			if err != nil {
				logrus.Fatalf("Error initializing firebase:%v\n", err)
			}
			auth, err := app.Auth(context.Background())
			if err != nil {
				logrus.Fatalf("Error initializing firebase:%v\n", err)
			}
			c.Set("firebase", auth)
			if err := next(c); err != nil {
				return err
			}
			return nil
		}
	}
}
