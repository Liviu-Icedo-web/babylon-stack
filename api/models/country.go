package models

import (	
	"gopkg.in/mgo.v2/bson"
)

type Country struct {
	ID 					bson.ObjectId  `bson:"_id,omitempty"` 
	Language 			string `json:"languages"`
	Country				string `json:"country"`
	Country_id			int `json:"country_id"`		
	Capital				string `json:"capital"`	
	Currency_name 		string `json:"currency_name"`
	Currency_symbol		string `json:"currency_symbol"`
	Currency_code		string `json:"currency_code"`
	Iso 				string `json:"iso"`
} 