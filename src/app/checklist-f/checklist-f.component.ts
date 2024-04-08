import { Component,Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChecklistFService } from '@app/utils/service/checklist-f.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-checklist-f',
  templateUrl: './checklist-f.component.html',
  styleUrls: ['./checklist-f.component.css']
})
export class ChecklistFComponent implements OnInit {
  @Input() checklistfformenable: boolean;

  ChecklistF: FormGroup;

  private onSubmitInterval: any;
  private addSubscription: Subscription | undefined;
  currentUser: any;
  disableIO: any;
  id :any;
  remainingValues: any;
  enable: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ChecklistFService
  ) { }

  ngOnInit(): void {
    const storedUser = localStorage.getItem('currentUser');
 this.currentUser = storedUser ? JSON.parse(storedUser) : null;
    console.log(' this.currentUser: ',  this.currentUser.position);
  this.disableIO=this.currentUser.position;
    this.formInitialization();
    this.setupSubmitInterval();

  }
  ngOnDestroy(): void {
    clearInterval(this.onSubmitInterval);
    if (this.addSubscription) {
      this.addSubscription.unsubscribe();
    }
  }
  formInitialization() {
    this.ChecklistF = this.formBuilder.group({
      iot_move_furnace_sequence_to_Swing: [null,Validators.required],
      iot_to_confirm:  [null,Validators.required],
      oot_ALL_BV_of_LS_steam:  [null,Validators.required],
      oot_flare_block: [null,Validators.required],
      oot_IOT_Decoke_Air: [null,Validators.required],
      oot_feed_DB_B: [null,Validators.required],
      iot_MOVs_status: [null,Validators.required],
      oot_MOVs_local_switches: [null,Validators.required],
      oot_furnace_is_clear: [null,Validators.required],
      iot_Operator_Permissives: [null,Validators.required],
      iot_second_CG_MOV: [null,Validators.required],
      iot_Decoke_MOV: [null,Validators.required],
      iot_higher_pressure: [null,Validators.required],
      iot_lower_pressure: [null,Validators.required],
      iot_decoke_MOV_closed: [null,Validators.required],
      iot_confirm_via_HMI: [null,Validators.required],
      iot_HSSB_Crack_Gas_step: [null,Validators.required],
      adjust_combustion: [null,Validators.required],
      the_top_burners: [null,Validators.required],
      increase_IBD_CBD: [null,Validators.required],
      continue_with_Furnace: [null,Validators.required],
      userid:[this.currentUser.id],
      master_id:[1],
      id:[this.id],
      iot_move_furnace_sequence_to_Swing_comment: [null],
      iot_to_confirm_comment:  [null],
      oot_ALL_BV_of_LS_steam_comment:  [null],
      oot_flare_block_comment: [null],
      oot_IOT_Decoke_Air_comment: [null],
      oot_feed_DB_B_comment: [null],
      iot_MOVs_status_comment: [null],
      oot_MOVs_local_switches_comment: [null],
      oot_furnace_is_clear_comment: [null],
      iot_Operator_Permissives_comment: [null],
      iot_second_CG_MOV_comment: [null],
      iot_Decoke_MOV_comment: [null],
      iot_higher_pressure_comment: [null],
      iot_lower_pressure_comment: [null],
      iot_decoke_MOV_closed_comment: [null],
      iot_confirm_via_HMI_comment: [null],
      iot_HSSB_Crack_Gas_step_comment: [null],
      adjust_combustion_comment: [null],
      the_top_burners_comment: [null],
      increase_IBD_CBD_comment: [null],
      continue_with_Furnace_comment: [null],
      shift_comment_f_iot:[null],
      shift_comment_f_oot:[null]
    });
  }

  setupSubmitInterval() {
    this.onSubmitInterval = setInterval(() => {
      console.log('onSubmitInterval: ', this.onSubmitInterval);
      this.add();
    }, 5* 1000); // 2 minutes in milliseconds
  }

  onSubmit() {

      const permitFormValue = this.ChecklistF.value;
      console.log('Form Data:', permitFormValue);
      this.addSubscription = this.apiService.createchecklistF(permitFormValue).subscribe(
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
    this.apiService.getchecklistF().subscribe((response: any) => {
      if (response && response.result) { // Check if response and response.result are not null or undefined
        this.remainingValues = response.result;
        this.ChecklistF.patchValue(response.result);
        Object.keys(this.remainingValues).forEach(key => {
          if (key !== 'shift_comment_f_oot' && key !== 'shift_comment_f_iot') {
            this.ChecklistF.get(key)?.patchValue(this.remainingValues[key]);
          }
        });
      } else {
        console.log("Response or response.result is null or undefined.");
        // Handle the error or notify the user accordingly
      }
    });
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
  const formData = this.ChecklistF.value;
  console.log('formData: ', formData);
  this.apiService.updatePermitData(formData).subscribe(
    (response) => {
      // Assuming 'permitForm' is a FormGroup
      this.ChecklistF.get('shift_comment_f_oot')?.reset();
      this.ChecklistF.get('shift_comment_f_iot')?.reset();

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
}
