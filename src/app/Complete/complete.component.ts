import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ShowAdminDetailsComponent } from '@app/Show-admin-details/show-admin-details.component';

@Component({
  selector: 'app-complete',
  templateUrl: './complete.component.html',
  styleUrls: ['./complete.component.css']
})
export class CompleteComponent implements OnInit {

  listData: any[] = []; // Define your listData array here

  displayedColumns: string[] = ['index', 'Furnace_Id', 'job_plan_date', 'job_start_date', 'job_end_date', 'oot_operator', 'iot_operator', 'status'];

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    // Initialize listData with your data
    this.listData = [
      { index: 1, Furnace_Id: 'F1', job_plan_date: '2024-04-01', job_start_date: '2024-04-02', job_end_date: '2024-04-03', oot_operator: 'Operator1', iot_operator: 'Operator2', status: 'Completed' },
      { index: 2, Furnace_Id: 'F2', job_plan_date: '2024-04-04', job_start_date: '2024-04-05', job_end_date: '2024-04-06', oot_operator: 'Operator2', iot_operator: 'Operator3', status: 'In Progress' },
      // Add more objects as needed
    ];
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ShowAdminDetailsComponent, {
      width: '1000px',
      height: '600px',
      data: { listData: this.listData }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}

