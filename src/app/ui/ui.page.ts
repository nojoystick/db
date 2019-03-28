/*
 * UI page
 *
 * Functions:
 * * Use UI to transmit over BLE to device
 * * Delete UI
 *
 * Routes:
 * * Home page (Tab1)
 *
 */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { UIService } from '../services/ui.service';
import { ObjectService } from '../services/object.service';

@Component({
  selector: 'app-ui',
  templateUrl: './ui.page.html',
  styleUrls: ['./ui.page.scss'],
})
export class UIPage implements OnInit {
  NUM_ROWS:number = 8;
  NUM_COLS:number = 4;
  UI:UIService;
  objects:Array<ObjectService> = [];
  rows:Array<number> = [1, 2, 3, 4, 5, 6, 7, 8];
  cols:Array<number> = [1, 2, 3, 4];
  sizes:number[][] = [];
  val:number;
  sliderForm:FormGroup;

  constructor(private router: Router,  public formBuilder: FormBuilder) 
  { 
    this.UI = new UIService("generic UI", false);
    /*
    for(var i = 1; i <= this.NUM_ROWS; i++)
    	for(var j = 1; j <= this.NUM_COLS; j++)
    		this.UI.objectFactory("spacer", i, j, 0, 0);
    */
    this.UI.objectFactory("button", 1, 1, 1, 0);
    this.UI.objectFactory("button", 1, 2, 2, 0);
    this.UI.objectFactory("button", 1, 3, 3, 0);
    this.UI.objectFactory("button", 1, 4, 4, 0);

    this.UI.objectFactory("switch", 2, 1, 5, 0);
    this.UI.objectFactory("switch", 2, 2, 6, 0);
    this.UI.objectFactory("switch", 3, 1, 7, 0);
    this.UI.objectFactory("switch", 3, 2, 8, 0);

    this.UI.objectFactory("slider", 4, 1, 9, 0, 10);
  
    this.UI.objectFactory("button", 7, 1, 10, 0);
    this.UI.objectFactory("button", 7, 2, 11, 0);
    this.UI.objectFactory("switch", 7, 3, 12, 0);
    this.UI.objectFactory("switch", 8, 1, 13, 0);
    this.UI.objectFactory("button", 8, 2, 14, 0);
    this.UI.objectFactory("button", 8, 3, 15, 0);



    for(var i = 0; i < this.NUM_ROWS; i++)
    	this.rows[i] = i+1;
    for(var i = 0; i < this.NUM_COLS; i++)
    	this.cols[i] = i+1;

    var r, c, sizes:number[][] = [];
    for(r = 0; r < this.NUM_ROWS; r++)
    {
      sizes[r]=[];
      for(c = 0; c < this.NUM_COLS; c++)
      	sizes[r][c] = 0;
    }
    this.sizes = sizes;
  }

  ngOnInit() 
  {
    this.sliderForm = this.formBuilder.group({
      slideVal: new FormControl('', Validators.required)
    });

    this.objects = this.UI.getObjects();
    this.getSpacers();
    this.sortObjects();
    for(var i = 0; i < this.objects.length; i++)
    {
      var temp:ObjectService = this.objects[i];
      var r = temp.getRow();
      var c = temp.getCol();
      if(!this.sizes[r]) this.sizes[r]=[];
      this.sizes[r][c] = temp.getWidth();
    }
  }

  sortObjects()
  {
    //sort by column, then sort by row
    this.objects.sort(function(obj1, obj2)
    {
    	return obj1.getCol() - obj2.getCol();
    })
    this.objects.sort(function(obj1, obj2)
    {
      return obj1.getRow() - obj2.getRow();
    });
  }

  getSpacers()
  {
    // fill object array with spacers as needed
    //where is a spacer needed?
    // -if a row is empty
    // -if slots within the same row are empty
    var rowExists:boolean = false;
    for(var i = 1; i <= this.NUM_ROWS; i++)
    {
      for(var j = 0; j < this.objects.length; j++)
      {
        if(this.objects[j].getRow() == i)
        {
    	  rowExists = true;
    	  continue;
    	}
      }
      if(rowExists == false)
    	{
    		this.UI.objectFactory("spacer", i, 1, 4, 1);
    	}
    	else rowExists = false;
    }
  }

  handler(channel:number, value)
  {
    console.log("WRITING "+value+" TO CHANNEL "+channel);
  }
  goBack(){
    this.router.navigate(['/tabs/tab1']);
  }

}
