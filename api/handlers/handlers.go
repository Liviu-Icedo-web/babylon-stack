package handlers

import (
	"babylon-stack/api/dao"
	"babylon-stack/api/models"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"reflect"

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

	//dynamic := make(map[string]interface{})

	resp, err := client.R().
		EnableTrace().
		Get("https://free.currconv.com/api/v7/convert?compact=ultra&apiKey=341365d39b96b88174d7&q=" + currency)

	if err != nil {
		log.Fatal(err)
	}

	// Explore response object
	/*fmt.Println("Response Info:")
	fmt.Println("Error      :", err)
	fmt.Println("Status Code:", resp.StatusCode())
	fmt.Println("Status     :", resp.Status())
	fmt.Println("Time       :", resp.Time())
	fmt.Println("Received At:", resp.ReceivedAt())
	fmt.Println("Body       :\n", resp)
	fmt.Println()*/

	fmt.Println("Body       :\n", resp)

	fmt.Println("type Response :\n", reflect.TypeOf(resp))
	fmt.Println("type Value Response :\n", reflect.ValueOf(resp))
	fmt.Println("type Results :\n", reflect.TypeOf(result))

	/*w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(reflect.ValueOf(resp))*/

	response, _ := json.Marshal(resp)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(response)
	json.NewEncoder(w).Encode(resp)

}
