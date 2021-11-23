# Go 言語テスト

## 起動

.env ファイルに YouTubeAPI 設定

```
API_KEY=<YouTube API key>
```

サーバ起動

```golang
go run server.go
```

エンドポイントにアクセス

CURL コマンド

```
curl -XGET http://localhost:8080/api/popular
```

またはブラウザで開く

```
http://localhost:8080/api/popular
```

YouTube API から取得した結果が返される

```json
{
  "etag": "12345...",
  "items": [
    {
      ...

```

## 参考

寺田 晃大『Nuxt と Go ではじめる Web アプリ開発』 インプレス R&D, 2019

https://nextpublishing.jp/book/11180.html
