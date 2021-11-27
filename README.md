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

エンドポイントにアクセスすると YouTube API から取得した結果が返される

人気動画リスト

```
curl -XGET http://localhost:8080/api/popular
```

任意の動画情報

```
curl -XGET http://localhost:8080/api/video/<任意の動画ID>
curl -XGET http://localhost:8080/api/video/jNQXAC9IVRw&t=17s
```

## 参考

寺田 晃大『Nuxt と Go ではじめる Web アプリ開発』 インプレス R&D, 2019

https://nextpublishing.jp/book/11180.html
