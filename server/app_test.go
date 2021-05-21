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
func TestUpload(t *testing.T) {

	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(controllers.UploadController)

	filename := "example.csv"
	filetype := "myFile"
	file, err := os.Open(filename)

	if err != nil {
		log.Fatal(err)
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

	if err != nil {
		log.Fatal(err)
	}

	req, err := http.NewRequest(http.MethodPost, "/upload", body)
	if err != nil {
		t.Fatal(err)
	}
	req.Header.Add("Content-Type", writer.FormDataContentType())

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
