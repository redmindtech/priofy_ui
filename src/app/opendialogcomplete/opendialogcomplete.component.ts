import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ChecklistFComponent } from '@app/checklist-f/checklist-f.component';

@Component({
  selector: 'app-opendialogcomplete',
  templateUrl: './opendialogcomplete.component.html',
  styleUrls: ['./opendialogcomplete.component.css']
})
export class OpendialogcompleteComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ChecklistFComponent>) { }

  ngOnInit(): void {
  }
 
  closeDialog(): void {
    this.dialogRef.close();
   
  }
 
}
