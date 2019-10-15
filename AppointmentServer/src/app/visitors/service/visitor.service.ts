import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Response, Http } from '@angular/http';
// import { environment } from '../../../environments/environment';
import { environment } from '../../../environments/environment.prod';


@Injectable({
  providedIn: 'root'
})

export class VisitorService {
  baseUrl: any;
  auth: string;
  headers: Headers;

  constructor(private http: Http) {
    this.baseUrl = environment.sereverBaseUrl
    console.log("Token:",localStorage.getItem('user'))
    this.auth=localStorage.getItem('user')
         this.headers = new Headers();
    // this.headers.append('Content-Type', 'application/json');
    // this.headers.append('authorization', this.auth);
    this.headers = new Headers({ 
      'Content-Type': 'application/json' ,
    Authorization: this.auth});
  }

  getVisitorListByPageno() {
    console.log("Token:",localStorage.getItem('user'))
    console.log(this.baseUrl)
    return this.http.get(this.baseUrl + "/visitordetails/getvisitorlist/0").
      toPromise().then(response => this.extractJson(response))
      .catch(error => this.handleError(error));
  }

  addVisitor(data) {
    let options = new RequestOptions({ headers: this.headers });
    return this.http.post(this.baseUrl + '/visitordetails/createvdetail', data,options).
      toPromise().then(response => this.extract(response))
      .catch(error => this.handleError(error));
  }

  updateVisitor(data) {
    let options = new RequestOptions({ headers: this.headers });
    return this.http.post(this.baseUrl + '/visitordetails/updatevisitor', data,options).
      toPromise().then(response => this.extract(response))
      .catch(error => this.handleError(error));
  }



  addVehicle(data) {
    let options = new RequestOptions({ headers: this.headers });
    return this.http.post(this.baseUrl + '/vehicle/addvehicle', data,options).
      toPromise().then(response => this.extract(response))
      .catch(error => this.handleError(error));
  }
  updateVehicle(data) 
  {  
     let options = new RequestOptions({ headers: this.headers });
     return this.http.post(this.baseUrl + '/vehicle/updatevehicle', data,options).
     toPromise().then(response => this.extract(response))
     .catch(error => this.handleError(error));
   }

  getLatestVehicleId() {
    return this.http.get(this.baseUrl + "/vehicle/getlatestid").
      toPromise().then(response => this.extractJson(response))
      .catch(error => this.handleError(error));
  }


  getVehicleById(id) {
    return this.http.get(this.baseUrl + "/vehicle/getvehiclebyid/" + id).
      toPromise().then(response => this.extractJson(response))
      .catch(error => this.handleError(error));
  }

  getVisitorById(id) {
    return this.http.get(this.baseUrl + "/visitordetails/getvisitorbyid/" + id).
      toPromise().then(response => this.extractJson(response))
      .catch(error => this.handleError(error));
  }

  // addAppointment(data) {
  //   console.log(this.baseUrl)
  //   return this.http.post(this.baseUrl + '/appointment/addappointment', data).
  //     toPromise().then(response => this.extractJson(response))
  //     .catch(error => this.handleError(error));
  // }


  getLatestVisitorId() {
    return this.http.get(this.baseUrl + "/visitordetails/getLatestVisitorId").
      toPromise().then(response => this.extractJson(response))
      .catch(error => this.handleError(error));
  }


  getLatestAppointmentId() {
    return this.http.get(this.baseUrl + "/appointment/getlatestappointmentid").
      toPromise().then(response => this.extractJson(response))
      .catch(error => this.handleError(error));
  }

  getVisitorByMobileNumber(mobNo) {
    console.log(this.baseUrl + '/visitordetails/getvisitorbymobno/' + mobNo)
    return this.http.get(this.baseUrl + '/visitordetails/getvisitorbymobno/' + mobNo).
      toPromise().then(response => this.extractJson(response))
      .catch(error => this.handleError(error));
  }

  getVehicleByVehNo(vehNo) {
    return this.http.get(this.baseUrl + '/vehicle/getvehiclebyvehno/' + vehNo).
      toPromise().then(response => this.extractJson(response))
      .catch(error => this.handleError(error));
  }
  
  getcheck(code,adhar,mob){
    return this.http.get(this.baseUrl +code + adhar+"/"+mob).
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
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
