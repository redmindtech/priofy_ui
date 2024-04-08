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
  enable: boolean = false; 
  aceptreject:string = 'null';
  remainingValues: any;

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
    Light_Off_table_1_id:[null,Validators.required]
    

  })
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
}
add() {
  this.apiService.getchecklistC().subscribe((response: any) => {
    if (response && response.result) { // Check if response and response.result are not null or undefined
      this.remainingValues = response.result;

      Object.keys(this.remainingValues).forEach(key => {
        if (key !== 'shift_comment_c_oot' && key !== 'shift_comment_c_iot') {
          this.ChecklistC.get(key)?.patchValue(this.remainingValues[key]);
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
}