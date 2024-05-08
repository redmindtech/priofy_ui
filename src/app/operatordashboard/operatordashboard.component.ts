import {
  Component,
  OnInit
} from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-operatordashboard',
  templateUrl: './operatordashboard.component.html',
  styleUrls: ['./operatordashboard.component.css']
})
export class OperatordashboardComponent implements OnInit {

  DATA_COUNT: number;

  labels: any;

  constructor() {}
  myChart: any;
  ctx: any;
  flag: boolean = false;
  test: string = 'ahgah'
  public chart: any;
  dataChart: any;
  shiftData: any;
  currentShift: any;
  currentUser:any;

  ngOnInit(): void {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUser = storedUser ? JSON.parse(storedUser) : null;
    // let name = this.currentUser.username;
    // console.log(name);
  
    const labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    const completedData = [5, 8, 7, 6, 9, 10, 4]; // Example completed tasks data
    const inProgressData = [2, 3, 5, 4, 6, 7, 3]; // Example in-progress tasks data
    const onHoldData = [1, 2, 3, 2, 1, 0, 1]; // Example on-hold tasks data

    this.dataChart = {
      labels: labels,
      datasets: [
        {
          label: 'Completed',
          data: completedData,
          backgroundColor: 'rgba(75, 192, 192)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        },
        {
          label: 'In Progress',
          data: inProgressData,
          backgroundColor: 'rgba(255, 99, 132)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        },
        {
          label: 'On Hold',
          data: onHoldData,
          backgroundColor: 'rgba(54, 162, 235)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }
      ]
    };
    this.currentShift = {
      date: new Date().toDateString(),
      type: 'Morning'
    }
    this.shiftData = [
      {
        id: 1,
        procedureName: 'Procedure A',
        teamMembers: [
          '../../assets/img/avatar.png',
          '../../assets/img/avatar2.png',
          '../../assets/img/avatar3.png',
          '../../assets/img/avatar4.png'
        ],
        progress: 57,
        status: 'Success'
      },
      {
        id: 2,
        procedureName: 'Procedure B',
        teamMembers: [
          '../../assets/img/avatar.png',
          '../../assets/img/avatar2.png'
        ],
        progress: 47,
        status: 'Success'
      }
    ];
    


    
    this.createChart();
  }

  createChart() {

    this.chart = new Chart("MyChart", {
        type: 'bar',
        data: this.dataChart,
        options: {
          plugins: {
            title: {
              display: false,
            },
          },
          responsive: true,
          scales: {
            x: {
              stacked: true,
            },
            y: {
              stacked: true
            }
          },
          
        }
      });
    }


  }
