import { Injectable } from '@angular/core';
import { Http,Response, RequestOptions,Headers } from '@angular/http';
import { environment } from '../../../environments/environment.prod';
import { HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationDialogServiceComponent } from '../confirmation-dialog-service/confirmation-dialog-service.component';

@Injectable({
  providedIn: 'root'
})


export class ScanningService {
  baseUrl: any;
  auth: any;
  headers: Headers;
  

  constructor(private http: Http,private toastr:ToastrService,private modalService: NgbModal) { 
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

//   addMaterialToBean(data){
//     console.log(data)
//     return this.http.post(this.baseUrl+'/material/addmaterial', data).
// toPromise().then(response => this.extract(response))
//    .catch(error => this.handleError(error));
// }

addMaterial(data){
  let options = new RequestOptions({ headers: this.headers });
  console.log("Token:",localStorage.getItem('user'))
  console.log(data)
   return this.http.post(this.baseUrl+'/material/addmaterial',data).
  toPromise().then(response => this.extract(response))
 .catch(error => this.handleError(error));
}

updateMaterial(data){
  let options = new RequestOptions({ headers: this.headers });
  console.log("Token:",localStorage.getItem('user'))
  console.log(data)
   return this.http.post(this.baseUrl+'/material/updatematerial',data).
  toPromise().then(response => this.extract(response))
 .catch(error => this.handleError(error));
}
dologin(data){
   return this.http.post(this.baseUrl+'/user/loginCheck',data,{headers: this.headers}).
  toPromise().then(response => this.extract(response))
   .catch(error => this.handleError(error));
}


dologout(){
    localStorage.removeItem('user')
    localStorage.removeItem('username')
    localStorage.removeItem('userrole')
    console.log("Token:",localStorage.getItem('user'))
    return this.http.get(this.baseUrl+'/user/logout').toPromise().then(response => this.extract(response))
   .catch(error => this.handleError(error));
}


addLocation(data){
  let options = new RequestOptions({ headers: this.headers });
  console.log(data)
  return this.http.post(this.baseUrl+'/location/addlocation', data).
toPromise().then(response => this.extract(response))
 .catch(error => this.handleError(error));
}
updateLocation(data){
  let options = new RequestOptions({ headers: this.headers });
  console.log(data)
  return this.http.post(this.baseUrl+'/location/updatelocation', data).
toPromise().then(response => this.extract(response))
 .catch(error => this.handleError(error));
}
addBin(data){
  console.log(data)
  let options = new RequestOptions({ headers: this.headers });
  return this.http.post(this.baseUrl+'/bin/addbin', data).
toPromise().then(response => this.extract(response))
 .catch(error => this.handleError(error));
}
updateBin(data){
  console.log(data)
  let options = new RequestOptions({ headers: this.headers });
  return this.http.post(this.baseUrl+'/bin/updatebin', data).
toPromise().then(response => this.extract(response))
 .catch(error => this.handleError(error));
}
addassign(data){
  let options = new RequestOptions({ headers: this.headers });
  return this.http.post(this.baseUrl+'/assign/addassign', data).
  toPromise().then(response => this.extract(response))
 .catch(error => this.handleError(error));
}
updateassign(data){
  let options = new RequestOptions({ headers: this.headers });
  return this.http.post(this.baseUrl+'/assign/updateassign', data).
  toPromise().then(response => this.extract(response))
 .catch(error => this.handleError(error));
}
getBeanList(){
    return this.http.get(this.baseUrl+'/bin/getbinlist/0').
      toPromise().then(response => this.extractJson(response))
      .catch(error => this.handleError(error));
}

getAssignList(){
    return this.http.get(this.baseUrl+'/assign/getassignlist/1').
      toPromise().then(response => this.extractJson(response))
      .catch(error => this.handleError(error));
}

getLocationList(pagno){
    return this.http.get(this.baseUrl+'/location/getlocationlist/'+pagno).
      toPromise().then(response => this.extractJson(response))
      .catch(error => this.handleError(error));
}

getMaterialList(){
  console.log(2)
  console.log("Token:",localStorage.getItem('user'))
  return this.http.get(this.baseUrl+'/material/getmateriallist/0').
      toPromise().then(response => this.extractJson(response))
      .catch(error => this.handleError(error));
}
//filter api
getMaterialListbymatcode(mat_code){
  return this.http.get(this.baseUrl+'/material/getmaterialbyid/'+mat_code).
  toPromise().then(response => this.extractJson(response))
  .catch(error => this.handleError(error));
}
getbinListbybintcode(bin_code){
  return this.http.get(this.baseUrl+'/bin/getbinbyid/'+bin_code).
  toPromise().then(response => this.extractJson(response))
  .catch(error => this.handleError(error));
}
getlocationListbyloc_name(loc_name){
  return this.http.get(this.baseUrl+'/location/getlocationlistByloc_name/'+loc_name).
  toPromise().then(response => this.extractJson(response))
  .catch(error => this.handleError(error));
}
getuseraccesslistbyid(user_role_id){
  return this.http.get(this.baseUrl+'/userrole/getuserrolebyid/'+user_role_id).
  toPromise().then(response => this.extractJson(response))
  .catch(error => this.handleError(error));
}
getmaterialbyname(materialcode){
  
  return this.http.get(this.baseUrl+'/material/getmaterialbyid/'+materialcode).
  toPromise().then(response => this.extractJson(response))
  .catch(error => this.handleError(error));
}
checkrecord(code,codename){
  return this.http.get(this.baseUrl+code+codename).
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

public confirm(
  title: string,
  message: string,
  btnOkText: string = 'OK',
  btnCancelText: string = 'Cancel',
  dialogSize: 'sm'|'lg' = 'sm'): Promise<boolean> {
  const modalRef = this.modalService.open(ConfirmationDialogServiceComponent, { size: dialogSize });
  modalRef.componentInstance.title = title;
  modalRef.componentInstance.message = message;
  modalRef.componentInstance.btnOkText = btnOkText;
  modalRef.componentInstance.btnCancelText = btnCancelText;

  return modalRef.result;
}
}
