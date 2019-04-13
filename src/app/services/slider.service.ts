import { Injectable } from '@angular/core';
import { ObjectService } from './object.service';

@Injectable({
  providedIn: 'root'
})
export class SliderService extends ObjectService {
  constructor(channel:number, value:number, label:string) 
  { 
    var type = "slider";
  	var sliderWidth = 4;
    var sliderHeight = 1;
    
    super(type, sliderWidth, sliderHeight, channel, value, label);
  }
}
