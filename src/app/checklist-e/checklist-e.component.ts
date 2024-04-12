import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChecklistEService } from '@app/utils/service/checklist-e.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-checklist-e',
  templateUrl: './checklist-e.component.html',
  styleUrls: ['./checklist-e.component.css']
})
export class ChecklistEComponent implements OnInit {
  @Input() checklisteformenable: boolean;
  checklistfformenable: boolean = true;
  ChecklistE!: FormGroup;
  private onSubmitInterval: any;
  private addSubscription: Subscription | undefined;
  disableIO: string;
  currentUser: any;
  id: any;
  open1:boolean;
  @Input() expand: boolean;
  enable: boolean = false; 
  aceptreject:string = 'null';
  remainingValues: any;
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ChecklistEService
  ) { }

  ngOnInit(): void {
    
    const storedUser = localStorage.getItem('currentUser');
     this.currentUser = storedUser ? JSON.parse(storedUser) : null;
     console.log(' this.currentUser: ',  this.currentUser.position);
   this.disableIO=this.currentUser.position;
    this.formInitialization();
    this.setupSubmitInterval();
  }
  formInitialization() {
    this.ChecklistE = this.formBuilder.group({
      oot_lower_level_burner: [null,Validators.required],
      iot_monitor_the_fuel_gas:[null,Validators.required],
      oot_desuperheater:[null,Validators.required],
      iot_desuperheater_not_pass:[null,Validators.required],
      oot_lineup_sd:[null,Validators.required],
      oot_cbd:[null,Validators.required],
      oot_cbd_confirm_cooling_water:[null,Validators.required],
      oot_stle_blowdown_analyzer:[null,Validators.required],
      oot_desuperheater_untreated_bfw:[null,Validators.required],
      iot_to_enable_sd:[null,Validators.required],
      psv_evt_start:[null,Validators.required],
      psv_evt_complete:[null,Validators.required],
      ootIOT_decoke_air:[null,Validators.required],
      furnace_sequence_to_swing_mov:[null,Validators.required],
      furnace_sequence_to_swing_mov_comment:[null],
      ootIOT_decoke_air_comment:[null],
      psv_evt_complete_comment:[null],
      psv_evt_start_comment:[null],
      iot_to_enable_sd_comment:[null],
      oot_desuperheater_untreated_bfw_comment:[null],
      oot_stle_blowdown_analyzer_comment:[null],
      oot_cbd_confirm_cooling_water_comment:[null],
      oot_cbd_comment:[null],
      oot_lineup_sd_comment:[null],
      iot_desuperheater_not_pass_comment:[null],
      oot_desuperheater_comment:[null],
      iot_monitor_the_fuel_gas_comment:[null],
      oot_lower_level_burner_comment:[null],
      shift_comment_e_oot:[null],
      shift_comment_e_iot:[null],
      userid:[this.currentUser.id],
      id:[this.id],
      master_id:[1],
    });
  }
  
  setupSubmitInterval() {
    this.onSubmitInterval = setInterval(() => {
      console.log('onSubmitInterval: ', this.onSubmitInterval);
      this.add();
    }, 5* 1000); // 2 minutes in milliseconds
  }

  onSubmit() {
    const permitFormValue = this.ChecklistE.value;
    console.log('Form Data:', permitFormValue);
    this.addSubscription = this.apiService.createchecklistE(permitFormValue).subscribe(
        (response) => {
          this.id=response.result.id
            console.log('Response from server:', response);
        },
        (error) => {
            console.error('Error while sending data:', error);
        }
    );
}
add() {
  this.apiService.getchecklistE().subscribe((response: any) => {
    if (response && response.result) { // Check if response and response.result are not null or undefined
      this.remainingValues = response.result;

      Object.keys(this.remainingValues).forEach(key => {
        if (key !== 'shift_comment_e_oot' && key !== 'shift_comment_e_iot') {
          this.ChecklistE.get(key)?.patchValue(this.remainingValues[key]);
        }
      });
    } else {
      console.log("Response or response.result is null or undefined.");
      // Handle the error or notify the user accordingly
    }
  });
}


  nxtAccEn(){
    this.checklistfformenable=false;
    this.expand = false;
    this.open1 =true
  }
  onRadioChange() {
    // You may want to check if the input field has focus or not
    // before making the API call
    const activeElement = document.activeElement as HTMLElement;
    console.log('activeElement: ', activeElement);
    console.log('activeElement.tagName.toLowerCase(): ', activeElement.tagName.toLowerCase());
    if (activeElement && activeElement.tagName.toLowerCase() !== 'input') {
        this.onSubmit();
    }
}
onRadioChangeup() {
  // You may want to check if the input field has focus or not
  // before making the API call
  const activeElement = document.activeElement as HTMLElement;
  console.log('activeElement: ', activeElement);
  console.log('activeElement.tagName.toLowerCase(): ', activeElement.tagName.toLowerCase());
  if (activeElement && activeElement.tagName.toLowerCase() !== 'input') {
      this.updateFormValues();
  }
}
updateFormValues(): void {
  // this.ChecklistE.get('shift_comment_e_oot')?.setValue(this.remainingValues.shift_comment_e_oot);
  // this.ChecklistE.get('shift_comment_e_iot')?.setValue(this.remainingValues.shift_comment_e_iot);
  const formData = this.ChecklistE.value;
  console.log('formData: ', formData);
  this.apiService.updatePermitData(formData).subscribe(
    (response) => {
      // Assuming 'permitForm' is a FormGroup
      //this.aceptreject=response.result
      this.ChecklistE.get('shift_comment_e_oot')?.setValue(null);
      this.ChecklistE.get('shift_comment_e_iot')?.setValue(null);
    },
    (error) => {
      console.error('An error occurred:', error);
      
      // Handle error appropriately, e.g., show error message to user
    }
  );
}
toggleEnable() {
  this.enable = !this.enable; // Toggle the value of enable between true and false
}
// AcceptReject() {
//   this.apiService.getnotification().subscribe((response: any) => {
 
//  console.log('response.result: ', response.result);
    
//   });
// }
}