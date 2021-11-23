package main

import (
	"github.com/itoi10/go-nuxt/routes"
	"github.com/labstack/echo"
)

func main() {
	// Echoインスタンス生成
	e := echo.New()
	// ルートを設定
	routes.Init(e)
	// 8080ポートでサーバ起動
	e.Logger.Fatal(e.Start("localhost:8080"))
}
