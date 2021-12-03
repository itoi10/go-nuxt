# Go 言語テスト

## Go (Docker) 起動方法

docker-compose.yml のあるディレクトリで実行

```
起動
$ docker-compose up -d --build

終了
$ docker-compose down
```

Go コンテナ入り方

```
$ docker-compose exec go sh

テーブル作成
# go run tools/migration.go

サーバ起動
# go run server.go
```

DB コンテナ入り方

```
$ docker-compose exec db bash

テーブル確認

# mysql -u root -p
pass

mysql> use youtube
mysql> desc users;

```

env_temp ファイルを.env ファイルに名前を変更して環境変数設定

```
# YouTube APIキー
API_KEY=hoge

# FIREBASE
KEY_JSON_PATH=hoge
PROJECT_ID=hoge
```

エンドポイントにアクセスすると YouTube API から取得した結果が返される

人気動画リスト

```
curl -XGET http://localhost:8080/api/popular
```

任意の動画情報

```
curl -XGET http://localhost:8080/api/video/<任意の動画ID>
curl -XGET http://localhost:8080/api/video/jNQXAC9IVRw
```

関連動画取得

```
curl -XGET http://localhost:8080/api/related/jNQXAC9IVRw
```

## Nuxt 起動方法

package.json のあるディレクトリで実行

```
$ yarn install

$ yarn dev
```

## 参考

寺田 晃大『Nuxt と Go ではじめる Web アプリ開発』 インプレス R&D, 2019

https://nextpublishing.jp/book/11180.html
