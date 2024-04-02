import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder,FormGroup} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ChecklistCService } from '@app/utils/service/checklist-c.service';

@Component({
  selector: 'app-checklist-c',
  templateUrl: './checklist-c.component.html',
  styleUrls: ['./checklist-c.component.css']
})
export class ChecklistCComponent implements OnInit {
  @Input() checklistcformenable: boolean;
  FirstForm:FormGroup
  currentUser: any;
  disableIO: any;
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

formInitialization(){
  this.FirstForm = this.fb.group({
    IOT_Furnace_control_sequence:[false],
    OOT_reset_IOTmove_BM_sequence:[false],
    pressure_test:[false],
    IOT_Fuel_Header_Purge:[false],
    OOT_adjacent_furnaces_area:[false],
    IOT_request_local_reset:[false],
    IOT_move_Pressure_Test:[false],
    IOT_Pressure_Up:[false],
    IOT_Hold:[false],
    OOT_Pressure_Test:[false],
    Pressure_Test_BM_sequence:[false],
    OOT_4_automated_burners:[false],
    OOT_wall_burners:[false],
    BM_sequence_moves_Purge:[false],
    IOT_Steam_drum_level:[false],
    IOT_Firebox_draft:[false],
    IOTautomated_burner:[false],
    IOT_purge_permissive:[false],
    IOT_No_combustibles:[false],
    IOT_Fuel_control:[false],
    IOT_Total_Trip:[false],
    IOT_to_manually_RESET:[false],
    one_burner_bms:[false],
    OOT_adjust_air_damper:[false],
    OOT_Igniters_not_stuck:[false],
    iot_Unsuccessful_light:[false],
    iot_Successful_light:[false],
    furnace_failed:[false],
    iot_manually_move_BM_sequence:[false],
    IOT_to_confirm:[false],
    e_attempted_via_the_HMI:[false],
    Light_Off_table_1_id:[]


  })
}
submit() {if (this.FirstForm.valid) {
  const formData = this.FirstForm.value;
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
  
}
}
