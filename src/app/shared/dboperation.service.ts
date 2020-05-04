import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import 'firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class DboperationService {

  id:number=0;
  constructor(
    private db: AngularFirestore, 
    private storage: AngularFireStorage
  ){ }
  
  
  //add client
  addClient(client) {
    
    this.id++;
    var str=this.id.toString();
    this.db.collection('clients').doc(str).set({
      id:this.id,
      name:client['name'],
      email:client['email'],
      contact_number:client['mobileNumber']
     })
  }

  
}
