import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ChecklistBService } from '@app/utils/service/checklist-b.service';


@Component({
  selector: 'app-checklist-b',
  templateUrl: './checklist-b.component.html',
  styleUrls: ['./checklist-b.component.css']
})
export class ChecklistBComponent implements OnInit {
  @Input() checklistbformenable: boolean;
  checklistcformenable: boolean = true;
  FirstFormb: FormGroup;
  currentUser: any;
  disableIO: any;
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
    }

formInitialization(){
  this.FirstFormb = this.fb.group({
   
    userid:[1],
   
    OOT_bearings_oil_levels:[false],
    iot_Overview_HMI:[false],
    UPS_system:[false],
    oot_caged_doors_open:[false],
    oot_peep_doors_closed:[false],
    oot_local_start_stop:[false],
    oot_ID_fan_casing:[false],
    oot_FD_suction:[false],
    oot_Floor_burners:[false],
    oot_Wall_burners :[false],
    iot_start_ID_fan:[false],
    iot_ID_fan_running:[false],
    iot_fanmotor_readings:[false],
    oot_ID_fan_abnormality:[false],
    oot_four_air_duct:[false],
    iot_start_FD:[false],
    iot_FD_fan_running:[false],
    iot_FC_signal:[false],
    iot_close_the_doors:[false],
    iot_FC_back_in_auto:[false],
    iot_FD_fanmotor_readings:[false],
    oot_FD_shaft_speed:[false] ,
    oot_FD_fan_abnormality:[false],
    oot_LS_steam_condensate:[false],
    oot_S_TLE:[false],
    oot_T_TLE:[false],
    oot_CG_movs_intermediate:[false],
    oot_CG_HV_22X6_13A:[false],
    oot_Decoke_MOV:[false],
    oot_Double_Block:[false],
    oot_LS_purge_lined_up:[false],
    MS_Steam:[false],
    fgs_ready:[false],
    oot_burners_manual_BV:[false],
    oot_ignitor_and_flame_scanner:[false],
    oot_fourth_platform_level:[false],
    oot_1inch_BV_to_AT_22x0_11A:[false],
    oot_1inch_BV_to_AT_22x0_11B:[false],
    oot_34_BV_to_AP_22x0_11A:[false],
    oot_3by4inch_BV_to_AP_22x0_11B:[false],
    iot_ignitors_and_flame_scanners:[false],



})
}

  submit()
  {
  if (this.FirstFormb.valid) {
    const formData = this.FirstFormb.value;
    this.apiService.savecheckbpage(formData).subscribe(
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
  this.checklistcformenable=true;
}
}
