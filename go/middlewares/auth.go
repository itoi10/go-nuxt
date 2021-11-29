package middlewares

import (
	"context"
	"strings"

	"firebase.google.com/go/auth"
	"github.com/labstack/echo"
	"github.com/valyala/fasthttp"
)

func verifyFirebaseIDToken(ctx echo.Context, auth *auth.Client) (*auth.Token, error) {
	// コンテキストに登録した*auth.Client取得
	headerAuth := ctx.Request().Header.Get("Authorization")
	// リクエストのヘッダからトークン取得
	token := strings.Replace(headerAuth, "Bearer ", "", 1)
	// トークン検証
	jwtToken, err := auth.VerifyIDToken(context.Background(), token)
	return jwtToken, err
}

func FirebaseGuard() echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			authClient := c.Get("firebase").(*auth.Client)
			jwtToken, err := verifyFirebaseIDToken(c, authClient)
			if err != nil {
				return c.JSON(fasthttp.StatusUnauthorized, "Not Authenticated")
			}
			// 検証後, *auth.Tokenをコンテキストに保存
			c.Set("auth", jwtToken)

			if err := next(c); err != nil {
				return err
			}
			return nil
		}
	}
}

func FirebaseAuth() echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			authClient := c.Get("firebase").(*auth.Client)
			jwtToken, _ := verifyFirebaseIDToken(c, authClient)
			c.Set("auth", jwtToken)
			if err := next(c); err != nil {
				return err
			}
			return nil
		}
	}
}
