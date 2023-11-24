import HttpService from "../services/http.service";

const httpPy = new HttpService({
    baseUrl: "http://localhost:5000/api/v1",
    headers: {
        "Content-Type": "application/json"
    }
});

export { httpPy };
