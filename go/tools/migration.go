package main

import (
	"github.com/itoi10/go-nuxt/databases"
	"github.com/itoi10/go-nuxt/models"
	"github.com/sirupsen/logrus"
)

// models/モデルを使用してマイグレーション実行
// $ go run tools/migration.go

func main() {
	// DB接続
	db, err := databases.Connect()
	defer db.Close()

	if err != nil {
		logrus.Fatal(err)
	}

	// マイグレーション実行
	db.Debug().AutoMigrate(&models.User{})
	db.Debug().AutoMigrate(&models.Favorite{})

	// SQL

	// CREATE TABLE `users` (
	// 	`id` int unsigned AUTO_INCREMENT,
	// 	`uid` varchar(255),
	// 	`created_at` DATETIME NULL,
	// 	`updated_at` DATETIME NULL,
	// 	`deleted_at` DATETIME NULL ,
	// 	PRIMARY KEY (`id`)
	// )

	// CREATE TABLE `favorites` (
	// 	`id` int unsigned AUTO_INCREMENT,
	// 	`user_id` int unsigned,
	// 	`video_id` varchar(255),
	// 	`created_at` DATETIME NULL,
	// 	`updated_at` DATETIME NULL ,
	// 	PRIMARY KEY (`id`)
	// )
}
