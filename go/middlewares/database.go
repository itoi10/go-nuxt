package middlewares

import (
	"github.com/itoi10/go-nuxt/databases"
	"github.com/jinzhu/gorm"
	"github.com/labstack/echo"
)

type DatabaseClient struct {
	DB *gorm.DB
}

func DatabaseService() echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			session, _ := databases.Connect()
			d := DatabaseClient{DB: session}

			defer d.DB.Close()

			// デバッグ用にSQLをログ出力する
			d.DB.LogMode(true)
			// アクションから使用できるように接続を維持したインスタンスをecho.Contextに登録する
			c.Set("dbs", &d)

			if err := next(c); err != nil {
				return err
			}

			return nil
		}
	}
}
