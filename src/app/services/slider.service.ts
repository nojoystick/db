import { Injectable } from '@angular/core';
import { ObjectService } from './object.service';

@Injectable({
  providedIn: 'root'
})
export class SliderService extends ObjectService {
  constructor(channel:number, value?:number) 
  { 
    var type = "slider";
  	var sliderWidth = 4;
    var sliderHeight = 1;

    // All slider objects will transmit range 0 - 1024,
    // mimicking the behavior of a hardware pot
    if(value == null)
      var value = 0;
    
    super(type, sliderWidth, sliderHeight, channel, value);
  }
}
