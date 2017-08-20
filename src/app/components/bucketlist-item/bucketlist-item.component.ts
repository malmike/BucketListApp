// External Dependencies
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';

// Services

// Models
import { BucketlistModel } from '../../models/bucketlist.model';

@Component({
    selector: 'bucketlistitem',
    templateUrl: './bucketlist-item.component.html',
    styleUrls: ['./bucketlist-item.component.css']
})

export class BucketlistItemComponent implements OnInit{
    editbucketlistForm: FormGroup;
    active:boolean = true;
    edit: boolean = false;
    private bucketlist: BucketlistModel = new BucketlistModel();

    constructor(
        private fb: FormBuilder,
        private router: Router,
    ){}

    buildForm(): void {
        console.log(this.bucketlist.name)
        this.editbucketlistForm = this.fb.group({
            'name': [this.bucketlist.name, Validators.minLength(3)]
        });

        this.editbucketlistForm.valueChanges
            .subscribe(data => this.onValueChanged(data));

        this.onValueChanged();
    }

     onValueChanged(data?: any){
        if(!this.editbucketlistForm) { return; }
        const form = this.editbucketlistForm;

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
            'minlength': 'Bucketlist name must be at least 3 characters long.'
        }
    }

    ngOnInit(): void {
        this.getBucketlist();
    }

    getBucketlist(){
        this.buildForm();
    }

    canEdit(){
        this.edit = true;
    }

    cancel(){
        this.edit = false;
    }
}