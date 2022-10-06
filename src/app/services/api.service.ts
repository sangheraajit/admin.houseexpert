import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(private http: HttpClient) { }

    apicall(body: object) {
        // let apiUrl = environment.CommonApiServer + 'apiCall1/Post';
        let apiUrl = environment.CommonApiServer + 'apiCall1/Post';
        return this.http.post(apiUrl, body)
    }
    apifileupload(formData: FormData) 
    {
        let apiUrl = environment.CommonApiServer +'apifileupload';
        return this.http.post(apiUrl, formData)
    }
}
