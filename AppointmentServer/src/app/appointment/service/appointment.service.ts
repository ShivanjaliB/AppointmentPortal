import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Response, Http } from '@angular/http';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  baseUrl: any;
  headers: Headers;
  auth: string;
  
  constructor(private http: Http) 
  {
    this.baseUrl = environment.sereverBaseUrl
    console.log("Token:",localStorage.getItem('user'))
    this.auth=localStorage.getItem('user')
         this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('authorization', this.auth);

  }
 

  getbatchbyid(id)
  {
    return this.http.get(this.baseUrl + "/batch/getbatchbyid/" + id).
    toPromise().then(response => this.extractJson(response))
    .catch(error => this.handleError(error));
  }
 

  getdatabyassignid(id){
    return this.http.get(this.baseUrl + "/assign/getassignbyid/" +id).
    toPromise().then(response => this.extractJson(response))
    .catch(error => this.handleError(error));
  }

  getStatusList(){
    return this.http.get(this.baseUrl + "/status/getStatusList/").
    toPromise().then(response => this.extractJson(response))
    .catch(error => this.handleError(error));
  }

  getStatusById(id){
    return this.http.get(this.baseUrl + "/status/getStatusById/"+id).
    toPromise().then(response => this.extractJson(response))
    .catch(error => this.handleError(error));
  }


  // getAppointList(id) {
  //   console.log(this.baseUrl)
  //   return this.http.get(this.baseUrl + "/appointment/getappointmentlist/" + id).
  //     toPromise().then(response => this.extractJson(response))
  //     .catch(error => this.handleError(error));
  // }

  addAppointment(data) {
    console.log(this.baseUrl)
    return this.http.post(this.baseUrl + '/appointment/addappointment' , data,{headers: this.headers}).
      toPromise().then(response => this.extractJson(response))
      .catch(error => this.handleError(error));
  }

  updateAppointment(data) {
    console.log(data)
    return this.http.post(this.baseUrl+'/appointment/updateappointment', data,{headers: this.headers}).
      toPromise().then(response => this.extractJson(response))
      .catch(error => this.handleError(error));
  }

  getAppointListByDate(date,status){
    console.log("getAppointListByDate")
    // console.log(this.baseUrl + '/appointment/getappointlistbydate/'+date +"/"+status+"/"+0)
    return this.http.get(this.baseUrl + '/appointment/getappointlistbydate/'+date +"/"+status).
  toPromise().then(response => this.extractJson(response))
  .catch(error => this.handleError(error));
  }
  getTodaysApointmentByDate(date,status){
    return this.http.get(this.baseUrl + '/appointment/getappointlistbydate/'+date +"/"+status+"/"+0).
    toPromise().then(response => this.extractJson(response))
    .catch(error => this.handleError(error));
  }
  // getappointlistbydatestatus(date){
  //   console.log("3sdmfhsejfgs")
  //   return this.http.get(this.baseUrl + '/appointment/getappointlistbydatestatus/'+date +"/"+3+"/"+0).
  // toPromise().then(response => this.extractJson(response))
  // .catch(error => this.handleError(error));
  // }

updateBatch(data){
  return this.http.post(this.baseUrl+'/batch/updatebatch', data,{headers: this.headers}).
  toPromise().then(response => this.extractJson(response))
  .catch(error => this.handleError(error));
}

  getAppointListByDateandcat(date,cat){
    console.log(this.baseUrl + '/appointment/getappointlistbydateandcat/'+date +"/"+cat)
    return this.http.get(this.baseUrl + '/appointment/getappointlistbydateandcat/'+date +"/"+cat).
    toPromise().then(response => this.extractJson(response))
    .catch(error => this.handleError(error));
  }
  getAppointListByDateStatusCat(date,status,cat){
    console.log(this.baseUrl + '/appointment/getappointlistbydsc/'+date +"/"+status+"/"+cat)
    return this.http.get(this.baseUrl + '/appointment/getappointlistbydsc/'+date +"/"+status+"/"+cat).
       toPromise().then(response => this.extractJson(response))
    .catch(error => this.handleError(error));
  }


  getVisitorById(id) {
    console.log(this.baseUrl)
    return this.http.get(this.baseUrl+'/visitordetails/getvisitorbyid/' + id).
      toPromise().then(response => this.extractJson(response))
      .catch(error => this.handleError(error));
  }
 
  getlocationById(id) {
    console.log(this.baseUrl)
    return this.http.get(this.baseUrl+'/location/getlocationbyid/' + id).
      toPromise().then(response => this.extractJson(response))
      .catch(error => this.handleError(error));
  }

  getVehicleById(id) {
    return this.http.get(this.baseUrl+'/visitordetails/getvisitorbyid/' + id).
      toPromise().then(response => this.extractJson(response))
      .catch(error => this.handleError(error));
  }

  getVehicleByID(id) {
    return this.http.get(this.baseUrl+'/vehicle/getvehiclebyid/' + id).
      toPromise().then(response => this.extractJson(response))
      .catch(error => this.handleError(error)); 
  }

  findAppointmentByPId(id,date,status) {
    return this.http.get(this.baseUrl+'/appointment/findappointmentbypid/' + id+"/"+date+"/"+status).
      toPromise().then(response => this.extractJson(response))
      .catch(error => this.handleError(error));
  }

  findAppointmentById(id){
    return this.http.get(this.baseUrl+'/appointment/getappointmentbyid/' + id).
    toPromise().then(response => this.extractJson(response))
    .catch(error => this.handleError(error));
  }
 
  getAppointCountByDate(date){
    console.log(date)
    return this.http.get(this.baseUrl+'/appointment/getappointcountbydate/'+date).
    toPromise().then(response => this.extractJson(response))
    .catch(error => this.handleError(error));
  }

  getAppointCountByDateStatus(status,date){
    console.log(date)
    return this.http.get(this.baseUrl+'/appointment/getappointcountbydatestatus/'+status+"/"+date).
    toPromise().then(response => this.extractJson(response))
    .catch(error => this.handleError(error));
  }
 

  getappointcountbydsc(date,status,cat){
    return this.http.get(this.baseUrl+'/appointment/getappointcountbydatestatus/'+date+"/"+status+"/"+cat).
    toPromise().then(response => this.extractJson(response))
    .catch(error => this.handleError(error));
  }


  getappointcountincampusbycat(date,cat){
    return this.http.get(this.baseUrl+'/appointment/getappointcountincampusbycat/'+date+"/"+cat).
    toPromise().then(response => this.extractJson(response))
    .catch(error => this.handleError(error));
  }


  getAppointListtByDateStatus(status,date){
    console.log(date)
    return this.http.get(this.baseUrl+'/appointment/findappointbystadate/'+status+"/"+date).
    toPromise().then(response => this.extractJson(response))
    .catch(error => this.handleError(error));
  }

  getVehicleList(pageno){
     return this.http.get(this.baseUrl+'/vehicle/getvehiclelist/'+pageno).
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
