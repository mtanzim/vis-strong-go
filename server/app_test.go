package server

import (
	"bytes"
	"fmt"
	"io"
	"log"
	"mime/multipart"
	"net/http"
	"net/http/httptest"
	"os"
	"path/filepath"
	"strings"
	"testing"

	"github.com/mtanzim/vis-strong-go/server/controllers"
)

func TestHealth(t *testing.T) {
	req, err := http.NewRequest(http.MethodGet, "/health", nil)
	if err != nil {
		t.Fatal(err)
	}
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(controllers.HealthController)
	handler.ServeHTTP(rr, req)
	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}
	expected := "OK"
	if rr.Body.String() != expected {
		t.Errorf("handler returned unexpected body: got %v want %v",
			rr.Body.String(), expected)
	}
}

func reqWithFile(filename, filetype, route string) (*http.Request, error) {

	file, err := os.Open(filename)

	if err != nil {
		return nil, err
	}

	defer file.Close()

	body := &bytes.Buffer{}
	writer := multipart.NewWriter(body)
	part, err := writer.CreateFormFile(filetype, filepath.Base(file.Name()))

	if err != nil {
		log.Fatal(err)
	}

	io.Copy(part, file)
	writer.Close()

	req, err := http.NewRequest(http.MethodPost, route, body)
	if err != nil {
		return nil, err
	}
	req.Header.Add("Content-Type", writer.FormDataContentType())
	return req, nil

}

func TestUpload(t *testing.T) {

	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(controllers.UploadController)

	filename := "example.csv"
	filetype := "myFile"
	route := "/upload"

	req, err := reqWithFile(filename, filetype, route)
	if err != nil {
		t.Fatal("failed to process file")
	}

	handler.ServeHTTP(rr, req)
	if status := rr.Code; status != http.StatusOK {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusOK)
	}

	resString := rr.Body.String()
	expectedSubStrList := []string{"Seated Leg Curl (Machine)", "Leg Press", "Deadlift (Barbell)", "Plank", "Chest and Triceps"}

	for _, expectedSubStr := range expectedSubStrList {
		testname := fmt.Sprintf("%s,%s", "testing", expectedSubStr)
		t.Run(testname, func(t *testing.T) {
			containsExpected := strings.Contains(resString, expectedSubStr)
			if !containsExpected {
				t.Errorf("handler returned unexpected body: got %v wanted to have substring %v",
					rr.Body.String(), expectedSubStr)
			}
		})

	}

}

// func TestUploadInvalid(t *testing.T) {

// 	rr := httptest.NewRecorder()
// 	handler := http.HandlerFunc(controllers.UploadController)

// 	filetype := "myFile"
// 	route := "/upload"

// 	filename := "example.csv"
// 	req, err := reqWithFile(filename, filetype, route)
// 	if err != nil {
// 		t.Fatal("failed to process file")
// 	}

// 	handler.ServeHTTP(rr, req)
// 	if status := rr.Code; status != http.StatusOK {
// 		t.Errorf("handler returned wrong status code: got %v want %v",
// 			status, http.StatusOK)
// 	}

// 	resString := rr.Body.String()
// 	expectedSubStrList := []string{"Seated Leg Curl (Machine)", "Leg Press", "Deadlift (Barbell)", "Plank", "Chest and Triceps"}

// 	for _, expectedSubStr := range expectedSubStrList {
// 		testname := fmt.Sprintf("%s,%s", "testing", expectedSubStr)
// 		t.Run(testname, func(t *testing.T) {
// 			containsExpected := strings.Contains(resString, expectedSubStr)
// 			if !containsExpected {
// 				t.Errorf("handler returned unexpected body: got %v wanted to have substring %v",
// 					rr.Body.String(), expectedSubStr)
// 			}
// 		})

// 	}

// }
