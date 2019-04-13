import { Injectable } from '@angular/core';
import { ObjectService } from './object.service';

@Injectable({
  providedIn: 'root'
})
export class ButtonService extends ObjectService {
  constructor( channel:number, value:number, label:string) 
  { 
  	var type = "button";
  	var buttonHeight = 1;
  	var buttonWidth = 1;
    super(type, buttonHeight, buttonWidth, channel, value, label);
  }


}
