package handlers

import (
	"babylon-stack/api/dao"
	"babylon-stack/api/models"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"reflect"
	"strconv"

	"github.com/go-resty/resty/v2"
	"github.com/gorilla/mux"
)

// Get ALL Items
func GetAll(data interface{}) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, req *http.Request) {
		payload := dao.GetAll(data)
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(payload)
	})
}

func GetItem(data interface{}) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, req *http.Request) {
		itemID := mux.Vars(req)["id"]
		payload := dao.GetItem(data, itemID)
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(payload)
	})
}

func UpdateItem(data interface{}) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, req *http.Request) {
		itemID := mux.Vars(req)["id"]

		types := reflect.TypeOf(data)
		elem := reflect.New(types).Interface()
		_ = json.NewDecoder(req.Body).Decode(elem)

		payload := dao.UpdateItem(elem, itemID)

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(payload)
	})
}

func AddItem(data interface{}) http.HandlerFunc {

	return http.HandlerFunc(func(w http.ResponseWriter, req *http.Request) {
		types := reflect.TypeOf(data)
		elem := reflect.New(types).Interface()

		_ = json.NewDecoder(req.Body).Decode(&elem)
		dao.AddItem(elem)
		json.NewEncoder(w).Encode(elem)
	})

}

func DeleteItem(data interface{}) http.HandlerFunc {

	return http.HandlerFunc(func(w http.ResponseWriter, req *http.Request) {
		types := reflect.TypeOf(data)
		elem := reflect.New(types).Interface()

		_ = json.NewDecoder(req.Body).Decode(&elem)
		dao.DeleteItem(elem)
	})

}

func GetCurrency(w http.ResponseWriter, req *http.Request) {

	items := mux.Vars(req)
	result := dao.GetCurrencyCountry(items)

	var countries1 models.Country = result[0]
	var countries2 models.Country = result[1]

	currency := countries1.Currency_code + "_" + countries2.Currency_code

	client := resty.New()

	var getdata map[string]interface{}

	resp, err := client.R().
		EnableTrace().
		SetResult(getdata).
		Get("https://free.currconv.com/api/v7/convert?compact=ultra&apiKey=341365d39b96b88174d7&q=" + currency)

	if err != nil {
		log.Fatal(err)
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(resp.Result()); err != nil {
		log.Fatal(err)
	}

}

func GetCcyConvert(w http.ResponseWriter, req *http.Request) {

	items := mux.Vars(req)
	fmt.Println(items)

	/*client := resty.New()
	var getdata map[string]interface{}
	resp, err := client.R().
		EnableTrace().
		SetResult(&getdata).
		Get("http://localhost:8020/currency/" + items["item1"] + "/" + items["item2"])

	if err != nil {
		log.Fatal(err)
	}

	ilie := resp.Result()
	fmt.Println("Nooo ", reflect.TypeOf(ilie))*/

	response, err := http.Get("http://localhost:8020/currency/" + items["item1"] + "/" + items["item2"])
	if err != nil {
		log.Fatal(err)
	}
	var view map[string]interface{}
	json.NewDecoder(response.Body).Decode(&view)
	var price float64
	//var amount float64
	for k, v := range view {
		price := v

		fmt.Println("KKK", k)
		fmt.Println("VVV", v)
		fmt.Println("PPP", price)
	}

	if amount, err := strconv.ParseFloat(items["amount"], 64); err == nil {
		fmt.Println(amount) // 3.14159265
	}

	price = 0.896902

	fmt.Println("OOO", price)
	var allResult = 0.896902 * 1560

	fmt.Println("Convertor : ", allResult)

}
