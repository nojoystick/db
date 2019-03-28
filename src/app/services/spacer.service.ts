import { Injectable } from '@angular/core';
import { ObjectService } from './object.service';

@Injectable({
  providedIn: 'root'
})
export class SpacerService extends ObjectService{

  constructor(width:number, height:number) 
  { 
  	var type:string = "spacer";
  	super(type, width, height, 0, 0);
  }
}
