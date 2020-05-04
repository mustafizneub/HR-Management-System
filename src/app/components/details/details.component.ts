import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  routeParameter = {
    category: '',
    categoryname: '',
    objectId: '',
  }
  object:any;

  constructor( 
    private route: ActivatedRoute,
    private firestore: AngularFirestore) { 
    this.routeParameter.category = this.route.snapshot.paramMap.get('category');
    this.routeParameter.categoryname = this.route.snapshot.paramMap.get('categoryname');
    this.routeParameter.objectId = this.route.snapshot.paramMap.get('objectId');
    this.object = this.route.snapshot.paramMap.get('object');

  }

  ngOnInit(): void {
          var objectId = this.routeParameter.objectId; 
          this.firestore.collection('Tally').doc(objectId).valueChanges().subscribe(object=> {
            this.object = object;
        }, error => {

        });
  }

}
