import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SwprequestService } from '@app/utils/swprequest.service';

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
  startDateTime: string;
  selectedFileName: any;

  constructor(private formBuilder: FormBuilder,private apiService: SwprequestService,) {

  }
  ngOnInit(): void {
    this.userDetails = localStorage.getItem('currentUser');
    this.userObject = JSON.parse(this.userDetails);
    this.position = this.userObject.position;
    console.log(this.position)
    // this.paramsId = this.activatedRoute.snapshot.queryParams?.['id'];
    // this.queryPath = this.activatedRoute.snapshot.url[0]?.path;
    this.formInitialization()
  }
  formInitialization() {
    
    const currentDate = new Date();

    // Format the date as needed (e.g., DD/MM/YYYY)
    this.formattedDate = new Date().toISOString().split('T')[0];


    // Format the time as needed (e.g., HH:MM:SS)
    this.formattedTime = new Date().toTimeString().split(' ')[0];
     this.startDateTime = this.formattedDate + 'T' + this.formattedTime+'Z';
console.log("date",this.formattedDate);
console.log("time",this.formattedTime);
   this.swpForm = this.formBuilder.group({
    start_date:[this.formattedDate],
    end_date:[this.formattedDate],
    start_time:[this.formattedTime],
    end_time:[this.formattedTime],
    sjp_attachment:[''],
      requestorname: ['SWP Issuer'], // Initialize with default value
      eaz: [['']],
      equipmentID: [''], // Initialize with default value
      workLocation: [''], // Initialize with default value
      workDescription:[''],
      equipmentDescription:[''],
      clothing: [''], // Initialize with default value
      fhProtection: [['']], // Initialize with default value as an array
      jobScope: [''], // Initialize with default value
      toolsRequired: [['']], // Initialize with default value as an array
      respiratory: [''], // Initialize with default value
      footleg: [['']], // Initialize with default value as an array
      ear: [['']], // Initialize with default value as an array
      eyeProtect: [['']], // Initialize with default value as an array
      ergonomics: [''], // Initialize with default value
      heatStress: [''], // Initialize with default value
      elevated: [''], // Initialize with default value
      others: [''], // Initialize with default value
      userid:[this.userObject.id],
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0]; // Extract file from event
    const maxFileSize = 100 * 1024; // 100KB

    if (file) {
        if (file.size > maxFileSize) {
            alert('File size exceeds the maximum allowed size of 100KB.');
            this.swpForm.get('sjp_attachment')?.setValue('');
            return;
        }

        console.log('File selected:', file.name);

        if (file.type === 'application/pdf') {
          this.selectedFileName = file.name;
            this.readPDFFile(file);
        } else {
            alert('Please select a PDF file.');
        }
    }
}

readPDFFile(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
        const byteArray = new Uint8Array(reader.result as ArrayBuffer);
        // Convert Uint8Array to base64 string
        const base64String = this.uint8ArrayToBase64(byteArray);
        // Set the base64 string as the value of the form control
        this.swpForm.get('sjp_attachment')?.setValue(base64String);
    };
    reader.readAsArrayBuffer(file);
}

uint8ArrayToBase64(uint8Array: Uint8Array): string {
    let binaryString = '';
    for (let i = 0; i < uint8Array.length; i++) {
        binaryString += String.fromCharCode(uint8Array[i]);
    }
    return btoa(binaryString);
}

deleteFile() {
    
  // You may also want to reset the file input to allow re-uploading if needed
  const fileInput: HTMLInputElement = document.getElementById('fileUpload') as HTMLInputElement;
  if (fileInput) {
    this.selectedFileName =""
      fileInput.value = ''; // Reset file input value
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
    this.swpForm.get('start_date')?.setValue(this.startDateTime);
    this.swpForm.get('end_date')?.setValue(this.startDateTime);
    this.swpForm.get('start_time')?.setValue(this.startDateTime);
    this.swpForm.get('end_time')?.setValue(this.startDateTime);
    const firstFormValue = this.swpForm.value;
    console.log('Form Data:', firstFormValue);
    this.apiService.saveswprequest(firstFormValue).subscribe(
      (response) => {
        console.log('Response from server:', response);
        
        // this.router.navigate(['/main/toolcomp']);
        
     
      },
      (error) => {
        console.error('Error while sending data:', error);
        
      }
    );
  }
  
updateFormValues(): void {
  const formData = this.swpForm.value;
  console.log('formData: ', formData);
  this.apiService.updateswprequest(formData).subscribe(
    (response) => {
    
    },
    (error) => {
      console.error('An error occurred:', error);
      
      // Handle error appropriately, e.g., show error message to user
    }
  );
}
// getbydata
onEditClick(): void {
  // Fetch permit data by ID
  this.apiService.getswprequestById('1').subscribe(
    (data: any) => {
      console.log(data);
      // Patch form values with API response
      this.swpForm.patchValue(data.result); // Assuming data structure matches form controls
    },
    (error: any) => {
      console.error('Error fetching data:', error);
    }
  );}
}

