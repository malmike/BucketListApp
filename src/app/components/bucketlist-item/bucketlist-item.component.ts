// External Dependencies
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';

// Services
import { SharedBucketlistService } from '../../services/shared-information/shared-bucketlist.service';

// Models
import { BucketlistModel } from '../../models/bucketlist.model';

@Component({
    selector: 'bucketlistitem',
    templateUrl: './bucketlist-item.component.html',
    styleUrls: ['./bucketlist-item.component.css']
})

export class BucketlistItemComponent implements OnInit{

    private bucketlist: BucketlistModel = new BucketlistModel();
    private edit: boolean = false;

    constructor(
        private sharedBucketlistService: SharedBucketlistService
    ){}

    ngOnInit(): void {
        this.getBucketlist();
    }

    getBucketlist(){
        this.bucketlist = this.sharedBucketlistService.getBucketlist();
    }

    canEdit(){
        this.edit = true;
    }
}