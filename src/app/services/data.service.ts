import { Injectable } from '@angular/core';
import { UIService } from '../services/ui.service';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  UI_ref = firebase.database().ref('UIs/');
  constructor() { }

  pushToFirebase(ui: UIService)
  {
    let newRef = this.UI_ref.push();
    newRef.set({
      'name' : ui.getName(),
      'isPublic' : ui.getPublic(),
      'objects' : ui.getObjects()
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
}
