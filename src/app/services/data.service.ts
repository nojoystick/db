import { Injectable } from '@angular/core';
import { UIService } from '../services/ui.service';
import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  UI_ref = firebase.database().ref('UI_Collections/');
  constructor( public db: AngularFirestore ) { }

  pushToFirebase(ui: UIService)
  {
    this.db.collection('UI_Collections/').add({
      "ownerid":ui.getOwnerID(), 
      "name":ui.getName(), 
      "description": ui.getDescription(),
      "publish": ui.getPublic(),
      "objects": JSON.parse(JSON.stringify(ui.getObjects()))
    });
    
  }
  
  deleteById(id:number)
  {
    firebase.database().ref('UIs/'+id).remove();
  }

  deleteUI(currentItem)
  {
    let newInfo = firebase.database().ref('UIs'+currentItem.id).remove();
  }

  deleteByName(name:string)
  {
    var id;
    this.UI_ref.orderByChild('name').equalTo(name).on("value",function(data){
        data.forEach(function(data){
          id = data.val().key;
      })
    })
    this.deleteById(id);
  }

  editUI(currentItem)
  {
    let newInfo = firebase.database().ref('UIs/'+currentItem.id).update(currentItem);
  }
  getUserID(){ return firebase.auth().currentUser.uid; }
}
