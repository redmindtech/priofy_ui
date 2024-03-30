import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-devaition',
  templateUrl: './devaition.component.html',
  styleUrls: ['./devaition.component.css']
})
export class DevaitionComponent implements OnInit {
  @Input() devaitionformenable: boolean;
  checklistformenable: boolean = true;
  constructor() { }

  ngOnInit(): void {
  }
  submit(){
    this.checklistformenable=false;
  }
}
