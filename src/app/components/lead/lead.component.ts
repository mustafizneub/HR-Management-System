import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import 'firebase/storage';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lead',
  templateUrl: './lead.component.html',
  styleUrls: ['./lead.component.css']
})
export class LeadComponent implements OnInit {

  leads;
  searchleads: string;
  p: number = 1;
  collection: any[];

  constructor(

    public authService: AuthService,
    private router: ActivatedRoute,
    public ngZone: NgZone,
    private db: AngularFirestore,
    private storage: AngularFireStorage,
    public route: Router,
  ) { }

  ngOnInit(): void {
    this.db.collection('leads', ref => ref.where('status', '==', 1)).valueChanges().subscribe(object => {
      this.leads = object;
      console.log(this.leads);
    });
  }

  editlead(id) {


  }
  dellead(id) {


  }

}
