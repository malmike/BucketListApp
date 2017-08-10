// External Dependencies
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';

//Form Validators
import { StructureValidator } from '../../../form-validators/structure.validator';

// Services
import { RegExpService } from '../../../services/shared-information/reg-exp.service';
import { WebApiPathService } from '../../../services/shared-information/webapi-path.service';
import { LoginService } from '../../../services/http-calls/login.service';

// Models
import { UserModel } from '../../../models/user.model';


@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit{
    loginForm: FormGroup;
    active:boolean = true;
    user: UserModel = new UserModel();

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private regExpService: RegExpService,
        private webApiPathService: WebApiPathService,
        private loginService: LoginService,
        private snackBar: MdSnackBar){}


    ngOnInit(): void {
        this.buildForm();
    }

    navRegistration(){
        this.router.navigate(['/registration']);
    }

    buildForm(): void {
         this.loginForm = this.fb.group({
            'email':[null,[
                Validators.required,
                StructureValidator([this.regExpService.getRegExp('email').regExp])
            ]],
            'password': [null, Validators.required]
        });

        this.loginForm.valueChanges
            .subscribe(data => this.onValueChanged(data));

        this.onValueChanged();
    }

    onValueChanged(data?: any){
        if(!this.loginForm) { return; }
        const form = this.loginForm;

        for(const field in this.formErrors){
            //Clear previous error messages (if any)
            this.formErrors[field] = '';
            const control = form.get(field);
            if(control && control.dirty && !control.valid){
                const messages = this.validationMessages[field];
                for(const key in control.errors){
                    this.formErrors[field] = messages[key];
                }
            }
        }
    }

    formErrors = {
        'email': ''
    };

    validationMessages = {
        'email': {
            'required': '',
            'forbiddenStructure': 'Email format should be "john@doe.com".'
        }
    }

    onSubmitForm(){
        this.user = this.loginForm.value;
        this.loginService.authenticate(this.user, this.webApiPathService.getWebApiPath('login').path)
            .subscribe(responseSp => {
                if (responseSp.status === "success") {
                    console.log(responseSp.message);
                    this.snackBar.open(responseSp.message, '', {
                        duration: 2000,
                    });
                    this.router.navigate(['/nav', 'bucketlist']);
                }else{
                    this.snackBar.open(responseSp.message, '', {
                        duration: 2000,
                    });
                    console.log(responseSp.message);
                }
            },
            errMsg => {
                this.snackBar.open(errMsg, '', {
                        duration: 2000,
                });
                console.log(errMsg);
            });
    }

}
