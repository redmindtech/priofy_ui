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

}
ngOnDestroy(): void {
  clearInterval(this.onSubmitInterval);
  if (this.addSubscription) {
    this.addSubscription.unsubscribe();
  }
}
formInitialization(){
  this.ChecklistC= this.fb.group({
    iot_furnace_control_sequence:[null,Validators.required],
    oot_reset_IOTmove_BM_sequence:[null,Validators.required],
    pressure_test:[null,Validators.required],
    iot_fuel_header_purge:[null,Validators.required],
    oot_adjacent_furnaces_area:[null,Validators.required],
    iot_request_local_reset:[null,Validators.required],
    iot_move_pressure_test:[null,Validators.required],
    iot_pressure_up:[null,Validators.required],
    iot_Hold:[null,Validators.required],
    oot_pressure_test:[null,Validators.required],
    pressure_test_BM_sequence:[null,Validators.required],
    oot_4_automated_burners:[null,Validators.required],
    oot_wall_burners:[null,Validators.required],
    bm_sequence_moves_purge:[null,Validators.required],
    iot_steam_drum_level:[null,Validators.required],
    iot_firebox_draft:[null,Validators.required],
    iot_automated_burners:[null,Validators.required],
    iot_purge_permissive:[null,Validators.required],
    iot_no_combustibles:[null,Validators.required],
    iot_fuel_control:[null,Validators.required],
    iot_total_trip:[null,Validators.required],
    iot_to_manually_RESET:[null,Validators.required],
    one_burner_bms:[null,Validators.required],
    oot_adjust_air_damper:[null,Validators.required],
    oot_igniters_not_stuck:[null,Validators.required],
    iot_unsuccessful_light:[null,Validators.required],
    iot_successful_light:[null,Validators.required],
    furnace_failed:[null,Validators.required],
    iot_manually_move_BM_sequence:[null,Validators.required],
    iot_to_confirm:[null,Validators.required],
    e_attempted_via_the_HMI:[null,Validators.required],
    userid:['1'],
    master_id:['1'],
    Light_Off_table_1_id:[]


  })
}
setupSubmitInterval() {
  this.onSubmitInterval = setInterval(() => {
    console.log('onSubmitInterval: ', this.onSubmitInterval);
    this.add();
  }, 15* 1000); // 2 minutes in milliseconds
}
onSubmit() {
  
  const formData = this.ChecklistC.value;
  this.apiService.savecheckcpage(formData).subscribe(
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
  this.checklistdformenable=true;
}
add() {
  this.apiService.getchecklistC().subscribe((response: any) => {
    console.log(response, 'checking');
    this.ChecklistC.patchValue(response.result);
  });
}
}
