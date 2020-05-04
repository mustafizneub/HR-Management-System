import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'; // Reactive form services
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  showAddTask: boolean = false;
  taskForm: FormGroup;
  taskList: any;
  assign: boolean = false;
  assignForm: FormGroup;
  tasknm: string;
  p: number = 1;
  collection: any[];
  constructor(
    public authService: AuthService,
    public router: Router,
    public ngZone: NgZone,
    public fb: FormBuilder,
    private db: AngularFirestore


  ) { }

  ngOnInit(): void {
    this.db.collection('task').valueChanges().subscribe(object => {
      this.taskList = object;

    });

  }

  addTask() {
    this.showAddTask = true;
    this.tForm();
  }
  submitTaskName() {
    var info = this.taskForm.value;
    var tname = info['task'];
    this.db.collection('task').doc(tname).set({

      tnm: tname,
    })
    this.showAddTask = false;


  }
  delTask(tnm) {
    //  console.log(tnm);
    this.db.collection('task').doc(tnm).delete();

  }
  assignTask(tnm) {
    this.tasknm = tnm;
    console.log(tnm);
    this.assign = true;
    this.aForm();

  }
  closeTask() {
    this.showAddTask = false;
  }
  tForm() {
    this.taskForm = this.fb.group({
      task: ['', [Validators.required, Validators.minLength(5)]],
    })
  }

  get task() {
    return this.taskForm.get('task');
  }
  aForm() {
    this.assignForm = this.fb.group({
      nm: ['', [Validators.required]],
    })
  }

  get nm() {
    return this.assignForm.get('nm');
  }

  submitAssignName() {
    var name = this.assignForm.value;
    //console.log(this.tasknm);
    //console.log(name['nm']);
    var date = new Date();

    this.db.collection('task').doc(this.tasknm).set({
      tnm: this.tasknm,
      assign: name['nm'],
      date: date
    }, { merge: true }
    )
    this.assign = false;

  }
}
