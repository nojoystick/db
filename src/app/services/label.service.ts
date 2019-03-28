import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LabelService {

_type: string;
_label: string
  constructor(text:string) 
  { 
    this._type = "label";
    this._label = "text";
  }
}
