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
  formattedDate: string;
formattedTime: string;
  expanded: boolean = false;
  swpForm: FormGroup;
  swpForm1:FormGroup;
  expandedDropdownId: string | null = null;
  constructor(private formBuilder: FormBuilder) {

  }
  ngOnInit(): void {
    const currentDate = new Date();
    this.formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;


// Format the time as needed (e.g., HH:MM:SS)
this.formattedTime = `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;

    this.initializeForm();
  }
  allZones: string[] = ['Zone1', 'Zone2', 'Zone3', 'Zone4', 'Zone5', 'Zone6', 'Zone7', 'Zone8', 'Zone9', 'Zone10'];
  EquipmentID:['F-2230']
  initializeForm(): void {
    this.swpForm = this.formBuilder.group({
    startDate: [this.formattedDate],
    startTime: [this.formattedTime],
    endDate: [this.formattedDate],
    endTime: [this.formattedTime],
     EAZ: [[]],
      EquipmentID:['F-2230'],
      WorkLocation:['EU2-E-2231A/B/C/D/E &F PRIMARY TLE S'],
      Clothing:['Jacket'],
      fhprotection:['Mesh','Face Shield','Helmet'],
      Jobscope: [''],
      Toolsrequired: ['handtools'],
      clothing: ['jacket'],
      respirator: ['mesh'],
      footleg: ['footleg'],
      ear: ['earmuff'],
      eyeprotect: ['eyeprotect'],
      Ergonomics: [''],
      Heatstress: [''],
      Elevated: [''],
      Others: [''],
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
