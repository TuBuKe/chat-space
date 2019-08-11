# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|email|string|null: false, unique: true|
|password|string|null: false, unique: true|
|message_id|references|foreign_key: true|

### Association
- has_many :messages
- has_many :chat_groups, through: :users_chat_groups

## chat_groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|message_id|references|null: false, foreign_key: true|

### Association
- has_many :messages
- has_many :users, through: :users_chat_groups

## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|text|null: false|
|image|string|null: false|
|user_id|references|null: false, foreign_key: true|
|chat_group_id|references|null: false, foreign_key: true|

### Association
- belongs_to :chat_group
- belongs_to :user

## users_chat_groupsテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|references|null: false, foreign_key: true|
|chat_groups_id|references|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :chat_group
