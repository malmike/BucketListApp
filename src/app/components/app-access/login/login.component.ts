// External Dependencies
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';

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
        throw new Error("Method not implemented.");
    }


}
