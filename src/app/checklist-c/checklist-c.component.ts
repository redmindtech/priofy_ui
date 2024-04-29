import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ChecklistCService } from '@app/utils/service/checklist-c.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-checklist-c',
  templateUrl: './checklist-c.component.html',
  styleUrls: ['./checklist-c.component.css']
})
export class ChecklistCComponent implements OnInit {
  @Input() checklistcformenable: boolean;
  checklistdformenable: boolean = true;
  ChecklistC  :FormGroup
  currentDate: string;
  currenttime: string;
  currentUser: any;
  disableIO: any;
  private onSubmitInterval: any;
  private addSubscription: Subscription | undefined;
  id: any;
  skipcolor: any;
  colour:string = 'null';
  clrvalue: string='null';
  formid: any;
  formdisable:boolean;
  enable: boolean = false;
  aceptreject:string = 'null';
  remainingValues: any;
  open1:boolean;
  @Input() expand: boolean;

  constructor(private fb: FormBuilder,
    private apiService:ChecklistCService,
    private router: Router,
    private toast: MatSnackBar,
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
formInitialization(){
  this.ChecklistC= this.fb.group({

    iot_furnace_control_id:['1.Has IOT  manually  moved the BM sequence to Stand By step and also manually  moved the Furnace control sequence moves to Purge & Light Off step. '],
       // oot_reset_IOTmove_BM_sequence:[' '],
    pressure_test_id:['2.If the pressure test and hold pressure (holding time = 30 seconds) is performed in this step prior to the pad/depad. Then ,does pad/depad to atmosphere is done 6 times in “auto”. If purge permissive are not maintained or pressure up & holding do not meet the requirements, furnace will trip.'],
    iot_fuel_header_purge_id:['3. IOTs ensure that whether BM sequence returns back to Standby step after Fuel Header Purge step is done.'],

    oot_adjacent_furnaces_area_id:['4.OOT check and  make sure that the furnace to be lit and the adjacent furnaces area is cleared of all personnel, including the Furnace OOT. '],

    iot_request_local_reset_id:['5.After one purge volume is completed, Has IOT  requested OOT to push local reset button (field flashing green light should come on solid). '],

    iot_move_pressure_test_id:['6.Has IOT moved BM sequence to Pressure Test step within 15 minutes of field reset. '],

    iot_pressure_up_id:['7.Has IOT  observed pressure test of fuel gas system.Step1: Pressure Up: bypass DB&B opens, local PCV opens and header is pressurized to 0.2 kg/cm2g within 100 seconds, or trip occurs.'],

    iot_Hold_id:[' Step2:Hold: bypass DB&B closes, pressure must not drop more than 0.02 kg/cm2 (10%) or trip occurs.'],

    oot_pressure_test_id:['8.If Pressure Test fails, has OOT  de-pressured fuel gas headers to radiant box. '],

    pressure_test_BM_sequence_id:['9.When Pressure Test is complete BM sequence moves automatically to Firebox Purge step. '],

    oot_4_automated_burners_id:['10.Has the OOT ensured that all floor burners air registers are fully open, except the 4 automated burners that must be closed. '],

    oot_wall_burners_id:['11.Has OOT  ensured that all wall burners air registers are closed. '],

    bm_sequence_moves_purge_id:['12.After 5 purge volumes are completed, does the BM sequence moves automatically to Purge Complete step. '],

    iot_steam_drum_level_id:['13.Has IOT  ensured that ALL parameters below are OK so he can initiate the light off.Step1:*Steam drum level.'],

    iot_firebox_draft_id:['Step2:*Firebox draft.'],

    iot_automated_burners_id:['Step3:*All automated burners are ready for light off. '],

    iot_purge_permissive_id:['Step4:*purge permissive true. '],

    iot_no_combustibles_id:['Step5:*No combustibles in firebox.'],

    iot_fuel_control_id:['Step6:*Fuel control valves closed.'],

    iot_total_trip_id:['14.Has IOT  moved BM sequence to Light off Burners step within 15 minutes of Purge complete otherwise the furnace will go to Total    Trip.'],

    iot_to_manually_RESET_id:['15.Has IOT  manually RESET the BM & BNR alarms (unlatch). The remote burner light off cycle is automatically initiated in this step. Auto burner Light off attempt sequence is #7, #30, #21 and #16. '],

    one_burner_bms_id:['16.Do Ensure that atleast one burner in each zone must be lit to move the Burner Management sequence to the Run step. '],

    oot_adjust_air_damper_id:['17.Has OOT  adjusted the air damper for the automated burners which are lit to one notch for steady flame. '],

    oot_igniters_not_stuck_id:['18.Has OOT  ensured Igniters are not stuck inside the firebox. '],

    iot_unsuccessful_light_id:['19.Step1:Has IOT  confirmed BNR sequence moves after light off attempt:Unsuccessful light, sequence moves to total Trip step (HV closes). '],

    iot_successful_light_id:['Step2:Successful light, sequence can be moved to Run step by IOT '],


    furnace_failed_id:['20.If the Light off of the furnace failed, has OOT  manually depressurized the burner headers. '],

    iot_manually_move_BM_sequence_id:['21.Has IOT  manually move BM sequence to Run step if successfully achieved at least one burner per zone '],

    iot_to_confirm_id:['22.Has IOT confirmed that Furnace sequence has auto moved to Warm Up Arch step. '],

    e_attempted_via_the_HMI_id:['23.Has Auto burners that did not successfully light during the auto-light cycle, have it  been re-attempted via the HMI '],



    iot_furnace_control:[null,Validators.required],
    iot_furnace_control_comment:[null],
    // oot_reset_IOTmove_BM_sequence:[null,Validators.required],
    pressure_test:[null,Validators.required],
    pressure_test_comment:[null],
    iot_fuel_header_purge:[null,Validators.required],
    iot_fuel_header_purge_comment:[null],
    oot_adjacent_furnaces_area:[null,Validators.required],
    oot_adjacent_furnaces_area_comment:[null],
    iot_request_local_reset:[null,Validators.required],
    iot_request_local_reset_comment:[null],
    iot_move_pressure_test:[null,Validators.required],
    iot_move_pressure_test_comment:[null],
    iot_pressure_up:[null,Validators.required],
    iot_pressure_up_comment:[null],
    iot_Hold:[null,Validators.required],
    iot_Hold_comment:[null],
    oot_pressure_test:[null,Validators.required],
    oot_pressure_test_comment:[null],
    pressure_test_BM_sequence:[null,Validators.required],
    pressure_test_BM_sequence_comment:[null],
    oot_4_automated_burners:[null,Validators.required],
    oot_4_automated_burners_comment:[null],
    oot_wall_burners:[null,Validators.required],
    oot_wall_burners_comment:[null],
    bm_sequence_moves_purge:[null,Validators.required],
    bm_sequence_moves_purge_comment:[null],
    iot_steam_drum_level:[null,Validators.required],
    iot_steam_drum_level_comment:[null],
    iot_firebox_draft:[null,Validators.required],
    iot_firebox_draft_comment:[null],
    iot_automated_burners:[null,Validators.required],
    iot_automated_burners_comment:[null],
    iot_purge_permissive:[null,Validators.required],
    iot_purge_permissive_comment:[null],
    iot_no_combustibles:[null,Validators.required],
    iot_no_combustibles_comment:[null],
    iot_fuel_control:[null,Validators.required],
    iot_fuel_control_comment:[null],
    iot_total_trip:[null,Validators.required],
    iot_total_trip_comment:[null],
    iot_to_manually_RESET:[null,Validators.required],
    iot_to_manually_RESET_comment:[null],
    one_burner_bms:[null,Validators.required],
    one_burner_bms_comment:[null],
    oot_adjust_air_damper:[null,Validators.required],
    oot_adjust_air_damper_comment:[null],
    oot_igniters_not_stuck:[null,Validators.required],
    oot_igniters_not_stuck_comment:[null],
    iot_unsuccessful_light:[null,Validators.required],
    iot_unsuccessful_light_comment:[null],
    iot_successful_light:[null,Validators.required],
    iot_successful_light_comment:[null],
    furnace_failed:[null,Validators.required],
    furnace_failed_comment:[null],
    iot_manually_move_BM_sequence:[null,Validators.required],
    iot_manually_move_BM_sequence_comment:[null],
    iot_to_confirm:[null,Validators.required],
    iot_to_confirm_comment:[null],
    e_attempted_via_the_HMI:[null,Validators.required],
    e_attempted_via_the_HMI_comment:[null],
    shift_comment_c_oot:[null],
    shift_comment_c_iot:[null],
    userid:[this.currentUser.id],
    master_id:[1],
    Light_Off_table_1_id:[null,Validators.required],
id:[this.id]

  })
}
patchvalue(){
  console.log('patchvalue() called');

  this.ChecklistC.patchValue({

    iot_furnace_control_comment:this.concatenateValues(this.ChecklistC.get('iot_furnace_control_id')?.value,this.ChecklistC.get('iot_furnace_control_comment')?.value ),
    pressure_test_comment:this.concatenateValues(this.ChecklistC.get('pressure_test_id')?.value,this.ChecklistC.get('pressure_test_comment')?.value ),
    iot_fuel_header_purge_comment:this.concatenateValues(this.ChecklistC.get('iot_fuel_header_purge_id')?.value,this.ChecklistC.get('iot_fuel_header_purge_comment')?.value ),
    oot_adjacent_furnaces_area_comment:this.concatenateValues(this.ChecklistC.get('oot_adjacent_furnaces_area_id')?.value,this.ChecklistC.get('oot_adjacent_furnaces_area_comment')?.value ),
    iot_request_local_reset_comment:this.concatenateValues(this.ChecklistC.get('iot_request_local_reset_id')?.value,this.ChecklistC.get('iot_request_local_reset_comment')?.value ),
    iot_move_pressure_test_comment:this.concatenateValues(this.ChecklistC.get('iot_move_pressure_test_id')?.value,this.ChecklistC.get('iot_move_pressure_test_comment')?.value ),
    iot_pressure_up_comment:this.concatenateValues(this.ChecklistC.get('iot_pressure_up_id')?.value,this.ChecklistC.get('iot_pressure_up_comment')?.value ),
    iot_Hold_comment:this.concatenateValues(this.ChecklistC.get('iot_Hold_id')?.value,this.ChecklistC.get('iot_Hold_comment')?.value ),
    oot_pressure_test_comment:this.concatenateValues(this.ChecklistC.get('oot_pressure_test_id')?.value,this.ChecklistC.get('oot_pressure_test_comment')?.value ),
    pressure_test_BM_sequence_comment:this.concatenateValues(this.ChecklistC.get('pressure_test_BM_sequence_id')?.value,this.ChecklistC.get('pressure_test_BM_sequence_comment')?.value ),
    oot_4_automated_burners_comment:this.concatenateValues(this.ChecklistC.get('oot_4_automated_burners_id')?.value,this.ChecklistC.get('oot_4_automated_burners_comment')?.value ),
    oot_wall_burners_comment:this.concatenateValues(this.ChecklistC.get('oot_wall_burners_id')?.value,this.ChecklistC.get('oot_wall_burners_comment')?.value ),
    bm_sequence_moves_purge_comment:this.concatenateValues(this.ChecklistC.get('bm_sequence_moves_purge_id')?.value,this.ChecklistC.get('bm_sequence_moves_purge_comment')?.value ),
    iot_steam_drum_level_comment:this.concatenateValues(this.ChecklistC.get('iot_steam_drum_level_id')?.value,this.ChecklistC.get('iot_steam_drum_level_comment')?.value ),
    iot_firebox_draft_comment:this.concatenateValues(this.ChecklistC.get('iot_firebox_draft_id')?.value,this.ChecklistC.get('iot_firebox_draft_comment')?.value ),
    iot_automated_burners_comment:this.concatenateValues(this.ChecklistC.get('iot_automated_burners_id')?.value,this.ChecklistC.get('iot_automated_burners_comment')?.value ),
    iot_purge_permissive_comment:this.concatenateValues(this.ChecklistC.get('iot_purge_permissive_id')?.value,this.ChecklistC.get('iot_purge_permissive_comment')?.value ),
    iot_no_combustibles_comment:this.concatenateValues(this.ChecklistC.get('iot_no_combustibles_id')?.value,this.ChecklistC.get('iot_no_combustibles_comment')?.value ),
    iot_fuel_control_comment:this.concatenateValues(this.ChecklistC.get('iot_fuel_control_id')?.value,this.ChecklistC.get('iot_fuel_control_comment')?.value ),
    iot_total_trip_comment:this.concatenateValues(this.ChecklistC.get('iot_total_trip_id')?.value,this.ChecklistC.get('iot_total_trip_comment')?.value ),
    iot_to_manually_RESET_comment:this.concatenateValues(this.ChecklistC.get('iot_to_manually_RESET_id')?.value,this.ChecklistC.get('iot_to_manually_RESET_comment')?.value ),
    one_burner_bms_comment:this.concatenateValues(this.ChecklistC.get('one_burner_bms_id')?.value,this.ChecklistC.get('one_burner_bms_comment')?.value ),
    oot_adjust_air_damper_comment:this.concatenateValues(this.ChecklistC.get('oot_adjust_air_damper_id')?.value,this.ChecklistC.get('oot_adjust_air_damper_comment')?.value ),
    oot_igniters_not_stuck_comment:this.concatenateValues(this.ChecklistC.get('oot_igniters_not_stuck_id')?.value,this.ChecklistC.get('oot_igniters_not_stuck_comment')?.value ),
    iot_unsuccessful_light_comment:this.concatenateValues(this.ChecklistC.get('iot_unsuccessful_light_id')?.value,this.ChecklistC.get('iot_unsuccessful_light_comment')?.value ),
    iot_successful_light_comment:this.concatenateValues(this.ChecklistC.get('iot_successful_light_id')?.value,this.ChecklistC.get('iot_successful_light_comment')?.value ),
    furnace_failed_comment:this.concatenateValues(this.ChecklistC.get('furnace_failed_id')?.value,this.ChecklistC.get('furnace_failed_comment')?.value ),
    iot_manually_move_BM_sequence_comment:this.concatenateValues(this.ChecklistC.get('iot_manually_move_BM_sequence_id')?.value,this.ChecklistC.get('iot_manually_move_BM_sequence_comment')?.value ),
    iot_to_confirm_comment:this.concatenateValues(this.ChecklistC.get('iot_to_confirm_id')?.value,this.ChecklistC.get('iot_to_confirm_comment')?.value ),
    e_attempted_via_the_HMI_comment:this.concatenateValues(this.ChecklistC.get('e_attempted_via_the_HMI_id')?.value,this.ChecklistC.get('e_attempted_via_the_HMI_comment')?.value ),
  })
  console.log( this.ChecklistC);
}
concatenateValues(controlValue1:any, controlValue2:any): string {
  // console.log('controlValue1:'+controlValue1+'controlValue2:'+controlValue2)
  const control1Value = controlValue1 ;
  const control2Value =controlValue2 ? controlValue2 :null;

  if (control2Value === null) {
    let result :any;
    console.log('concatenate values if');
    return result;
}


  else{
    let result1 = `${control1Value} || ${control2Value}`
    console.log('else:'+result1)
    return result1;
  }


}








toggleEnable() {
  this.enable = !this.enable; // Toggle the value of enable between true and false
}
setupSubmitInterval() {
  this.onSubmitInterval = setInterval(() => {
    console.log('onSubmitInterval: ', this.onSubmitInterval);
    this.add();
  }, 5* 1000); // 2 minutes in milliseconds
}
onSubmit() {

  const formData = this.ChecklistC.value;
  this.apiService.savecheckcpage(formData).subscribe(
    (response) => {
      this.id=response.result.id;
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
  this.checklistdformenable=false;
  this.expand = false;
    this.open1 =true
}
add() {
  this.apiService.getchecklistC().subscribe((response: any) => {
    if (response && response.result) { // Check if response and response.result are not null or undefined
      this.remainingValues = response.result;
      this.formdisable = response.result.status === "Complete" ? true : false;
      Object.keys(this.remainingValues).forEach(key => {
        if (key !== 'shift_comment_c_oot' && key !== 'shift_comment_c_iot') {
          this.ChecklistC.get(key)?.patchValue(this.remainingValues[key]);
        }
      });
    } else {
      console.log("Response or response.result is null or undefined.");
      // Handle the error or notify the user accordingly
    }

    this.ChecklistC.get('iot_furnace_control_comment')?.setValue(this.ChecklistC.get('iot_furnace_control_comment')?.value ? this.ChecklistC.get('iot_furnace_control_comment')?.value.split("||")[1].trim() : null);
    this.ChecklistC.get('pressure_test_comment')?.setValue(this.ChecklistC.get('pressure_test_comment')?.value ? this.ChecklistC.get('pressure_test_comment')?.value.split("||")[1].trim() : null);
    this.ChecklistC.get('iot_fuel_header_purge_comment')?.setValue(this.ChecklistC.get('iot_fuel_header_purge_comment')?.value ? this.ChecklistC.get('iot_fuel_header_purge_comment')?.value.split("||")[1].trim() : null);
    this.ChecklistC.get('oot_adjacent_furnaces_area_comment')?.setValue(this.ChecklistC.get('oot_adjacent_furnaces_area_comment')?.value ? this.ChecklistC.get('oot_adjacent_furnaces_area_comment')?.value.split("||")[1].trim() : null);
    this.ChecklistC.get('iot_request_local_reset_comment')?.setValue(this.ChecklistC.get('iot_request_local_reset_comment')?.value ? this.ChecklistC.get('iot_request_local_reset_comment')?.value.split("||")[1].trim() : null);
    this.ChecklistC.get('iot_move_pressure_test_comment')?.setValue(this.ChecklistC.get('iot_move_pressure_test_comment')?.value ? this.ChecklistC.get('iot_move_pressure_test_comment')?.value.split("||")[1].trim() : null);
    this.ChecklistC.get('iot_pressure_up_comment')?.setValue(this.ChecklistC.get('iot_pressure_up_comment')?.value ? this.ChecklistC.get('iot_pressure_up_comment')?.value.split("||")[1].trim() : null);
    this.ChecklistC.get('iot_Hold_comment')?.setValue(this.ChecklistC.get('iot_Hold_comment')?.value ? this.ChecklistC.get('iot_Hold_comment')?.value.split("||")[1].trim() : null);
    this.ChecklistC.get('oot_pressure_test_comment')?.setValue(this.ChecklistC.get('oot_pressure_test_comment')?.value ? this.ChecklistC.get('oot_pressure_test_comment')?.value.split("||")[1].trim() : null);
    this.ChecklistC.get('pressure_test_BM_sequence_comment')?.setValue(this.ChecklistC.get('pressure_test_BM_sequence_comment')?.value ? this.ChecklistC.get('pressure_test_BM_sequence_comment')?.value.split("||")[1].trim() : null);
    this.ChecklistC.get('oot_4_automated_burners_comment')?.setValue(this.ChecklistC.get('oot_4_automated_burners_comment')?.value ? this.ChecklistC.get('oot_4_automated_burners_comment')?.value.split("||")[1].trim() : null);
    this.ChecklistC.get('oot_wall_burners_comment')?.setValue(this.ChecklistC.get('oot_wall_burners_comment')?.value ? this.ChecklistC.get('oot_wall_burners_comment')?.value.split("||")[1].trim() : null);
    this.ChecklistC.get('bm_sequence_moves_purge_comment')?.setValue(this.ChecklistC.get('bm_sequence_moves_purge_comment')?.value ? this.ChecklistC.get('bm_sequence_moves_purge_comment')?.value.split("||")[1].trim() : null);
    this.ChecklistC.get('iot_steam_drum_level_comment')?.setValue(this.ChecklistC.get('iot_steam_drum_level_comment')?.value ? this.ChecklistC.get('iot_steam_drum_level_comment')?.value.split("||")[1].trim() : null);
    this.ChecklistC.get('iot_firebox_draft_comment')?.setValue(this.ChecklistC.get('iot_firebox_draft_comment')?.value ? this.ChecklistC.get('iot_firebox_draft_comment')?.value.split("||")[1].trim() : null);
    this.ChecklistC.get('iot_automated_burners_comment')?.setValue(this.ChecklistC.get('iot_automated_burners_comment')?.value ? this.ChecklistC.get('iot_automated_burners_comment')?.value.split("||")[1].trim() : null);
    this.ChecklistC.get('iot_purge_permissive_comment')?.setValue(this.ChecklistC.get('iot_purge_permissive_comment')?.value ? this.ChecklistC.get('iot_purge_permissive_comment')?.value.split("||")[1].trim() : null);
    this.ChecklistC.get('iot_no_combustibles_comment')?.setValue(this.ChecklistC.get('iot_no_combustibles_comment')?.value ? this.ChecklistC.get('iot_no_combustibles_comment')?.value.split("||")[1].trim() : null);
    this.ChecklistC.get('iot_fuel_control_comment')?.setValue(this.ChecklistC.get('iot_fuel_control_comment')?.value ? this.ChecklistC.get('iot_fuel_control_comment')?.value.split("||")[1].trim() : null);
    this.ChecklistC.get('iot_total_trip_comment')?.setValue(this.ChecklistC.get('iot_total_trip_comment')?.value ? this.ChecklistC.get('iot_total_trip_comment')?.value.split("||")[1].trim() : null);
    this.ChecklistC.get('iot_to_manually_RESET_comment')?.setValue(this.ChecklistC.get('iot_to_manually_RESET_comment')?.value ? this.ChecklistC.get('iot_to_manually_RESET_comment')?.value.split("||")[1].trim() : null);
    this.ChecklistC.get('one_burner_bms_comment')?.setValue(this.ChecklistC.get('one_burner_bms_comment')?.value ? this.ChecklistC.get('one_burner_bms_comment')?.value.split("||")[1].trim() : null);
    this.ChecklistC.get('oot_adjust_air_damper_comment')?.setValue(this.ChecklistC.get('oot_adjust_air_damper_comment')?.value ? this.ChecklistC.get('oot_adjust_air_damper_comment')?.value.split("||")[1].trim() : null);
    this.ChecklistC.get('oot_igniters_not_stuck_comment')?.setValue(this.ChecklistC.get('oot_igniters_not_stuck_comment')?.value ? this.ChecklistC.get('oot_igniters_not_stuck_comment')?.value.split("||")[1].trim() : null);
    this.ChecklistC.get('iot_unsuccessful_light_comment')?.setValue(this.ChecklistC.get('iot_unsuccessful_light_comment')?.value ? this.ChecklistC.get('iot_unsuccessful_light_comment')?.value.split("||")[1].trim() : null);
    this.ChecklistC.get('iot_successful_light_comment')?.setValue(this.ChecklistC.get('iot_successful_light_comment')?.value ? this.ChecklistC.get('iot_successful_light_comment')?.value.split("||")[1].trim() : null);
    this.ChecklistC.get('furnace_failed_comment')?.setValue(this.ChecklistC.get('furnace_failed_comment')?.value ? this.ChecklistC.get('furnace_failed_comment')?.value.split("||")[1].trim() : null);
    this.ChecklistC.get('iot_manually_move_BM_sequence_comment')?.setValue(this.ChecklistC.get('iot_manually_move_BM_sequence_comment')?.value ? this.ChecklistC.get('iot_manually_move_BM_sequence_comment')?.value.split("||")[1].trim() : null);
    this.ChecklistC.get('iot_to_confirm_comment')?.setValue(this.ChecklistC.get('iot_to_confirm_comment')?.value ? this.ChecklistC.get('iot_to_confirm_comment')?.value.split("||")[1].trim() : null);
    this.ChecklistC.get('e_attempted_via_the_HMI_comment')?.setValue(this.ChecklistC.get('e_attempted_via_the_HMI_comment')?.value ? this.ChecklistC.get('e_attempted_via_the_HMI_comment')?.value.split("||")[1].trim() : null);

    if (response && response.result) {
      this.skipcolor = response.result;
      
   
    
      Object.entries(this.skipcolor).forEach(([key, value]) => {
        if (value === 'accept'|| value==='reject') {
         

            this.colour = (key);
            console.log('this.colour: ', this.colour);
            this.clrvalue=(value);
            console.log('this.clrvalue: ', this.clrvalue);
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
  console.log("kk");
  const activeElement = document.activeElement as HTMLElement;
  console.log('activeElement: ', activeElement);

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
  // this.ChecklistC.get('shift_comment_c_oot')?.setValue(this.remainingValues.shift_comment_c_oot);
  // this.ChecklistC.get('shift_comment_c_iot')?.setValue(this.remainingValues.shift_comment_c_iot);
const formData = this.ChecklistC.value;
console.log('formData: ', formData);

this.apiService.updatePermitData(formData).subscribe(
  (response) => {
    // Assuming 'permitForm' is a FormGroup
    this.ChecklistC.get('shift_comment_c_oot')?.setValue(null);
    this.ChecklistC.get('shift_comment_c_iot')?.setValue(null);
   console.log(response)
  },
  (error) => {
    console.error('An error occurred:', error);

    // Handle error appropriately, e.g., show error message to user
  }
);
}
clearTextarea(){
  this.ChecklistC.get('shift_comment_c_oot')?.setValue(null);
  this.ChecklistC.get('shift_comment_c_iot')?.setValue(null);
}
}