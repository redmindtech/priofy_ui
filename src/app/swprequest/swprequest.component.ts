import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SwprequestService } from '@app/utils/swprequest.service';
import Swal from 'sweetalert2';

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


  pdfURL: string | null = null;
  base64File: string | null = null;



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
  paramsId: any;
  convertedPdf: string;
  pdf: any;
  safeid: any;
  Safeworkpermitup: boolean;



  constructor(private formBuilder: FormBuilder,private apiService: SwprequestService,private activatedRoute: ActivatedRoute,) {

  }
  ngOnInit(): void {
    this.paramsId = this.activatedRoute.snapshot.queryParams?.['id'];
    this.userDetails = localStorage.getItem('currentUser');
    this.userObject = JSON.parse(this.userDetails);
    this.position = this.userObject.position;
    console.log("postionss:"+this.position)
    // this.paramsId = this.activatedRoute.snapshot.queryParams?.['id'];
    // this.queryPath = this.activatedRoute.snapshot.url[0]?.path;
    this.formInitialization()
    if (this.paramsId) {
      this.onEditClick();
    }
  }
  formInitialization() {

    const currentDate = new Date();

    // Format the date as needed (e.g., DD/MM/YYYY)
    this.formattedDate = new Date().toISOString().split('T')[0];

    // Format the time as needed (e.g., HH:MM:SS)
    this.formattedTime = new Date().toTimeString().split(' ')[0];
    //  this.startDateTime = this.formattedDate;
console.log("date",this.formattedDate);
console.log("time",this.formattedTime);
   this.swpForm = this.formBuilder.group({
    start_date:[this.formattedDate],
    end_date:[this.formattedDate],
    start_time:[this.formattedTime],
    end_time:[this.formattedTime],
    sjp_attachment:[''],
      requestorname: [this.position], // Initialize with default value
      eaz: [['']],
      equipmentID: [['']], // Initialize with default value
      workLocation: [['']], // Initialize with default value
      workDescription:[''],
      equipmentDescription:[''],
      clothing: [['']], // Initialize with default value
      fhProtection: [['']], // Initialize with default value as an array
      jobScope: [''], // Initialize with default value
      toolsRequired: [['']], // Initialize with default value as an array
      respiratory: [['']], // Initialize with default value
      footleg: [['']], // Initialize with default value as an array
      ear: [['']], // Initialize with default value as an array
      eyeProtect: [['']], // Initialize with default value as an array
      ergonomics: [''], // Initialize with default value
      heatStress: [''], // Initialize with default value
      elevated: [''], // Initialize with default value
      others: [''], // Initialize with default value
      userid:[this.userObject.id],
      id:[this.safeid]
    });
  }

//   onFileSelected(event: any): void {
//     const file = event.target.files[0]; // Extract file from event
//     const maxFileSize = 100 * 1024; // 100KB

//     if (file) {
//         if (file.size > maxFileSize) {
//             alert('File size exceeds the maximum allowed size of 100KB.');
//             this.swpForm.get('sjp_attachment')?.setValue('');
//             return;
//         }

//         console.log('File selected:', file.name);

//         if (file.type === 'application/pdf') {
//           this.selectedFileName = file.name;
//             this.readPDFFile(file);
//         } else {
//             alert('Please select a PDF file.');
//         }
//     }
// }

// readPDFFile(file: File): void {
//     const reader = new FileReader();
//     reader.onload = () => {
//         const byteArray = new Uint8Array(reader.result as ArrayBuffer);
//         // Convert Uint8Array to base64 string
//          const base64String = this.uint8ArrayToBase64(byteArray);
//          console.log('this.base64String: ', base64String);
//         // Set the base64 string as the value of the form control
//         this.swpForm.get('sjp_attachment')?.setValue(base64String);
//     };
//     reader.readAsArrayBuffer(file);
// }

// uint8ArrayToBase64(uint8Array: Uint8Array): string {
//     let binaryString = '';
//     for (let i = 0; i < uint8Array.length; i++) {
//         binaryString += String.fromCharCode(uint8Array[i]);
//     }
//     return btoa(binaryString);
// }

// deleteFile() {

//   // You may also want to reset the file input to allow re-uploading if needed
//   const fileInput: HTMLInputElement = document.getElementById('fileUpload') as HTMLInputElement;
//   if (fileInput) {
//     this.selectedFileName =""
//       fileInput.value = ''; // Reset file input value
//   }
// }



  toggleSelectExpand(dropdownId: string) {
    if (this.expandedDropdownId === dropdownId) {
      this.expandedDropdownId = null;
    } else {
      this.expandedDropdownId = dropdownId;
    }
  }

  saveForm() {
    // this.accordionClosed=true


    const firstFormValue = this.swpForm.value;
    console.log('Form Data:', firstFormValue);
    this.apiService.saveswprequest(firstFormValue).subscribe(
      (response) => {
        console.log('Response from server:', response);

        this.showAlert('success', 'Safe Work Permit Request Created successfully!');
        this.swpForm.reset();
        this.accordionClosed = false;

      },
      (error) => {
        console.error('Error while sending data:', error);
        this.showAlert('error', 'Failed to Create Safe Work Permit Request ');
      }
    );
  }

