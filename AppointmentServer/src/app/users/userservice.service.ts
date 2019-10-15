import { Injectable } from '@angular/core';
import { Http,Response, RequestOptions,Headers } from '@angular/http';
// import { environment } from '../../environments/environment';
import { environment } from '../../environments/environment.prod';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {
  baseUrl: any;
  auth: any;
  headers: Headers;
  constructor(private http: Http,private toastr:ToastrService) 
  {
    this.baseUrl = environment.sereverBaseUrl
    console.log("Token:",localStorage.getItem('user'))
    this.auth=localStorage.getItem('user')
         this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('authorization', this.auth);
   }

   getUserAccessList(){
        return this.http.get(this.baseUrl+'/userroleaccess/getuseraccesslist/1').
        toPromise().then(response => this.extractJson(response))
        .catch(error => this.handleError(error));
   }

   getUserRoleList(){
    return this.http.get(this.baseUrl+'/userrole/getuserrolelist/0').
        toPromise().then(response => this.extractJson(response))
        .catch(error => this.handleError(error));
  }

  getUserList(){
    return this.http.get(this.baseUrl+'/user/getuserlist/0').
        toPromise().then(response => this.extractJson(response))
        .catch(error => this.handleError(error));
  }

   getUserRoleById(id){
    return this.http.get(this.baseUrl+'/userrole/getuserrolebyid/'+id).
        toPromise().then(response => this.extractJson(response))
        .catch(error => this.handleError(error));
  }
  

  addUserRole(data){
    return this.http.post(this.baseUrl+'/userrole/adduserrole',data,{headers: this.headers}).
    toPromise().then(response => this.extract(response))
     .catch(error => this.handleError(error));
  }
  updateUserRole(data){
    return this.http.post(this.baseUrl+'/userrole/updateroles',data,{headers: this.headers}).
    toPromise().then(response => this.extract(response))
     .catch(error => this.handleError(error));
  }
  addUser(data){
    return this.http.post(this.baseUrl+'/user/adduser',data,{headers: this.headers}).
    toPromise().then(response => this.extract(response))
     .catch(error => this.handleError(error));
  }
  updateUser(data){
    return this.http.post(this.baseUrl+'/user/updateuser',data,{headers: this.headers}).
    toPromise().then(response => this.extract(response))
     .catch(error => this.handleError(error));
  }
  getVisitorById(id) {
    console.log(this.baseUrl)
    return this.http.get(this.baseUrl+'/visitordetails/getvisitorbyid/' + id).
      toPromise().then(response => this.extractJson(response))
      .catch(error => this.handleError(error));
  }
   private extract(res: Response) {
    let body: any;
    try {
      body = res.json();
    }
    catch (err) {
      body = res.text();
    }
    return body || {};
  }
  private extractJson(res: Response) {
    return res.json();
  }
  private handleError(error: any): Promise<any> {
    console.log('An error occurred', error);
    //alert(error.status)
    this.toastr.error(error.statusText)
    return Promise.reject(error.message || error);
  }
}
