import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ShowAdminDetailsComponent } from '@app/Show-admin-details/show-admin-details.component';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { SwprequestService } from '@app/utils/swprequest.service';
import Swal from 'sweetalert2';

declare var $: any;

@Component({
  selector: 'app-swptable',
  templateUrl: './swptable.component.html',
  styleUrls: ['./swptable.component.css']
})
export class SwptableComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;

  listData: any[] = []; // Define your listData array here
  filteredListData: any[] = [];
  displayedColumns: string[] = ['sno', 'requester_name', 'equipment_id ', 'work_location ', 'start_date', 'end_date'];
  searchValue: string = ''; 
  sortColumn: string = '';
  sortDirection: number = 1;
  showColumnVisibilityDropdown: boolean = false;
  tableData:any[]=[];
  
  constructor(public dialog: MatDialog,private router: Router,private apiService:SwprequestService) { }

  ngOnInit(): void {
    this.FetchAllForm();
    
    const dropdownItem = document.querySelectorAll('.dropdown-item');
    dropdownItem.forEach(item =>{
      item.classList.add('selected');
    });
    this.filteredListData = [...this.listData];
  }

  toggleColumnVisibilityDropdown() {
    this.showColumnVisibilityDropdown = !this.showColumnVisibilityDropdown;
  }

  toggleColumnVisibility(columnName: string, event: Event) {
  event.preventDefault();
  const dropdownItem = event.target as HTMLElement;
  const th = document.querySelector(`th[data-column="${columnName}"]`);
  th?.classList.toggle('hidden');
  dropdownItem.classList.toggle('selected');

  // Get the visibility status of the column
  const isVisible = !th?.classList.contains('hidden');

  // Get the index of the column
  const columnIndex = this.displayedColumns.indexOf(columnName);

  // Loop through table rows to toggle visibility of corresponding td elements in the specified column
  const tableRows = document.querySelectorAll('#example1 tbody tr');
  tableRows.forEach(row => {
    const cells = row.querySelectorAll('td');
    const cell = cells[columnIndex] as HTMLElement; // Cast to HTMLElement
    if (cell) {
      cell.style.display = isVisible ? '' : 'none';
    }
  });

  // Also, toggle visibility of the column header
  const columnHeader = document.querySelector(`th[data-column="${columnName}"]`) as HTMLElement; // Cast to HTMLElement
  if (columnHeader) {
    columnHeader.style.display = isVisible ? '' : 'none';
  }
}


  sortData(column: string): void {
    console.log(this.sortColumn)
    this.sortDirection = (column === this.sortColumn) ? -this.sortDirection : 1;
    this.sortColumn = column;

    this.tableData.sort((a, b) => {
      const valA = a[column];
      const valB = b[column];

      if (typeof valA === 'string' && typeof valB === 'string') {
        return valA.localeCompare(valB) * this.sortDirection;
      } else {
        return (valA - valB) * this.sortDirection;
      }
    });
  }
  
  // Function to filter data based on search term
  filterTable(event: Event): void {
    const searchValue = (event.target as HTMLInputElement).value.toLowerCase();
    const tableRows = document.querySelectorAll('#example1 tbody tr');
    const searchValueLowerCase = searchValue.toLowerCase(); // Use the searchValue parameter
  
    tableRows.forEach(row => {
      const cells = row.querySelectorAll('td');
      let found = false;
  
      cells.forEach(cell => {
        if (cell.textContent?.toLowerCase().includes(searchValueLowerCase)) {
          found = true;
        }
      });
  
      if (found) {
        (row as HTMLElement).style.display = '';
      } else {
        (row as HTMLElement).style.display = 'none';
      }
    });
  }
  
  openDialog(){
    
    this.router.navigate(['/main/swaprequest'] );
  }

  downloadCSV() {
    const table = document.getElementById("example1") as HTMLTableElement;
    let csv = [];
    for (let i = 0; i < table.rows.length; i++) {
      let row = [];
      for (let j = 0; j < table.rows[i].cells.length; j++) {
        row.push(table.rows[i].cells[j].innerText);
      }
      csv.push(row.join(","));
    }
    let csvContent = csv.join("\n");
    let blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    let link = document.createElement("a");
    link.setAttribute("href", URL.createObjectURL(blob));
    link.setAttribute("download", "table_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  
  copyToClipboard() {
    const table = document.getElementById("example1") as HTMLTableElement;
    const range = document.createRange();
    range.selectNode(table);
    const selection = window.getSelection?.();
    if (selection) {
      selection.removeAllRanges();
      selection.addRange(range);
      const successful = document.execCommand('copy');
      selection.removeAllRanges();
      if (successful) {
        const numRows = table.rows.length;
        alert(numRows + " row(s) copied to clipboard.");
      } else {
        alert("Failed to copy table data.");
      }
    } else {
      alert("Browser does not support copying to clipboard.");
    }
  }

  FetchAllForm(){
    const tableDatas = this.displayedColumns.values;
    this.apiService.fetchAllrequest(tableDatas).subscribe(
      (response)=> {
        console.log("fetch");
        console.log('resonse From Server:',response);
        this.tableData = response.result;
        console.log(this.tableData)
      },
      (error)=> {
        console.error('Error while reciving data:',error);
      }
    )
   
  }
  edit(id: string) {
    console.log(id);
    this.router.navigate(['main/swaprequest'], { queryParams: { id } }); // Assuming your edit route is '/editform/:id'
  }
  
  deleted(id: string) {
    // Display confirmation dialog
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete this permit. This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'delete it!',
      cancelButtonText: 'cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) { // If user clicks "Yes, delete it!"
        this.apiService.deletePermitData(id).subscribe(
          (response) => {
            console.log('id: ', id);
            this.showAlert('success', 'Permit Deleted successfully!');
           
          },
          (error) => {
            console.error('An error occurred:', error);
            this.showAlert('error', 'Failed to Deleted permit.');
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Do nothing if user clicks "No, cancel!"
      }
    });
  }

  showAlert(icon: 'success' | 'error', text: string): void {
    Swal.fire({
      title: 'Permit Creation',
      text: text,
      icon: icon,
      confirmButtonText: 'OK',
    }).then((result) => {
      if (result.isConfirmed) { // If user clicks OK
        window.location.reload(); // Reload the page
      }
    });
  }
}