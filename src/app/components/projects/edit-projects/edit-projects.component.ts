import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from "../../../services/auth.service";
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-edit-projects',
  templateUrl: './edit-projects.component.html',
  styleUrls: ['./edit-projects.component.css']
})
export class EditProjectsComponent implements OnInit {

  name: any;
  projectInfo: any;
  editForm: FormGroup
  constructor(
    public authService: AuthService,
    public ngZone: NgZone,
    private router: ActivatedRoute,
    public db: AngularFirestore,
    private fb: FormBuilder,
    private toastr: ToastrService,
    public route:Router,
  ) { }

  ngOnInit() {

    //ready the form
    this.pForm();
    //find id from client.component
    this.router.params.subscribe(param => {
      this.name = param.id;
    })

    //fetch & set data in reactive form
    this.db.collection('projects', ref => ref.where('name', '==', this.name)).valueChanges().subscribe(object => {

      this.projectInfo = object;
      //console.log(this.clientInfo );
      this.pname.setValue(this.projectInfo[0]['name']);
      this.cname.setValue(this.projectInfo[0]['client']);
      this.leader.setValue(this.projectInfo[0]['leader']);
      this.startdate.setValue(this.projectInfo[0]['startdate']);
      this.enddate.setValue(this.projectInfo[0]['enddate']);
      this.rate.setValue(this.projectInfo[0]['rate']);



    });
  }



  updateForm() {

    var info = this.editForm.value;
    var pnm = info['pname'];
    var cnm = info['cname'];
    var leader = info['leader'];
    var startdate = info['startdate'];
    var enddate = info['enddate'];
    var rate = info['rate'];


    this.db.collection('projects').doc(pnm).set({
      name: pnm,
      client: cnm,
      leader: leader,
      startdate: startdate,
      enddate: enddate,
      rate: rate
    }, { merge: true }
    )
    this.route.navigate(['/projects']);



  }

  pForm() {
    this.editForm = this.fb.group({
      pname: ['', [Validators.required, Validators.minLength(2)]],
      cname: ['', [Validators.required, Validators.minLength(2)]],
      leader: ['', [Validators.required, Validators.minLength(2)]],
      startdate: ['', [Validators.required]],
      enddate: ['', [Validators.required]],
      rate: ['', [Validators.required]],



    })
  }

  // Accessing form control using getters
  get pname() {
    return this.editForm.get('pname');
  }

  get cname() {
    return this.editForm.get('cname');
  }

  get leader() {
    return this.editForm.get('leader');
  }

  get rate() {
    return this.editForm.get('rate');
  }

  get enddate() {
    return this.editForm.get('enddate');
  }

  get startdate() {
    return this.editForm.get('startdate');
  }

}
