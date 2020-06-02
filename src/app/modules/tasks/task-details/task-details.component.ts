import * as firebase from "firebase/app";
import "firebase/database";
import "firebase/firestore";

import { AngularFirestore } from '@angular/fire/firestore';
import { combineLatest } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
declare var $: any;
import { interval } from 'rxjs';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {

  taskId: any;
  projectId: any;
  task: any;
  project: any;
  assignedEmployees: any;
  reservedEmployees: any;
  completion_percentage: number
  comments: any;

  reply: string = '';
  comment: string = '';

  commentIds = [];
  editCommentIds = []

  assigned_employees;
  subscribers;
  taskAssignedTo: [];
  assignedSubscribers: [];
  editComment: boolean;
  commentEditable = {};
  editClient: boolean = false;
  editStartDate: boolean = false;
  editEndDate: boolean = false;
  editCompletedPercent: boolean = false;
  addEmployeeToTask: boolean = false;
  addSubToTask: boolean = false;




  // TEST
  selectedEmps = [];
  empAddedCheck = {};

  selectedSubs = [];
  subAddedCheck = {};
  _assignedEmployees: any;
  _reservedEmployees: any;
  constructor(
    private router: Router,
    private aRoute: ActivatedRoute,
    private db: AngularFirestore) { }

  ngOnInit(): void {
    interval(1000).subscribe(() => {
      let editKeys = Object.keys(this.commentEditable);
      for (const key of editKeys) {
        let date = Date.now()
        if (this.commentEditable[key].editable_till <= date) {
          this.commentEditable[key].editable = false;
        }
      }
    })


    combineLatest(
      this.aRoute.params,
      this.aRoute.queryParams
    ).subscribe(obs => {
      this.taskId = obs[0].id;
      this.projectId = obs[1].project;
    })


    let dbRef = this.db.collection('projects').doc(this.projectId)

    dbRef
      .valueChanges()
      .subscribe(e => {
        this.project = e;
        this.assignedEmployees = this.project['assigned_employees']

        this._assignedEmployees = this.project['assigned_employees']


        let keys = Object.keys(this.assignedEmployees);
        for (let key of keys) {
          this.subAddedCheck[this.assignedEmployees[key].empId] = false;
        }
        this.reservedEmployees = Object.assign({}, this.assignedEmployees)
        this._reservedEmployees = Object.assign({}, this._assignedEmployees)
      })


    dbRef
      .collection('tasks').doc(this.taskId)
      .valueChanges()
      .subscribe(e => {
        this.task = e;
        this.taskAssignedTo = this.task['assigned_to']
        this.assignedSubscribers = this.task['subscribers'];
      })

    dbRef
      .collection('tasks').doc(this.taskId)
      .collection('comments').valueChanges()
      .subscribe(e => {
        this.comments = e;
        let keys = Object.keys(this.comments);

        let date = Date.now()
        for (const elem of this.comments) {
          if (elem.editable_till > date) {
            this.commentEditable[elem.fStoreId] = {
              editable: true,
              editable_till: elem.editable_till
            };
          } else {
            this.commentEditable[elem.fStoreId] = {
              editable: false,
              editable_till: elem.editable_till
            };
          }
        }
      })
  }

  sendReply(commentId, form: NgForm) {
    let comments = this.comments;
    let keys = Object.keys(comments);
    let replies;
    keys.forEach(key => {
      if (comments[key].fStoreId === commentId) {
        replies = comments[key].replies
      }
    })
    let reply = {
      commentator: "Anonymous Reply",
      reply_time: Date.now(),
      reply: form.value.reply
    }
    replies.push(reply)
    this.db
      .collection('projects').doc(this.projectId)
      .collection('tasks').doc(this.taskId)
      .collection('comments').doc(commentId)
      .set({ replies: replies }, { merge: true })
    form.reset()

  }

  sendComment() {
    var d = new Date();
    let comment = {
      comment: this.comment,
      comment_time: Date.now(),
      editable_till: d.setTime(d.getTime() + 60000),
      editable: true,
      commentator: "Anonymous Name",
      replies: []
    }
    let dbRef = this.db
      .collection('projects').doc(this.projectId)
      .collection('tasks').doc(this.taskId)
      .collection('comments');

    dbRef
      .add(comment)
      .then(res => {
        dbRef.doc(res.id).set({ fStoreId: res.id }, { merge: true })
      })
    this.comment = '';
  }

  toggleReply(id) {
    if (this.commentIds[id] === true) {
      this.commentIds[id] = false;
    } else {
      this.commentIds[id] = true
    }
  }

  submitAssignName(val) {

    const assigned_employees = this.selectedEmps;

    let keys = Object.keys(this._assignedEmployees);
    let employee = [];
    for (let i = 0; i < keys.length; i++) {
      for (let j = 0; j < assigned_employees.length; j++) {
        if (this._assignedEmployees[keys[i]].empId === assigned_employees[j]) {
          employee.push(this._assignedEmployees[keys[i]])
        }
      }
    }

    let emps = this.taskAssignedTo;

    let assigned_emps = []

    if (emps.length > 0) {
      keys = Object.keys(emps);
      for (let i = 0; i < keys.length; i++) {
        assigned_emps.push(emps[keys[i]])
      }
    }



    for (let i = 0; i < employee.length; i++) {
      assigned_emps.push(employee[i])
    }


    this.db
      .collection('projects').doc(this.projectId)
      .collection('tasks').doc(this.taskId)
      .set({ assigned_to: assigned_emps }, { merge: true })

    // form.reset()
    this.toggleAddEmployee()
  }


  submitSubsName(val) {
    // console.log(form.value)
    const assigned_subscribers = this.selectedSubs
    console.log(assigned_subscribers)
    let keys = Object.keys(this.reservedEmployees);
    let subscribers = [];
    for (let i = 0; i < keys.length; i++) {
      for (let j = 0; j < assigned_subscribers.length; j++) {
        if (this.reservedEmployees[keys[i]].empId === assigned_subscribers[j]) {
          subscribers.push(this.reservedEmployees[keys[i]])
        }
      }
    }
    let subs = this.assignedSubscribers;
    let assigned_subs = []
    if (subs.length > 0) {
      keys = Object.keys(subs);
      for (let i = 0; i < keys.length; i++) {
        assigned_subs.push(subs[keys[i]])
      }
    }

    for (let i = 0; i < subscribers.length; i++) {
      assigned_subs.push(subscribers[i])
    }


    this.db
      .collection('projects').doc(this.projectId)
      .collection('tasks').doc(this.taskId)
      .set({ subscribers: assigned_subs }, { merge: true })

    // // form.reset()
    // this.toggleAddSub()
  }

  removeEmployeeFromTask(id) {
    let obj = this.taskAssignedTo.filter(e => e['fStoreId'] === id)

    this.db
      .collection('projects').doc(this.projectId)
      .collection('tasks').doc(this.taskId)
      .update({
        assigned_to: firebase.firestore.FieldValue.arrayRemove(obj[0])
      })
  }

  removeSubscriberFromTask(id) {
    let obj = this.assignedSubscribers.filter(e => e['fStoreId'] === id)

    this.db
      .collection('projects').doc(this.projectId)
      .collection('tasks').doc(this.taskId)
      .update({
        subscribers: firebase.firestore.FieldValue.arrayRemove(obj[0])
      })
  }


  updateComment(form: NgForm, id) {
    this.db
      .collection('projects').doc(this.projectId)
      .collection('tasks').doc(this.taskId)
      .collection('comments').doc(id)
      .update({ comment: form.value.updateComment })

    form.reset();
    this.toggleCommentEdit(id);
  }

  toggleCommentEdit(id) {
    if (this.editCommentIds[id] === true) {
      this.editCommentIds[id] = false;
    } else {
      this.editCommentIds[id] = true;
    }
  }


  updateClient(form: NgForm) {
    this.db.collection('projects').doc(this.projectId).set({ client: form.value.projectClient }, { merge: true })
  }

  updateStartDate(form: NgForm) {
    this.db
      .collection('projects').doc(this.projectId)
      .collection('tasks').doc(this.taskId)
      .set(
        { task_start_date: form.value.taskStartDate },
        { merge: true }
      )
  }
  updateEndDate(form: NgForm) {
    this.db
      .collection('projects').doc(this.projectId)
      .collection('tasks').doc(this.taskId)
      .set(
        { task_end_date: form.value.taskEndDate },
        { merge: true }
      )
  }

  updatePercentage(ffff: NgForm) {
    this.db
      .collection('projects')
      .doc(this.projectId)
      .collection('tasks')
      .doc(this.taskId)
      .set({ task_completed: ffff.value.completionPercentage }, { merge: true })
  }

  toggleEditClient() {
    this.editClient = !this.editClient
  }
  toggleEditStartDate() {
    this.editStartDate = !this.editStartDate
  }
  toggleEditEndDate() {
    this.editEndDate = !this.editEndDate
  }
  toggleEditPercentage() {
    this.editCompletedPercent = !this.editCompletedPercent;
  }
  toggleAddEmployee() {

    this.selectedEmps = []

    this.addEmployeeToTask = !this.addEmployeeToTask
  }
  toggleAddSub() {
    let subkeys = Object.keys(this.reservedEmployees);
    this.selectedSubs = []
    this.addSubToTask = !this.addSubToTask;
  }



  // TEST

  filterEmpList(event) {
    let keys = Object.keys(this.assignedEmployees);

    let filteredArray = []
    for (let key of keys) {
      if (this._reservedEmployees[key].employee.toLowerCase().includes(event.target.value.toLowerCase()) && event.target.value != '') {
        filteredArray.push(this._reservedEmployees[key])
      }
    }

    if (filteredArray.length > 0) {
      this._assignedEmployees = filteredArray;
      filteredArray = []
    } else {
      let subkeys = Object.keys(this.reservedEmployees);
      this._assignedEmployees = []
      for (let key of subkeys) {
        this._assignedEmployees.push(this.reservedEmployees[key])
      }
    }
  }

  selectEmps(event) {
    let val = event.target.value.split(": ")
    val = val[1].split('\'')
    console.log(val)
    this.empAddedCheck[val[1]] = true;
    console.log(this.empAddedCheck)
    this.selectedEmps.push(val[1])
  }
  removeFromSelectedEmp(val) {
    console.log(val)
    for (let i = 0; i < this.selectedEmps.length; i++) {
      if (this.selectedEmps[i] === val) {

        this.selectedEmps.splice(i, 1)
        this.empAddedCheck[val] = false;
        break;
      }
    }
  }


  filterSubList(event) {

    let keys = Object.keys(this.assignedEmployees);

    let filteredArray = []
    for (let key of keys) {
      if (this.reservedEmployees[key].employee.toLowerCase().includes(event.target.value.toLowerCase()) && event.target.value != '') {
        filteredArray.push(this.reservedEmployees[key])
      }
    }

    if (filteredArray.length > 0) {
      this.assignedEmployees = filteredArray;
      filteredArray = []
    } else {
      let subkeys = Object.keys(this.reservedEmployees);
      this.assignedEmployees = []
      for (let key of subkeys) {
        this.assignedEmployees.push(this.reservedEmployees[key])
      }

    }
  }

  selectSubs(event) {
    let val = event.target.value.split(": ")
    val = val[1].split('\'')
    console.log(val)
    this.subAddedCheck[val[1]] = true;
    console.log(this.subAddedCheck)
    this.selectedSubs.push(val[1])
  }
  removeFromSelectedSub(val) {
    for (let i = 0; i < this.selectedSubs.length; i++) {
      if (this.selectedSubs[i] === val) {
        this.selectedSubs.splice(i, 1)
        this.subAddedCheck[val] = false;
        break;
      }
    }
  }

}
