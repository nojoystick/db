import { Injectable } from '@angular/core';
import { ObjectService } from './object.service';
@Injectable({
  providedIn: 'root'
})
export class SwitchService extends ObjectService {

  constructor( channel:number, value:number ) 
  { 
  	var type = "switch";
  	var switchWidth = 2;
  	var switchHeight = 1;
  	super(type, switchWidth, switchHeight, channel, value);
  }
}
