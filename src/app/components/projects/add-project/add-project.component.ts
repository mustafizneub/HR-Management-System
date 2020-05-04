import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { AuthService } from "../../../services/auth.service";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AngularFireStorage } from '@angular/fire/storage';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, finalize } from 'rxjs/operators';


@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  public projectForm: FormGroup;
  id;
  data: any;
  fileToUpload: File = null;
  link;
  prleader;
  clname;
  constructor(

    public authService: AuthService,
    public router: Router,
    public ngZone: NgZone,
    public fb: FormBuilder,
    private db: AngularFirestore,
    private flashMessage: FlashMessagesService,
    private storage: AngularFireStorage

  ) {

  }

  ngOnInit() {
    this.prleader = [''];

    //fetch client's company name 
    this.db.collection('clients', ref => ref.where('status', '==', 1)).valueChanges().subscribe(object => {
      this.clname = object;
    });

    //fetch employee list for project leader 
    this.db.collection('registered-table', ref => ref.where('employee_status', '==', "active")).valueChanges().subscribe(object => {
      var i;
      var len = object.length;
      var fn;
      var space;
      var ln;
      var name;
      var data = object;
      for (i = 0; i < len - 1; i++) {

        fn = data[i]['basic']['firstname'];
        space = " ";
        ln = data[i]['basic']['lastname'];
        name = fn.concat(space, ln);
        this.prleader.push(name);

      }

    });

    this.pForm();

  }

  @ViewChild('instance', { static: true }) instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();



  searchLeader = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
    const inputFocus$ = this.focus$;
    const leader = this.prleader;
    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? leader
        : leader.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  }



  pForm() {
    this.projectForm = this.fb.group({
      pname: ['', [Validators.required, Validators.minLength(5)]],
      client: ['', [Validators.required]],
      leader: ['', [Validators.required, Validators.minLength(2)]],
      startdate: ['', [Validators.required]],
      enddate: ['', [Validators.required]],
      rate: ['', [Validators.required]],
      description: ['', [Validators.required]],


    })
  }

  get pname() {
    return this.projectForm.get('pname');
  }

  get client() {
    return this.projectForm.get('client');
  }

  get leader() {
    return this.projectForm.get('leader');
  }

  get rate() {
    return this.projectForm.get('rate');
  }

  get enddate() {
    return this.projectForm.get('enddate');
  }

  get startdate() {
    return this.projectForm.get('startdate');
  }

  get description() {
    return this.projectForm.get('description');
  }

  ResetForm() {
    this.projectForm.reset();
  }


  submitProjectData() {


    var info = this.projectForm.value;

    this.db.collection('projects').doc(info['pname']).set({
      name: info['pname'],
      client: info['client'],
      startdate: info['startdate'],
      enddate: info['enddate'],
      rate: info['rate'],
      leader: info['leader'],
      description: info['description'],

    })
    this.projectForm.reset();
    this.router.navigate(['/projects']);





  }

}
