package main

import (
	"github.com/itoi10/go-nuxt/middlewares"
	"github.com/itoi10/go-nuxt/routes"
	"github.com/joho/godotenv"
	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
	"github.com/sirupsen/logrus"
)

// init関数, main関数より先に呼び出される
func init() {
	// Logrus設定 (ログレベル, フォーマット)
	logrus.SetLevel(logrus.DebugLevel)
	logrus.SetFormatter(&logrus.JSONFormatter{})
	// env読込
	err := godotenv.Load()
	if err != nil {
		logrus.Fatal("Error Loading .env")
	}
}

func main() {
	// Echoインスタンス生成
	e := echo.New()

	/* ミドルウェア設定 */
	// ログ出力
	e.Use(middleware.Logger())
	// フロントエンドとドメインが異なるのでアクセスできるようにCORS設定
	e.Use(middleware.CORS())
	// *youtube.Serviceの生成
	e.Use(middlewares.YouTubeService())

	// ルートを設定
	routes.Init(e)

	// 8080ポートでサーバ起動
	e.Logger.Fatal(e.Start("localhost:8080"))
}
