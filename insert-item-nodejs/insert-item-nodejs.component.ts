import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-insert-item-nodejs',
  templateUrl: './insert-item-nodejs.component.html',
  styleUrls: ['./insert-item-nodejs.component.css']
})
export class InsertItemNodejsComponent implements OnInit {
  insertForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.insertForm = this.fb.group({
      id: ['',Validators.required],
      name: ['',Validators.required],
      age: ['',Validators.required],
      position: ['',Validators.required],
      date: ['',Validators.required],
      school:['',Validators.required]
    })
   }

  ngOnInit(): void {
    
  }
  addPeople(){};
}
