// External Dependencies
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';

//Form Validators
import { StructureValidator } from '../../../form-validators/structure.validator';
import { CompareItemsValidator } from '../../../form-validators/compare-items.validator'

// Services
import { RegExpService } from '../../../services/shared-information/reg-exp.service';
import { WebApiPathService } from '../../../services/shared-information/webapi-path.service';
import { RegistrationService } from '../../../services/http-calls/registration.service';

// Models
import { UserModel } from '../../../models/user.model';

@Component({
    selector: 'registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css']
})

export class RegistrationComponent implements OnInit{
    registrationForm: FormGroup;
    active:boolean = true;
    provePassword: string;
    user: UserModel = new UserModel();

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private regExpService: RegExpService,
        private webApiPathService: WebApiPathService,
        private registrationService: RegistrationService,
        private snackBar: MdSnackBar){}

    ngOnInit(): void {
        this.buildForm();
    }

    navLogin(){
        this.router.navigate(['/login']);
    }

    buildForm(): void {
         this.registrationForm = this.fb.group({
            'fname': [null,[
                Validators.required,
                Validators.minLength(3)
            ]],
            'lname': [null, [
                Validators.required,
                Validators.minLength(3)
            ]],
            'email':[null,[
                Validators.required,
                StructureValidator([this.regExpService.getRegExp('email').regExp])
            ]],
            'password': [null, [
                Validators.required,
                Validators.minLength(6)
            ]],
            'confirmPassword': [null, [
                Validators.required
            ]]
        },
        {validator: CompareItemsValidator('password', 'confirmPassword')});

        this.registrationForm.valueChanges
            .subscribe(data => this.onValueChanged(data));

        this.onValueChanged();
    }

    onValueChanged(data?: any){
        if(!this.registrationForm) { return; }
        const form = this.registrationForm;

        let confirmPassword = form.get('confirmPassword');
        if(confirmPassword && confirmPassword.dirty &&
            this.registrationForm.getError('mismatchedItems')){
            this.provePassword = "Passwords do not match";

        }else{
            this.provePassword = null;
        }

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
        'fname': '',
        'lname': '',
        'email': '',
        'password': '',
        'confirmPassword':''
    };

    validationMessages = {
        'fname': {
            'required': 'First name is required.',
            'minlength': 'First name must be at least 3 characters long.'
        },
        'lname': {
            'required': 'Last name is required.',
            'minlength': 'Last name must be at least 3 characters long.'
        },
        'email': {
            'required': 'Email is required.',
            'forbiddenStructure': 'Email format should be "john@doe.com".'
        },
        'password': {
            'required': 'Password is required.',
            'minlength': 'Password must be at least 6 characters long.'
        },
        'confirmPassword': {
            'mismatchedItems':'Passwords do not match'
        }
    }

    onSubmitForm(){
        this.user = this.registrationForm.value;
        this.registrationService.register(this.user, this.webApiPathService.getWebApiPath('registration').path)
            .subscribe(responseSp => {
                if (responseSp.status === "success") {
                    console.log(responseSp.message);
                    this.snackBar.open(responseSp.message, '', {
                        duration: 2000,
                    });
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
