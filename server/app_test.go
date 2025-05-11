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

	filename := "fixtures/example.csv"
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
	expectedSubStrList := []string{"Shoulder Press (Machine)",
		"Deadlift (Barbell)",
		"Leg Press"}

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

func TestUploadInvalid(t *testing.T) {

	handler := http.HandlerFunc(controllers.UploadController)

	filetype := "myFile"
	route := "/upload"

	tests := []struct {
		filename       string
		expectedStatus uint
		expectedBody   string
	}{
		{"fixtures/bad.csv", http.StatusOK, "{}\n"},
		{"fixtures/results.csv", http.StatusOK, "{}\n"},
		{"fixtures/bad.txt", http.StatusOK, "{}\n"},
	}

	for _, tt := range tests {
		tt := tt // create local copy
		testname := fmt.Sprintf("%s,%d,%s", tt.filename, tt.expectedStatus, tt.expectedBody)
		t.Run(testname, func(t *testing.T) {
			t.Parallel()
			rr := httptest.NewRecorder()
			req, err := reqWithFile(tt.filename, filetype, route)
			if err != nil {
				t.Fatal("failed to process file")
			}

			handler.ServeHTTP(rr, req)
			if status := rr.Code; status != int(tt.expectedStatus) {
				t.Errorf("handler returned wrong status code: got %v want %v",
					status, tt.expectedStatus)
			}
			resString := rr.Body.String()
			if resString != tt.expectedBody {
				t.Errorf("handler returned unexpected body: got %v wanted to have %v",
					resString, tt.expectedBody)
			}
		})
	}

}

func SkipTestUploadLoadTest(t *testing.T) {

	handler := http.HandlerFunc(controllers.UploadController)

	filetype := "myFile"
	route := "/upload"

	alternatingTests := []struct {
		filename       string
		expectedSubStr string
	}{
		{
			filename:       "fixtures/example.csv",
			expectedSubStr: "Deadlift (Barbell)",
		},
		{
			filename:       "fixtures/exampleB.csv",
			expectedSubStr: "Deadlift (Barbell)",
		},
	}

	numIterations := 50 * 10

	fails := make(map[int]bool)

	for n := 0; n <= numIterations; n++ {

		curTest := alternatingTests[n%2]
		testname := fmt.Sprintf("%s,%d, %s", "Loadtest", n, curTest.filename)

		req, err := reqWithFile(curTest.filename, filetype, route)
		t.Run(testname, func(t *testing.T) {
			t.Parallel()
			rr := httptest.NewRecorder()
			if err != nil {
				t.Fatal("failed to process file")
			}

			handler.ServeHTTP(rr, req)
			expectedStatus := http.StatusOK

			if status := rr.Code; status != int(expectedStatus) {
				t.Errorf("handler returned wrong status code: got %v want %v;  fail ratio %f",
					status, expectedStatus, float64(len(fails))/float64(numIterations))

			}
			expectedSubStr := curTest.expectedSubStr
			resString := rr.Body.String()
			containsExpected := strings.Contains(resString, expectedSubStr)
			if !containsExpected {
				t.Errorf("handler returned unexpected body: got %v wanted to have substring %v; fail ratio %f",
					rr.Body.String(), expectedSubStr, float64(len(fails))/float64(numIterations))
			}

		})
	}

}
