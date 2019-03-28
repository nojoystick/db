import { Injectable } from '@angular/core';
import { ObjectService } from './object.service';
import { LabelService } from './label.service';
import { ButtonService } from './button.service';
import { SliderService } from './slider.service';
import { SwitchService } from './switch.service';
import { SpacerService } from './spacer.service';

@Injectable({
  providedIn: 'root'
})
export class UIService {

_name:string;
_isPublic:boolean;
_objects:Array<ObjectService> = [];

  constructor(name:string, isPublic:boolean) 
  { 
    this._name = name;
    this._isPublic = isPublic;
  }

  addObject(obj:ObjectService, row:number, col:number)
  {
    obj.setPos(row, col);
    this._objects.push(obj);
  }

  addObjects(objs:ObjectService[], row:number[], col:number[])
  {
    for(var i = 0; i < objs.length; i++)
    {
    	objs[i].setPos(row[i], col[i])
    	this._objects.push(objs[i]);
    }
  }

  objectFactory(type:string, row:number, col:number, channel:number, value:number): void;
  objectFactory(type:string, row:number, col:number, channel:number, value:number, maxVal:number): void;

  objectFactory(type:string, row:number, col:number, channel:number, value:number, maxVal?:number)
  {
    // this is as close as you can get to an overloaded method in typescript :-(
    var obj:ObjectService;
    if(maxVal != null)
    {
      obj = new SliderService(channel, value, maxVal);
    }
    else
    {
    switch(type)
    {
    	case("button"):
        obj = new ButtonService(channel, value);
    	break;
    	case("switch"):
        obj = new SwitchService(channel, value);
    	break;
    	case("spacer"):
        // channel and value here are used for width/height
    	  obj = new SpacerService(channel, value);
    	break;
    }
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

  getObjects()
  {
  	return this._objects;
  	for(var i:number = 0; i < this._objects.length; i++)
  	{
  		console.log(this._objects[i].getDrawVals());
  	}
  }

  getName()
  {
  	return this._name;
  }
}
