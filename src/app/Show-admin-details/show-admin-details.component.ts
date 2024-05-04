import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-show-admin-details',
  templateUrl: './show-admin-details.component.html',
  styleUrls: ['./show-admin-details.component.css']
})
export class ShowAdminDetailsComponent implements OnInit {
  editfield: boolean;
  catagory: string;
  Procedure: FormGroup;
  listData: any[] = []; 
  constructor(private fb: FormBuilder) { 
    this.Procedure = this.fb.group({
      Furnace_Id: [''],
      // job_plan_date:[''],
      job_start_date:[''],
      job_start_time:[''],
      job_end_date:[''],
      job_end_time:[''],
      oot_operator:[''],
      iot_operator:[''],
      status:[''],
      comments:[''],
      catagory:[''],
      other_qualification:[''],
      Attributes:['']
    });
  }
  addbutton=false;
  addItem(): void {
    this.addbutton=true;
    if (this.Procedure.valid) {
      this.listData.push(this.Procedure.value);
      this.Procedure.reset();
    }
  }
 

  ngOnInit(): void {
    this.buttonviewmeeting();
  }
  
  buttonviewmeeting(){
    
    
   
      this.editfield = false;
    
   
    }
    // onNoClick(): void {
    //   this.dialogRef.close();
    // }
    // onSubmit(Procedure:any){
    //   console.log(Procedure);
    // } 
}
