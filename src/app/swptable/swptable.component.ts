import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ShowAdminDetailsComponent } from '@app/Show-admin-details/show-admin-details.component';
import { MatSort } from '@angular/material/sort';
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

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.tableData = [
      { sno: 1, requester_name: 'Shift-Operater1', equipment_id: 'F-2230', work_location: 'EU2-E-2231A/B.C/D/E & F', start_date: '02-04-2024', end_date: '03-04-2024'},
      { sno: 2, requester_name: 'Shift-Operater2', equipment_id: 'F-2231', work_location: 'EU2-E-2231A/B.C/D/E & F', start_date: '02-04-2024', end_date: '03-04-2024'},
      { sno: 3, requester_name: 'Shift-Operater3', equipment_id: 'F-2232', work_location: 'EU2-E-2231A/B.C/D/E & F', start_date: '02-04-2024', end_date: '03-04-2024'},
      { sno: 4, requester_name: 'Shift-Operater4', equipment_id: 'F-2233', work_location: 'EU2-E-2231A/B.C/D/E & F', start_date: '02-04-2024', end_date: '03-04-2024'},
      { sno: 5, requester_name: 'Shift-Operater5', equipment_id: 'F-2234', work_location: 'EU2-E-2231A/B.C/D/E & F', start_date: '02-04-2024', end_date: '03-04-2024'},
      { sno: 6, requester_name: 'Shift-Operater1', equipment_id: 'F-2235', work_location: 'EU2-E-2231A/B.C/D/E & F', start_date: '02-04-2024', end_date: '03-04-2024'},
      { sno: 7, requester_name: 'Shift-Operater2', equipment_id: 'F-2236', work_location: 'EU2-E-2231A/B.C/D/E & F', start_date: '02-04-2024', end_date: '03-04-2024'},
      { sno: 8, requester_name: 'Shift-Operater3', equipment_id: 'F-2237', work_location: 'EU2-E-2231A/B.C/D/E & F', start_date: '02-04-2024', end_date: '03-04-2024'},
      { sno: 9, requester_name: 'Shift-Operater4', equipment_id: 'F-2238', work_location: 'EU2-E-2231A/B.C/D/E & F', start_date: '02-04-2024', end_date: '03-04-2024'},
      { sno: 10, requester_name: 'Shift-Operater5', equipment_id: 'F-2239', work_location: 'EU2-E-2231A/B.C/D/E & F', start_date: '02-04-2024', end_date: '03-04-2024'}
    ];
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
  
  openDialog(): void {
    const dialogRef = this.dialog.open(ShowAdminDetailsComponent, {
      width: '80%',
      height: '75%',
      position: {
        right: '80px', 
        // Positioning the dialog to the right
      },
      data: { listData: this.listData }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
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

}
