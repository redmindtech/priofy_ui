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
      IOT_to_confirm:  [null,Validators.required],
      oot_ALL_BV_of_LS_steam:  [null,Validators.required],
      OOT_flare_block: [null,Validators.required],
      OOT_IOT_Decoke_Air: [null,Validators.required],
      OOT_feed_DB_B: [null,Validators.required],
      iot_MOVs_status: [null,Validators.required],
      oot_MOVs_local_switches: [null,Validators.required],
      oot_furnace_is_clear: [null,Validators.required],
      iot_Operator_Permissives: [null,Validators.required],
      IOT_second_CG_MOV: [null,Validators.required],
      iot_Decoke_MOV: [null,Validators.required],
      iot_higher_pressure: [null,Validators.required],
      IOT_lower_pressure: [null,Validators.required],
      iot_decoke_MOV_closed: [null,Validators.required],
      IOT_confirm_via_HMI: [null,Validators.required],
      iot_HSSB_Crack_Gas_step: [null,Validators.required],
      Adjust_combustion: [null,Validators.required],
      the_top_burners: [null,Validators.required],
      Increase_IBD_CBD: [null,Validators.required],
      Continue_with_Furnace: [null,Validators.required],
      userid:[this.currentUser.id],
      master_id:[1],
      id:[this.id],
      iot_move_furnace_sequence_to_Swing_comment: [null],
      IOT_to_confirm_comment:  [null],
      oot_ALL_BV_of_LS_steam_comment:  [null],
      OOT_flare_block_comment: [null],
      OOT_IOT_Decoke_Air_comment: [null],
      OOT_feed_DB_B_comment: [null],
      iot_MOVs_status_comment: [null],
      oot_MOVs_local_switches_comment: [null],
      oot_furnace_is_clear_comment: [null],
      iot_Operator_Permissives_comment: [null],
      IOT_second_CG_MOV_comment: [null],
      iot_Decoke_MOV_comment: [null],
      iot_higher_pressure_comment: [null],
      IOT_lower_pressure_comment: [null],
      iot_decoke_MOV_closed_comment: [null],
      IOT_confirm_via_HMI_comment: [null],
      iot_HSSB_Crack_Gas_step_comment: [null],
      Adjust_combustion_comment: [null],
      the_top_burners_comment: [null],
      Increase_IBD_CBD_comment: [null],
      Continue_with_Furnace_comment: [null]
    });
  }

  setupSubmitInterval() {
    this.onSubmitInterval = setInterval(() => {
      console.log('onSubmitInterval: ', this.onSubmitInterval);
      this.add();
    }, 15* 1000); // 2 minutes in milliseconds
  }

  onSubmit() {

      const permitFormValue = this.ChecklistF.value;
      console.log('Form Data:', permitFormValue);
      this.addSubscription = this.apiService.createchecklistF(permitFormValue).subscribe(
        (response) => {
          console.log('Response from server:', response);

        },
        (error) => {
          console.error('Error while sending data:', error);
        }
      );


  }
  add() {
    this.apiService.getchecklistF().subscribe((response: any) => {
      console.log(response, 'checking');
      this.ChecklistF.patchValue(response.result);
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


    },
    (error) => {
      console.error('An error occurred:', error);

      // Handle error appropriately, e.g., show error message to user
    }
  );
}
}
