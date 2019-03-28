import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ObjectService {

  private _type: string;
  private _width:number;
  private _label:string;
  private _height:number;
  private _channel: number;
  private _value: number;
  private _row: number;
  private _col: number;

  constructor( type:string, width:number, height:number, 
  	           channel:number, value:number ) 
  { 
  	this._type = type;
    this._width = width;
    this._height = height;
    this._channel = channel;
    this._value = value;
  }

  setPos(row:number, col:number)
  {
  	this._row = row;
  	this._col = col;
  }

  addLabel(label:string)
  {
  	this._label = label;
  }

  // return type, row, and column position needed
  // for drawing an object
  getDrawVals()
  {
  	let retItems:any = [];
  	retItems.push(this._type, this._row, this._col, this._width, this._height);
  	return retItems;
  }

  getWidth(){return this._width;}
  getHeight(){return this._height;}
  getRow(){return this._row;}
  getCol(){return this._col;}
  getType(){return this._type;}
  getChannel(){return this._channel;}
  getValue(){return this._value;}

}
