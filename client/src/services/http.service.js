class HttpService {
    constructor({ 
        baseUrl = "",
        headers = {}
    }) {
        this.baseUrl = baseUrl;
        console.log(this.baseUrl);
        this.headers = headers;
    }

    get = async (url, headers = {}) => {
        const res = await fetch(this.baseUrl + url, { 
            method: "GET", 
            headers: { ...this.headers, ...headers } 
        });

        return await this._handleResponse(res);
    }

    post = async (url, body, headers = {}) => {
        const res = await fetch(this.baseUrl + url, { 
            method: "POST", 
            body: JSON.stringify(body), 
            headers: { ...this.headers, ...headers } 
        });

        return await this._handleResponse(res);
    }


    delete = async (url, headers = {}) => {
        const res = await fetch(this.baseUrl + url, {
            method: "DELETE",
            headers: { ...this.headers, ...headers }
        });

        return await this._handleResponse(res);
    }

    put = async (url, body, headers = {}) => {
        const res = await fetch(this.baseUrl + url, {
            method: "PUT",
            body: JSON.stringify(body),
            headers: { ...this.headers, ...headers }
        });

        return await this._handleResponse(res);
    }

    _handleResponse = async (res) => {
        const statusCode = res.status;
        const data = await res.json();

        return { data, statusCode };
    }
}

export default HttpService;