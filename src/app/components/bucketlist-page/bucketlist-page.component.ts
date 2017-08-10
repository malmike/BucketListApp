// External Dependencies
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';

// Models
import { BucketlistModel } from '../../models/bucketlist.model';

@Component({
  selector: 'bucketlistpage',
  templateUrl: './bucketlist-page.component.html',
  styleUrls: ['./bucketlist-page.component.css']
})

export class BucketlistPageComponent implements OnInit{
    addbucketlistForm: FormGroup;
    active:boolean = true;
    bucketlistModel: BucketlistModel = new BucketlistModel();

    ngOnInit(): void {
        this.buildForm();
    }

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private snackBar: MdSnackBar){}

    buildForm(): void {
         this.addbucketlistForm = this.fb.group({
            'name': [null,[
                Validators.required,
                Validators.minLength(3)
            ]]
        });

        this.addbucketlistForm.valueChanges
            .subscribe(data => this.onValueChanged(data));

        this.onValueChanged();
    }

     onValueChanged(data?: any){
        if(!this.addbucketlistForm) { return; }
        const form = this.addbucketlistForm;

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
        'name': ''
    };

    validationMessages = {
        'name': {
            'required': 'Bucketlist name is required.',
            'minlength': 'Bucketlist name must be at least 3 characters long.'
        }
    }
    

}