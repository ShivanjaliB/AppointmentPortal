import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { AuthService } from '../../core/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ScanningService } from '../../Scanning/service/scanning.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user:any={}
  userForm: FormGroup;
  formErrors = {
    'email': '',
    'password': ''
  };
  validationMessages = {
    'email': {
      'required': 'Please enter your email',
      'email': 'please enter your vaild email'
    },
    'password': {
      'required': 'please enter your password',
      'pattern': 'The password must contain numbers and letters',
      'minlength': 'Please enter more than 4 characters',
      'maxlength': 'Please enter less than 25 characters',
    }
  };

  constructor(private router: Router,
              private fb: FormBuilder,private scanningService:ScanningService,private toastr:ToastrService) 
              {
                console.log("Clearing Token")
                localStorage.clear()
  }

  ngOnInit() {
    
    //this.buildForm();
    
  }


  dologin(data:any){
console.log(data);
let user_role_id:any;
this.scanningService.dologin(data).then(result=>{
    console.log("login",result)
  if(result.user.length == 0){
    this.toastr.warning("Incorrect Username Or Password")
  }else{
    this.toastr.success("Login Successfully")
    localStorage.setItem('user',result.token)
    localStorage.setItem('username',result.user[0].username)
    user_role_id=result.user[0].user_role_id
    this.scanningService.getuseraccesslistbyid(user_role_id).then(result=>{
      console.log(result)
      if(result.length!=0){
        console.log("if")
      localStorage.setItem('userrole',result[0].u_role_accesslist)
      this.router.navigate(['/auth/dashboard']);
       }else{
         console.log("else")
        localStorage.setItem('userrole',"A-101,V-102")
        this.router.navigate(['/auth/dashboard']);
       }
    })
    
    
  }
  
})
  }
  

  buildForm() {
    this.userForm = this.fb.group({
      'email': ['', [
        Validators.required,
        Validators.email
      ]
      ],
      'password': ['', [
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(6),
        Validators.maxLength(25)
      ]
      ],
    });

    this.userForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.userForm) {
      return;
    }
    const form = this.userForm;
    for (const field in this.formErrors) {
      if (Object.prototype.hasOwnProperty.call(this.formErrors, field)) {
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (Object.prototype.hasOwnProperty.call(control.errors, key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }


  // login() {
  //   this.router.navigate(['/auth/dashboard']);
  // }
}

