import { Injectable } from '@angular/core';
import { ObjectService } from './object.service';
import { LabelService } from './label.service';
import { ButtonService } from './button.service';
import { SliderService } from './slider.service';
import { SwitchService } from './switch.service';
import { SpacerService } from './spacer.service';

import * as firebase from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class UIService {

_name:string;
_isPublic:boolean;
_objects:Array<ObjectService> = [];
_ownerid = "";
_description = "";
NUM_ROWS:number = 8;
NUM_COLS:number = 4;

  constructor(name:string, description: string, isPublic:boolean) 
  { 
    this._name = name;
    this._description = description;
    this._isPublic = isPublic;
    this.dumpObjects();
  }
  dumpObjects()
  {
    //default: fill with spacers
    for(var i = 1; i <= this.NUM_ROWS; i++)
      for(var j = 1; j <= this.NUM_COLS; j++)
        this.objectFactory("spacer", i, j, 1, 1, "");
  }
  addObject(obj:ObjectService, row:number, col:number)
  {
    //overwrite old object at this position
    obj.setPos(row, col);
    for(var i = 0; i < this._objects.length; i++)
    {
      if(( this._objects[i].getRow() == row) && (this._objects[i].getCol() == col) )
      {
        this._objects[i] = obj;
        return;
      }
    }
    this._objects.push(obj);
  }

  addObjects(objs:ObjectService[], row:number[], col:number[])
  {
    for(var i = 0; i < objs.length; i++)
    {
    	objs[i].setPos(row[i], col[i]);
    	this._objects.push(objs[i]);
    }
  }

  objectFactory(type:string, row:number, col:number, channel:number, value:number, label:string, value2?:number)
  {
    var obj:ObjectService;

    switch(type)
    {
      case("switch"):
          obj = new SwitchService(channel, value, value2, label);
      break;
      case("slider"):
          obj = new SliderService(channel, value, label);
      break;
    	case("button"):
        obj = new ButtonService(channel, value, label);
    	break;
    	case("spacer"):
        // channel and value here are used for width/height
    	  obj = new SpacerService(channel, value);
    	break;
    }
  	this.addObject(obj, row, col)
  }

  drawVals()
  {
  	let retItems:any = [];
    for(var i:number = 0; i < this._objects.length; i++)
    	retItems.push(this._objects[i].getDrawVals());
    return retItems;
  }

  setOwnerID(id:any) { this._ownerid = id; }
  getObjects(){ return this._objects; }
  getName(){ return this._name; }
  getPublic(){ return this._isPublic; }
  getOwnerID() { return this._ownerid; }
  getDescription() { return this._description; }

}
