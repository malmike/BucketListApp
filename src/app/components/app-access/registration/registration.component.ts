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
import { RegistrationService } from '../../../services/http-calls/registration.service';

// Models
import { UserModel } from '../../../models/user.model';

@Component({
    selector: 'registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css']
})

export class RegistrationComponent implements OnInit{

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private regExpService: RegExpService,
        private webApiPathService: WebApiPathService,
        private registrationService: RegistrationService,
        private snackBar: MdSnackBar){}

    ngOnInit(): void {
        throw new Error("Method not implemented.");
    }

    navLogin(){
        this.router.navigate(['/login']);
    }


}
