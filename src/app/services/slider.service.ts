import { Injectable } from '@angular/core';
import { ObjectService } from './object.service';

@Injectable({
  providedIn: 'root'
})
export class SliderService extends ObjectService {
private _maxVal:number;
  constructor(channel:number, value:number, maxVal:number) 
  { 
    var type = "slider";
  	var sliderWidth = 4;
    var sliderHeight = 1;
    super(type, sliderWidth, sliderHeight, channel, value);
    this._maxVal = maxVal;
  }

  getMaxVal(){ return this._maxVal; }
}
