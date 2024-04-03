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
    IOT_Furnace_control_sequence:[null,Validators.required],
    OOT_reset_IOTmove_BM_sequence:[null,Validators.required],
    pressure_test:[null,Validators.required],
    IOT_Fuel_Header_Purge:[null,Validators.required],
    OOT_adjacent_furnaces_area:[null,Validators.required],
    IOT_request_local_reset:[null,Validators.required],
    IOT_move_Pressure_Test:[null,Validators.required],
    IOT_Pressure_Up:[null,Validators.required],
    IOT_Hold:[null,Validators.required],
    OOT_Pressure_Test:[null,Validators.required],
    Pressure_Test_BM_sequence:[null,Validators.required],
    OOT_4_automated_burners:[null,Validators.required],
    OOT_wall_burners:[null,Validators.required],
    BM_sequence_moves_Purge:[null,Validators.required],
    IOT_Steam_drum_level:[null,Validators.required],
    IOT_Firebox_draft:[null,Validators.required],
    IOTautomated_burner:[null,Validators.required],
    IOT_purge_permissive:[null,Validators.required],
    IOT_No_combustibles:[null,Validators.required],
    IOT_Fuel_control:[null,Validators.required],
    IOT_Total_Trip:[null,Validators.required],
    IOT_to_manually_RESET:[null,Validators.required],
    one_burner_bms:[null,Validators.required],
    OOT_adjust_air_damper:[null,Validators.required],
    OOT_Igniters_not_stuck:[null,Validators.required],
    iot_Unsuccessful_light:[null,Validators.required],
    iot_Successful_light:[null,Validators.required],
    furnace_failed:[null,Validators.required],
    iot_manually_move_BM_sequence:[null,Validators.required],
    IOT_to_confirm:[null,Validators.required],
    e_attempted_via_the_HMI:[null,Validators.required],
    userid:[1],
    Light_Off_table_1_id:[]


  })
}
setupSubmitInterval() {
  this.onSubmitInterval = setInterval(() => {
    console.log('onSubmitInterval: ', this.onSubmitInterval);
    this.add();
  }, 15* 1000); // 2 minutes in milliseconds
}
onSubmit() {if (this.ChecklistC.valid) {
  const formData = this.ChecklistC.value;
  this.apiService.savecheckcpage(formData).subscribe(
    (response) => {

      console.log('Data saved successfully:', response);
      this.toast.open('Data saved successfully', 'Close', { duration: 3000 });

      this.router.navigate(['/blank']);
    },
    (error) => {

      console.error('Error saving data:', error);
      this.toast.open('Error saving data', 'Close', { duration: 3000 });
    }
  );
}
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
