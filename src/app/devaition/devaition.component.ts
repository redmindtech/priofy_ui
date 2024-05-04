import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-devaition',
  templateUrl: './devaition.component.html',
  styleUrls: ['./devaition.component.css']
})
export class DevaitionComponent implements OnInit {
  @Input() devaitionformenable: boolean;
  checklistformenable: boolean = true;
  open1:boolean;
  @Input() printexpand3: boolean = false; // Initialize printexpand when declared

  printexpand4: boolean = this.printexpand3; 
  @Input() expand: boolean;
  constructor(
    private toast: MatSnackBar,
  ) { }

  ngOnInit(): void {
  }
  submit(){
    
  }
  showmsg(){
    this.toast.open('Please select "Agree" only.', 'Close', { duration: 3000 });
  }
  nxt(){
    this.checklistformenable=false;
    this.expand = false;
    this.open1 =true
  }
}
