package databases

import (
	"os"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
	"github.com/joho/godotenv"
	"github.com/sirupsen/logrus"
)

func Connect() (db *gorm.DB, err error) {
	// envファイル読込
	err = godotenv.Load()
	if err != nil {
		logrus.Fatal("Error loading .env file")
	}

	// docker-compose.ymlに設定した接続情報を使用する。
	// DB_HOSTはlocalhostを設定する
	datasource := os.Getenv("DB_USERNAME") + ":" + os.Getenv("DB_PASSWORD") +
		"@tcp(" + os.Getenv("DB_HOST") + ":" + os.Getenv("DB_PORT") + ")/" +
		os.Getenv("DB_DATABASE") + "?charset=utf8mb4&parseTime=True&loc=Local"

	db, err = gorm.Open("mysql", datasource)
	if err != nil {
		logrus.Fatal(err)
	}

	return db, err
}
