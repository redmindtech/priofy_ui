import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-swprequest',
  templateUrl: './swprequest.component.html',
  styleUrls: ['./swprequest.component.css']
})
export class SwprequestComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;
  todayDate: string;
  expanded: boolean = false;
  swpForm: FormGroup;
  expandedDropdownId: string | null = null;
  constructor(private formBuilder: FormBuilder) {

  }
  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    const today = new Date();
    const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const day = ('0' + today.getDate()).slice(-2);
    const hours = ('0' + today.getHours()).slice(-2);
    const minutes = ('0' + today.getMinutes()).slice(-2);
    const seconds = ('0' + today.getSeconds()).slice(-2);
    const formattedDate = `${day}-${month}-${year}`;
    const formattedTime = ` ${hours}:${minutes}:${seconds}`;

    this.swpForm = this.formBuilder.group({
      startDate: [formattedDate ],
      startTime:[formattedTime],
      endDate: [formattedDate],
      endTime:[formattedTime]

    });

    this.swpForm = this.formBuilder.group({
      // EAZ: ['Zone1'],
      // EquipmentID:['F-2230'],
      // WorkLocation:['EU2-E-2231A/B/C/D/E &F PRIMARY TLE S'],
      // Toolsrequired:['Hand Tools'],
      // Clothing:['Jacket'],
      // fhprotection:['Mesh','Face Shield','Helmet']

    });
  }
  onFileSelected(): void {
    const file = this.fileInput.nativeElement.files[0];
    const allowedTypes = ['application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/pdf'];
    const maxFileSize = 100 * 1024; // 100KB

    if (file && allowedTypes.includes(file.type) && file.size <= maxFileSize) {

      console.log('File selected:', file.name);

    } else {

      if (!allowedTypes.includes(file.type)) {
        alert('Please select a Word document (DOC/DOCX) or a PDF file.');
      } else if (file.size > maxFileSize) {
        alert('File size exceeds the maximum allowed size of 100KB.');
      }

      this.fileInput.nativeElement.value = '';
    }
  }
  toggleSelectExpand(dropdownId: string) {
    if (this.expandedDropdownId === dropdownId) {
      this.expandedDropdownId = null;
    } else {
      this.expandedDropdownId = dropdownId;
    }
  }
}
