import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ChecklistBService } from '@app/utils/service/checklist-b.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-checklist-b',
  templateUrl: './checklist-b.component.html',
  styleUrls: ['./checklist-b.component.css']
})
export class ChecklistBComponent implements OnInit {
  @Input() checklistbformenable: boolean;
  checklistcformenable: boolean = true;
  ChecklistB: FormGroup;
  currentUser: any;
  disableIO: any;
  id: any;
  enable: boolean = false; 
  aceptreject:string = 'null';
  remainingValues: any;
  private onSubmitInterval: any;
  private addSubscription: Subscription | undefined;
  constructor(private fb: FormBuilder,
    private apiService:ChecklistBService,
    private router: Router,
    private toast: MatSnackBar,
    ){}

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
formInitialization(){
  this.ChecklistB= this.fb.group({

    userid:[this.currentUser.id],
    id:[this.id],
    master_id:[1],
    oot_bearings_oil_levels:[null,Validators.required],
    iot_Overview_HMI:[null,Validators.required],
    ups_system:[null,Validators.required],
    oot_caged_doors_open:[null,Validators.required],
    oot_peep_doors_closed:[null,Validators.required],
    oot_local_start_stop:[null,Validators.required],
    oot_ID_fan_casing:[null,Validators.required],
    oot_FD_suction:[null,Validators.required],
    oot_Floor_burners:[null,Validators.required],
    oot_Wall_burners :[null,Validators.required],
    iot_start_ID_fan:[null,Validators.required],
    iot_ID_fan_running:[null,Validators.required],
    iot_FD_fan_motor_readings:[null,Validators.required],
    oot_ID_fan_abnormality:[null,Validators.required],
    oot_four_air_duct:[null,Validators.required],
    iot_start_FD:[null,Validators.required],
    iot_FD_fan_running:[null,Validators.required],
    iot_FC_signal:[null,Validators.required],
    iot_close_the_doors:[null,Validators.required],
    iot_FC_back_in_auto:[null,Validators.required],
    iot_fan_motor_readings:[null,Validators.required],
    oot_FD_shaft_speed:[null,Validators.required],
    oot_FD_fan_abnormality:[null,Validators.required],
    oot_LS_steam_condensate:[null,Validators.required],
    oot_S_TLE:[null,Validators.required],
    oot_T_TLE:[null,Validators.required],
    oot_CG_movs_intermediate:[null,Validators.required],
    oot_CG_HV_22X6_13A:[null,Validators.required],
    oot_Decoke_MOV:[null,Validators.required],
    oot_Double_Block:[null,Validators.required],
    oot_LS_purge_lined_up:[null,Validators.required],
    ms_Steam:[null,Validators.required],
    fgs_ready:[null,Validators.required],
    oot_burners_manual_BV:[null,Validators.required],
    oot_ignitor_and_flame_scanner:[null,Validators.required],
    oot_fourth_platform_level:[null,Validators.required],
    oot_1_BV_to_AT_22X0_11A:[null,Validators.required],
    oot_1_BV_to_AT_22X0_11B:[null,Validators.required],
    oot_34_BV_to_AP_22X0_11A:[null,Validators.required],
    oot_34_BV_to_AP_22X0_11B:[null,Validators.required],
    iot_ignitors_and_flame_scanners:[null,Validators.required],
    blow_down_HXS_header:[null,Validators.required],
    oot_10_block_valves:[null,Validators.required],
    oot_8_NRV_valve:[null,Validators.required],
    iot_SD_level:[null,Validators.required],
    oot_bleed_to_flare:[null,Validators.required],



    oot_bearings_oil_levels_comment:[null],
    iot_Overview_HMI_comment:[null],
    ups_system_comment:[null],
    oot_caged_doors_open_comment:[null],
    oot_peep_doors_closed_comment:[null],
    oot_local_start_stop_comment:[null],
    oot_ID_fan_casing_comment:[null],
    oot_FD_suction_comment:[null],
    oot_Floor_burners_comment:[null],
    oot_Wall_burners_comment :[null],
    iot_start_ID_fan_comment:[null],
    iot_ID_fan_running_comment:[null],
    iot_FD_fan_motor_readings_comment:[null],
    oot_ID_fan_abnormality_comment:[null],
    oot_four_air_duct_comment:[null],
    iot_start_FD_comment:[null],
    iot_FD_fan_running_comment:[null],
    iot_FC_signal_comment:[null],
    iot_close_the_doors_comment:[null],
    iot_FC_back_in_auto_comment:[null],
    iot_fan_motor_readings_comment:[null],
    oot_FD_shaft_speed_comment:[null],
    oot_FD_fan_abnormality_comment:[null],
    oot_LS_steam_condensate_comment:[null],
    oot_S_TLE_comment:[null],
    oot_T_TLE_comment:[null],
    oot_CG_movs_intermediate_comment:[null],
    oot_CG_HV_22X6_13A_comment:[null],
    oot_Decoke_MOV_comment:[null],
    oot_Double_Block_comment:[null],
    oot_LS_purge_lined_up_comment:[null],
    ms_Steam_comment:[null],
    fgs_ready_comment:[null],
    oot_burners_manual_BV_comment:[null],
    oot_ignitor_and_flame_scanner_comment:[null],
    oot_fourth_platform_level_comment:[null],
    oot_1_BV_to_AT_22X0_11A_comment:[null],
    oot_1_BV_to_AT_22X0_11B_comment:[null],
    oot_34_BV_to_AP_22X0_11A_comment:[null],
    oot_34_BV_to_AP_22X0_11B_comment:[null],
    iot_ignitors_and_flame_scanners_comment:[null],
    blow_down_HXS_header_comment:[null],
    oot_10_block_valves_comment:[null],
    oot_8_NRV_valve_comment:[null],
    iot_SD_level_comment:[null],
    oot_bleed_to_flare_comment:[null],
    shift_comment_b_oot:[null],
    shift_comment_b_iot:[null],
})
}
setupSubmitInterval() {
  this.onSubmitInterval = setInterval(() => {
    console.log('onSubmitInterval: ', this.onSubmitInterval);
    this.add();
  }, 15 * 1000); // 2 minutes in milliseconds
}

onSubmit()
  {

    const formData = this.ChecklistB.value;
    this.apiService.savecheckBpage(formData).subscribe(
      (response) => {

        console.log('Data saved successfully:', response);
        this.toast.open('Data saved successfully', 'Close', { duration: 3000 });

        // this.router.navigate(['/blank']);
      },
      (error) => {

        console.error('Error saving data:', error);
        this.toast.open('Error saving data', 'Close', { duration: 3000 });
      }
    );

}
nxtAccEn(){
  this.checklistcformenable=true;
}
add() {
  this.apiService.getchecklistB().subscribe((response: any) => {
    this.remainingValues = response.result;
    console.log('shift_comment_b_iot: ', response.result.shift_comment_b_iot);

    
    Object.keys(this.remainingValues).forEach(key => {
      if (key !== 'shift_comment_b_oot' && key !== 'shift_comment_b_iot') {
        this.ChecklistB.get(key)?.patchValue(this.remainingValues[key]);
       
      }
    });
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
const formData = this.ChecklistB.value;
console.log('formData: ', formData);
this.apiService.updatePermitData(formData).subscribe(
  (response) => {
    // Assuming 'permitForm' is a FormGroup
    this.ChecklistB.get('shift_comment_b_oot')?.reset();
    this.ChecklistB.get('shift_comment_b_iot')?.reset();

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
