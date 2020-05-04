import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-applicant-list',
  templateUrl: './applicant-list.component.html',
  styleUrls: ['./applicant-list.component.css']
})
export class ApplicantListComponent implements OnInit {

  information=[];
  isPaginate = false;
  id;
  reservedInfo;
  term;
  salary=10000;
  config = {
    id: 'custom',
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: this.information.length
  };

  constructor(
    private afd:AngularFireDatabase,
    private route: ActivatedRoute,
    private afs: AngularFirestore) { 
       
      

    }

  ngOnInit(): void {
    this.route.params.subscribe(x=>{
      this.id = x.id;
      this.afs.collection('/profile', ref=> ref.where('jobId', '==', this.id))
      .snapshotChanges()
      .subscribe(x => {
        this.information = x.map(e => {
          return ({
            id: e.payload.doc.id,
            data: e.payload.doc.data()
          })
        })
        if(this.information.length>this.config.itemsPerPage){
          this.isPaginate = true;
        }
        this.reservedInfo = this.information;
      })
    })


  }

  onPageChange(event){
    this.config.currentPage = event;
  }


  addShortlist(id){
    this.afs.collection('profile').doc(id).update({
      isSelected:1
    }).then(x=>{
      this.afd.database.ref('profile').child(id).update({
        isSelected:1
      })
    })
  }

  deleteCv(id){
    let result = confirm('Are you want to delete?');
    if(result){
      this.afs.collection('profile').doc(id).delete().then(x=>{
        this.afd.database.ref('profile').child(id).remove()
      });
    }
    
  }
  filter(){
    let filteredArray = [];
    for(let i = 0; i<this.reservedInfo.length; i++){
      if(this.reservedInfo[i].data.answers != undefined){
        if (this.reservedInfo[i].data.answers.question1.toLowerCase().includes(this.term.toLowerCase())||
      this.reservedInfo[i].data.answers.question2.toLowerCase().includes(this.term.toLowerCase()) 
      ){
        filteredArray.push(this.reservedInfo[i])
        console.log(filteredArray)
      }
      }
      
    }
    this.information = filteredArray.length>0?filteredArray:[];
  }

  filterSalary(){
    let filteredArray = [];
    for(let i=0;i<this.reservedInfo.length; i++){
      if(this.reservedInfo[i].data.answers != undefined){
        if(parseInt(this.reservedInfo[i].data.answers.question3) <= this.salary){
          filteredArray.push(this.reservedInfo[i]);
          
        }
      }
    }
    this.information = filteredArray.length>0?filteredArray:[];
    
  }

}
