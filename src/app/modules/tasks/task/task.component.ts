import * as firebase from "firebase/app";
import "firebase/database";
import "firebase/firestore";

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';
declare var $: any;

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})

export class TaskComponent implements OnInit {

  assignNewTask = new FormGroup({
    task_name: new FormControl(''),
    assigned_employees: new FormControl([]),
    subscribers: new FormControl([]),
    start_date: new FormControl(''),
    end_date: new FormControl(''),
    task_description: new FormControl('')
  })
  showAddTask: boolean = false;
  taskForm: FormGroup;
  taskList: any;
  assign: boolean = false;
  assignForm: FormGroup;
  tasknm: string;
  p: number = 1;
  collection: any[];
  projectId: any;
  modalOpen: boolean = false;

  assignedEmployee: string = '';

  project: any;
  allTask: any;
  taskNames = [];
  assignedEmployeesToProject: any;
  taskId: string;


  assigned_employees: any;
  subscribers: any;

  constructor(
    public router: Router,
    private db: AngularFirestore,
    private aRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // $('.ui.dropdown').dropdown()

    this.aRoute.params.subscribe(param => {
      this.projectId = param.id;

      this.db.collection('projects').doc(this.projectId).valueChanges().subscribe(e => {
        this.project = e;
        this.assignedEmployeesToProject = this.project['assigned_employees']
      })

      this.db.collection('projects').doc(this.projectId).collection('tasks').valueChanges().subscribe(e => {
        this.allTask = e;
      })
    })


    this.db.collection('task').valueChanges().subscribe(object => {
      this.taskList = object;
    });

  }

  submitTaskName() {
    let info = this.assignNewTask.value;
    let tname = info['task_name'];
    let description = info['task_description'];
    let start_date = info['start_date'];
    let end_date = info['end_date']

    let assigned_to = [];
    let subscribers = [];

    for (let i = 0; i < info['assigned_employees'].length; i++) {
      for (let j = 0; j < this.assignedEmployeesToProject.length; j++) {
        if (info['assigned_employees'][i] === this.assignedEmployeesToProject[j].empId) {
          assigned_to.push(this.assignedEmployeesToProject[j])
        }
      }
    }

    for (let i = 0; i < info['subscribers'].length; i++) {
      for (let j = 0; j < this.assignedEmployeesToProject.length; j++) {
        if (info['subscribers'][i] === this.assignedEmployeesToProject[j].empId) {
          subscribers.push(this.assignedEmployeesToProject[j])
        }
      }
    }

    let task = {
      assigned_to: assigned_to,
      subscribers: subscribers,
      task_name: tname,

      task_description: description,
      task_start_date: start_date,
      task_end_date: end_date,
      task_completed: 0
    }


    this.db
      .collection('projects').doc(this.projectId)
      .collection('tasks').add(task)
      .then(res => {
        this.db
          .collection('projects').doc(this.projectId)
          .collection('tasks').doc(res.id)
          .set({ fStoreId: res.id }, { merge: true })
        this.assignNewTask.reset();
        this.toggleModal()
      })
    // this.showAddTask = false;
  }


  delTask(taskId) {
    this.db
      .collection('projects').doc(this.projectId)
      .collection('tasks').doc(taskId)
      .delete()
  }


  assignTask(id) {
    this.assign = true;
    this.taskId = id
    this.taskNames[id] = true;
  }

  submitAssignName(form: NgForm) {

    const assigned_employees = form.value.assigned_employees ? form.value.assigned_employees : [];
    const assigned_subscribers = form.value.subscribers ? form.value.subscribers : [];

    let keys = Object.keys(this.assignedEmployeesToProject);
    let employee = [];
    let subscribers = [];
    for (let i = 0; i < keys.length; i++) {
      for (let j = 0; j < assigned_employees.length; j++) {
        if (this.assignedEmployeesToProject[keys[i]].empId === assigned_employees[j]) {
          employee.push(this.assignedEmployeesToProject[keys[i]])
        }
      }
      for (let j = 0; j < assigned_subscribers.length; j++) {
        if (this.assignedEmployeesToProject[keys[i]].empId === assigned_subscribers[j]) {
          subscribers.push(this.assignedEmployeesToProject[keys[i]])
        }

      }
    }

    let task = this.allTask.filter(task => task.fStoreId === this.taskId)

    let emps = task[0].assigned_to ? task[0].assigned_to : [];
    let subs = task[0].subscribers ? task[0].subscribers : []


    let assigned_emps = []
    let assigned_subs = []

    if (emps.length > 0) {
      keys = Object.keys(emps);
      for (let i = 0; i < keys.length; i++) {
        assigned_emps.push(emps[keys[i]])
      }

    }
    if (subs.length > 0) {
      keys = Object.keys(subs);
      for (let i = 0; i < keys.length; i++) {
        assigned_subs.push(subs[keys[i]])
      }
    }


    for (let i = 0; i < employee.length; i++) {
      assigned_emps.push(employee[i])
    }
    for (let i = 0; i < subscribers.length; i++) {
      assigned_subs.push(subscribers[i])
    }


    this.db
      .collection('projects').doc(this.projectId)
      .collection('tasks').doc(this.taskId)
      .set({ assigned_to: assigned_emps, subscribers: assigned_subs }, { merge: true })

    form.reset()
  }

  toggleAssignEmployee(id) {
    this.taskNames[id] = false;
  }
  toggleModal() {
    this.modalOpen = !this.modalOpen
  }

  removeEmployeeFromTask(taskId, id) {
    let allTask = this.allTask.filter(e => e.fStoreId === taskId);
    let obj = allTask[0].assigned_to.filter(e => e.fStoreId === id)
    console.log(obj[0])

    this.db
      .collection('projects').doc(this.projectId)
      .collection('tasks').doc(taskId)
      .update({
        assigned_to: firebase.firestore.FieldValue.arrayRemove(obj[0])
      })
  }

  removeSubscriberFromTask(taskId, id) {
    let allTask = this.allTask.filter(e => e.fStoreId === taskId);
    let obj = allTask[0].subscribers.filter(e => e.fStoreId === id)

    this.db
      .collection('projects').doc(this.projectId)
      .collection('tasks').doc(taskId)
      .update({
        subscribers: firebase.firestore.FieldValue.arrayRemove(obj[0])
      })
  }


}
