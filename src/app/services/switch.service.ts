import { Injectable } from '@angular/core';
import { ObjectService } from './object.service';
@Injectable({
  providedIn: 'root'
})
export class SwitchService extends ObjectService {
private _onVal;

  constructor( channel:number, offVal:number, onVal:number, label:string ) 
  { 
  	var type = "switch";
  	var switchWidth = 1;
  	var switchHeight = 1;
  	super(type, switchWidth, switchHeight, channel, offVal, label);
  	this._onVal = onVal;
  }

  getOnVal(){return this._onVal;}
}
