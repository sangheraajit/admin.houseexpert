import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class httpService {
  constructor(private http: HttpClient) {}
   apiUrl = environment.CommonApiServer + 'apicall/Post';
  postService(body: any) {

    return this.http.post(this.apiUrl, body);
  }
  apicall(body: any) {

    return this.http.post(this.apiUrl, body);
  }
  apicallparameter(spname: string,ptype:string,pid:number) {
    let body = {
      spname: spname,
      ptype: ptype,
      pid: pid,
    };

    return this.http.post(this.apiUrl, body);
  }
  GetAll(spname: string) {
    let body = {
      spname: spname,
      ptype: "readall",
      pid: 0,
    };

    return this.http.post(this.apiUrl, body);
  }
  GetSingle(spname: string,pid:number) {
    let body = {
      spname: spname,
      ptype: "read",
      pid: pid,
    };
    return this.http.post(this.apiUrl, body);
  }
  apiGet() {
    let apiUrl = environment.CommonApiServer + 'apicall/get';
    return this.http.get(apiUrl);
  }
  apiPost(spname:string,ptype:string,pid:number) {
    let body = {
      spname: spname,
      ptype: ptype,
      pid: pid,
    };
    return this.http.post(this.apiUrl, body);
  }
  apiPostWhere(spname:string,ptype:string,pid:number, pwhere: string) {
    let body = {
      spname: spname,
      ptype: ptype,
      pid: pid,
      pwhere: pwhere,
    };
    return this.http.post(this.apiUrl, body);
  }
  apiPostPut(body: any) {
    let apiUrl = environment.CommonApiServer + 'apicall/put';
    return this.http.put(apiUrl, body);
  }

  apifileupload(formData: FormData) {
    let apiUrl = environment.CommonApiServer + 'apifileupload';
    return this.http.post(apiUrl, formData);
  }
}
