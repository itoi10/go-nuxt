package models

import "time"

type User struct {
	ID uint `gorm:"primary_key"`
	// API内部で使用する情報なのでJSONレスポンスには含めない
	UID       string    `json:"-"`
	CreatedAt time.Time `json:"-"`
	UpdatedAt time.Time `json:"-"`
	DeletedAt time.Time `json:"-"`

	// 1:N
	Favorite []Favorite
}
