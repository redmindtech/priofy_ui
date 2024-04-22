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
  //swpForm1:FormGroup;
  userDetails: any;
  userObject: any;
  position: any;
  expandedDropdownId: string | null = null;
  accordionClosed: boolean = false;

  allZones: string[] = ['Zone1', 'Zone2', 'Zone3', 'Zone4', 'Zone5', 'Zone6', 'Zone7', 'Zone8', 'Zone9', 'Zone10'];
  EquipID:string[]= ['F-2230','d-3220','e-4422','g-2213'];
  workloc:string[]=['EU2-E-2231A/B/C/D/E &F PRIMARY TLES' ,'FU2-F-2231A/B/C/D/E &F PRIMARY TLES','GU2-G-2231A/B/C/D/E &F PRIMARY TLES','AU2-B-2231A/B/C/D/E &F PRIMARY TLES']
  tools:string[]=['Hand tools','Socket sets','Hammer','Hand Saw'];
  cloth:string[]=['Cotton','Jute','Turky','Jean'];
  headprotect:string[]=['Mesh','Helmet','Face Shield','Twin Filter Mask'];
  respir:string[]=['Foldable Basic Respiratory','elf-contained breathing apparatus',' Constant flow equipment',' Full-face mask completed with combined filter',' Half mask completed with particle filter'];
  footlegs:string[]=['Ankle High Safety Shoes','Metatarsal Guard','Steel/Composite Safety Toe','Thermal Insulated Shoes','Puncture-Resistant Shoes'];
  earprotect:string[]=['Ear Muff',' Earplugs',' Earplug Dispensers',' Audiometry Cabins '];
  eyeprotect:string[]=['Safety Glasses with Side Shields','Goggles','Hand Shield','Helmet type Stationary Window'];

  constructor(private formBuilder: FormBuilder) {

  }
  ngOnInit(): void {
    this.userDetails = localStorage.getItem('currentUser');
    this.userObject = JSON.parse(this.userDetails);
    this.position = this.userObject.position;
    console.log(this.position)

    this.formInitialization()
  }
  formInitialization() {
    
    const currentDate = new Date();

    // Format the date as needed (e.g., DD/MM/YYYY)
    this.formattedDate = new Date().toISOString().split('T')[0];


    // Format the time as needed (e.g., HH:MM:SS)
    this.formattedTime = new Date().toTimeString().split(' ')[0];
console.log("date",this.formattedDate);
console.log("time",this.formattedTime);
   this.swpForm = this.formBuilder.group({
    // startDate:[this.formattedDate],
    // endDate:[this.formattedDate],
    // startTime:[this.formattedTime],
    // endTime:[this.formattedTime],

      Requestorname: ['SWP Issuer'], // Initialize with default value
      EAZ: [[]],
      EquipmentID: [''], // Initialize with default value
      WorkLocation: [''], // Initialize with default value
      WorkDescription:[''],
      EquipmentDescription:[''],
      Clothing: [''], // Initialize with default value
      fhprotection: [['']], // Initialize with default value as an array
      Jobscope: [''], // Initialize with default value
      Toolsrequired: [['']], // Initialize with default value as an array
      Respiratory: [''], // Initialize with default value
      footleg: [['']], // Initialize with default value as an array
      ear: [['']], // Initialize with default value as an array
      eyeprotect: [['']], // Initialize with default value as an array
      Ergonomics: [''], // Initialize with default value
      Heatstress: [''], // Initialize with default value
      Elevated: [''], // Initialize with default value
      Others: [''], // Initialize with default value
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

  saveForm() {
    // this.accordionClosed=true
    this.accordionClosed = false;
    
  }

}