updateFormValues(): void {

  const formData = this.swpForm.value;
  console.log('formData: ', formData);
  this.apiService.updateswprequest(formData).subscribe(
    (response) => {
      this.showAlert('success', 'Safe Work Permit Request Updated successfully!');
      this.swpForm.reset();
      this.accordionClosed = false;
    },
    (error) => {
      console.error('An error occurred:', error);
      this.showAlert('error', 'Failed to Update Safe Work Permit Request ');
      // Handle error appropriately, e.g., show error message to user
    }
  );
}
// getbydata
// onEditClick(): void {
//   // Fetch permit data by ID
//   this.apiService.getswprequestById(this.paramsId).subscribe(
//     (data: any) => {
//       console.log(data);
//       this.safeid=data.result[0].id;
//       this.Safeworkpermitup= data.result[0]?.id ? true : false;
//       this.pdf = data?.result?.sjp_attachment;
//       console.log('this.pdf: ', this.pdf);
//       this.swpForm.patchValue(data.result[0]);


//     },
//     (error: any) => {
//       // Handle error
//       console.error('Error fetching data:', error);

//     }
//   );


// }

  showAlert(icon: 'success' | 'error', text: string): void {
    Swal.fire({
      title: 'Permit Creation',
      text: text,
      icon: icon,
      confirmButtonText: 'OK',
    });
  }
  // dd(){
  //   if (this.pdf) {
  //     // Convert the byte array to a Blob
  //     const blob = new Blob([this.pdf], { type: 'application/pdf' });

  //     // Create a URL for the Blob
  //     const url = URL.createObjectURL(blob);

  //     // Open the URL in a new tab
  //     const newWindow = window.open(url);

  //     // Check if the window was successfully opened
  //     if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
  //       // Handle the case when the window couldn't be opened
  //       console.error('Failed to open PDF in new tab.');
  //     }
  //   } else {
  //     // Handle the case when the byte array is empty
  //     console.error('Byte array is empty.');
  //   }
  // }
  // openPDF(bytecode: any): void {
  //   // Convert bytecode to a Uint8Array
  //   const byteArray = new Uint8Array(bytecode);

  //   // Create a Blob object from the Uint8Array
  //   const blob = new Blob([byteArray], { type: 'application/pdf' });

  //   // Create a URL for the Blob
  //   const url = URL.createObjectURL(blob);

  //   // Open the URL in a new window or tab
  //   window.open(url, '_blank');
  // }


  onFileSelected(event: any): void {
    const file = event.target.files[0];
    const maxFileSize = 100 * 1024; // 100KB

    if (file) {
      if (file.size > maxFileSize) {
        alert('File size exceeds the maximum allowed size of 100KB.');
        this.swpForm.get('sjp_attachment')?.setValue(null);
        return;
      }

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
      const base64String = reader.result?.toString().split(',')[1] || '';
      this.base64File = base64String;
      this.createPDFUrl(base64String);
      this.swpForm.get('sjp_attachment')?.setValue(base64String);
    };
    reader.readAsDataURL(file);
  }

  deleteFile(): void {
    this.selectedFileName = null;
    this.base64File = null;
    this.pdfURL = null;
    this.swpForm.get('sjp_attachment')?.setValue(null);
    const fileInput: HTMLInputElement = document.getElementById('fileUpload') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = ''; // Reset file input value
    }
  }

  onEditClick(): void {
    this.apiService.getswprequestById(this.paramsId).subscribe(
      (data: any) => {
        this.safeid = data.result[0].id;
        this.Safeworkpermitup = !!data.result[0]?.id;
        const pdfBase64 = data.result[0]?.sjp_attachment;
        if (pdfBase64) {
          this.loadSavedPDF(pdfBase64);
        }
        this.swpForm.patchValue(data.result[0]);
      },
      (error: any) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  convertBase64ToBlob(base64String: string): Blob {
    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: 'application/pdf' });
  }

  createPDFUrl(base64String: string): void {
    const blob = this.convertBase64ToBlob(base64String);
    this.pdfURL = URL.createObjectURL(blob);

    console.log('Generated PDF URL:', this.pdfURL); // Debugging line
  }

  loadSavedPDF(base64String: string): void {
    this.base64File = base64String;
    this.createPDFUrl(base64String);
    this.swpForm.get('sjp_attachment')?.setValue(base64String);
  }

  downloadfile():void{
    if (this.pdfURL) {
      let filename = "download pdf";
      let link = document.createElement('a');
      link.download = filename;
      link.target = "_blank";
      link.href = this.pdfURL;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert('No PDF file available for download.');
    }

  }


}

