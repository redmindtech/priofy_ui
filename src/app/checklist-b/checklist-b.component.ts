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
  open1:boolean;
  skipcolor: any;
  colour:string = 'null';
  clrvalue: string='null';
  formid: any;
  formdisable:boolean;
  @Input() expand: boolean;
  enable: boolean = false;
  aceptreject:string = 'null';
  remainingValues: any;
  statusvalue: { [x: string]: string; };
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
    console.log(this.ChecklistB)
    }
    ngOnDestroy(): void {
      clearInterval(this.onSubmitInterval);
      if (this.addSubscription) {
        this.addSubscription.unsubscribe();
      }
    }
formInitialization(){

  this.ChecklistB= this.fb.group({
    oot_bearings_oil_levels_id:['1. Has OOT confirmed that both fan bearings oil levels cups are filled to normal'],
    iot_Overview_HMI_id:['2.Has IOT confirmed that the VFDs are powered up and the motors are energized in the MCC at the Fan Overview HMI (ready DI from motor and alarm signal from VSD).'],
    ups_system_id:['3.Confirm that pure wave UPS system is up and running. Check with Electrician is required for confirmation.  '],
    oot_caged_doors_open_id:['4.Has OOT confirmed that each drop out door area is caged and both doors are open.'],
    oot_peep_doors_closed_id:['5.Has OOT confirmed all peep doors at all levels are closed and levers  installed.'],
    oot_local_start_stop_id:['6.Has OOT placed local “start-stop” switch in “auto” for both fans.'],
    oot_ID_fan_casing_id:['7.Has OOT checked that whether the ID fan casing 1” drain valve is closed.'],
    oot_FD_suction_id:['8.Has OOT checked that the FD suction 2” B/V and casing 2” drain valve are both closed.'],
    oot_Floor_burners_id:['9.step1:*Floor burners (bottom level) open, except ALL 4 auto burners.'],
    oot_Wall_burners_id :['9.step2:*Wall burners (top level) closed.'],
    iot_start_ID_fan_id:['10.Has the IOT started ID fan.'],
    iot_ID_fan_running_id:['11.Has IOTs ensured the ID fan is running.'],
    iot_FD_fan_motor_readings_id:['12.Has IOT checked ID fan/motor vibration readings are within the acceptable limits and NO alarms.'],
    oot_ID_fan_abnormality_id:['13.Has OOT checked the ID fan for any abnormality in the field.'],
    oot_four_air_duct_id:['14.Has the OOT confirmed that the four air duct “chain valves” to each burner side are open.'],
    iot_start_FD_id:['15.Has IOT started FD fan.'],
    iot_FD_fan_running_id:['16.Has IOT ensured the FD fan is running.'],
    iot_FC_signal_id:['17.Step 1: put FC signal in manual at 50% to achieve a FD fan speed higher than 475 rpm.'],
    iot_close_the_doors_id:['17.Step 2: close the doors.'],
    iot_FC_back_in_auto_id:['17.Step 3: put the FC back in auto.'],
    iot_fan_motor_readings_id:['18.Has IOT checked FD fan/motor vibration readings are within the acceptable limits and NO alarms.'],
    oot_FD_shaft_speed_id:['19.Has OOT checked that the FD fan vibration and shaft speed local indicators are operational.'],
    oot_FD_fan_abnormality_id:['20.Has OOT checked the FD fan for any abnormality in the field.'],
    oot_LS_Steam_condensate_id:['21.Has OOT ensured LS steam / condensate main block valve at the furnace battery limit are open and LS is lined up to HV-22X6-13B seat.'],
    oot_S_TLE_id:['22.Step1:*S-TLE inlet PT-22X5-05.'],
    oot_T_TLE_id:['22.Step2:*T-TLE outlet PT-22X6-01 and PT-22X6-02.'],
    oot_CG_MOVs_intermediate_id:['22.Step3:*CG MOVs intermediate PT-22X6-07 (also HV-22X6-15 must be closed).'],
    oot_CG_HV_22X6_13A_id:['22.Step4:*CG MOVs HV-22X6-13A.'],
    oot_Decoke_MOV_id:['22.Step5:*Decoke MOV HV-22X6-14.'],
    oot_Double_Block_id:['23.OOT ensure that LS Purge to Instruments 2” Double Block is open.'],
    oot_LS_purge_lined_up_id:['24.OOT ensure that all LS purge system steam traps are lined up and operational.'],
    ms_Steam_id:['25.Ensure that MS Steam is available.'],
    fgs_ready_id:['26.Ensure that Fuel Gas system is ready.'],
    oot_burners_manual_BV_id:['27.Has OOT ensured that all burners manual B/V and all four HV-automated burner valves are closed.'],
    oot_ignitor_and_flame_scanner_id:['28.Has OOT ensured that ignitor and flame scanner Instrument Air purges are on. '],
    oot_fourth_platform_level_id:['29.Step1:*2” main B/V at fourth platform level.'],
    oot_1_BV_to_AT_22X0_11A_id:['29.Step2:*1” B/V to AT-22X0-11A.'],
    oot_1_BV_to_AT_22X0_11B_id:['29.Step3:*1” B/V to AT-22X0-11B.'],
    oot_34_BV_to_AP_22X0_11A_id:['29.Step4:*3/4” B/V to AP-22X0-11A.'],
    oot_34_BV_to_AP_22X0_11B_id:['29.Step5:*3/4” B/V to AP-22X0-11B.'],
    iot_ignitors_and_flame_scanners_id:['30.Has IOT ensured that ignitors and flame scanners are energized. Check for the “HEALTHY” indication on the HMI '],
    blow_down_HXS_header_id:['31.Drain any condensate from the furnace HXS header as per the procedure 202-06-R-01 Furnace F-22_0, Blow down HXS header.'],
    oot_10_block_valves_id:['32.Step1:*Both 10” block valves.'],
    oot_8_NRV_valve_id:['32.Step2:*8” NRV valve.'],
    iot_SD_level_id:['33.IOT to ensure that steam drum level is between 42%-60%.'],
    oot_bleed_to_flare_id:['34.OOT to double check that ethane feed DB & B (bleed to flare) is closed.'],


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
    oot_LS_Steam_condensate:[null,Validators.required],
    oot_S_TLE:[null,Validators.required],
    oot_T_TLE:[null,Validators.required],
    oot_CG_MOVs_intermediate:[null,Validators.required],
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
    oot_LS_Steam_condensate_comment:[null],
    oot_S_TLE_comment:[null],
    oot_T_TLE_comment:[null],
    oot_CG_MOVs_intermediate_comment:[null],
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
patchvalue(){
  console.log('patchvalue() called');
  this.ChecklistB.patchValue({
    oot_bearings_oil_levels_comment:this.concatenateValues(this.ChecklistB.get('oot_bearings_oil_levels_id')?.value,this.ChecklistB.get('oot_bearings_oil_levels_comment')?.value ),
    iot_Overview_HMI_comment:this.concatenateValues(this.ChecklistB.get('iot_Overview_HMI_id')?.value,this.ChecklistB.get('iot_Overview_HMI_comment')?.value ),
    ups_system_comment:this.concatenateValues(this.ChecklistB.get('ups_systeme_id')?.value,this.ChecklistB.get('ups_system_comment')?.value ),
    oot_caged_doors_open_comment:this.concatenateValues(this.ChecklistB.get('oot_caged_doors_open_id')?.value,this.ChecklistB.get('oot_caged_doors_open_comment')?.value ),
    oot_peep_doors_closed_comment:this.concatenateValues(this.ChecklistB.get('oot_peep_doors_closed_id')?.value,this.ChecklistB.get('oot_peep_doors_closed_comment')?.value ),
    oot_local_start_stop_comment:this.concatenateValues(this.ChecklistB.get('oot_local_start_stop_id')?.value,this.ChecklistB.get('oot_local_start_stop_comment')?.value ),
    oot_ID_fan_casing_comment:this.concatenateValues(this.ChecklistB.get('oot_ID_fan_casing_id')?.value,this.ChecklistB.get('oot_ID_fan_casing_comment')?.value ),
    oot_FD_suction_comment:this.concatenateValues(this.ChecklistB.get('oot_FD_suction_id')?.value,this.ChecklistB.get('oot_FD_suction_comment')?.value ),
    oot_Floor_burners_comment:this.concatenateValues(this.ChecklistB.get('oot_Floor_burners_id')?.value,this.ChecklistB.get('oot_Floor_burners_comment')?.value ),
    oot_Wall_burners_comment :this.concatenateValues(this.ChecklistB.get('oot_Wall_burners_id')?.value,this.ChecklistB.get('oot_Wall_burners_comment')?.value ),
    iot_start_ID_fan_comment:this.concatenateValues(this.ChecklistB.get('iot_start_ID_fan_id')?.value,this.ChecklistB.get('iot_start_ID_fan_comment')?.value ),
    iot_ID_fan_running_comment:this.concatenateValues(this.ChecklistB.get('iot_ID_fan_running_id')?.value,this.ChecklistB.get('iot_ID_fan_running_comment')?.value ),
    iot_FD_fan_motor_readings_comment:this.concatenateValues(this.ChecklistB.get('iot_FD_fan_motor_readings_id')?.value,this.ChecklistB.get('iot_FD_fan_motor_readings_comment')?.value ),
    oot_ID_fan_abnormality_comment:this.concatenateValues(this.ChecklistB.get('oot_ID_fan_abnormality_id')?.value,this.ChecklistB.get('oot_ID_fan_abnormality_comment')?.value ),
    oot_four_air_duct_comment:this.concatenateValues(this.ChecklistB.get('oot_four_air_duct_id')?.value,this.ChecklistB.get('oot_four_air_duct_comment')?.value ),
    iot_start_FD_comment:this.concatenateValues(this.ChecklistB.get('iot_start_FD_id')?.value,this.ChecklistB.get('iot_start_FD_comment')?.value ),
    iot_FD_fan_running_comment:this.concatenateValues(this.ChecklistB.get('iot_FD_fan_running_id')?.value,this.ChecklistB.get('iot_FD_fan_running_comment')?.value ),
    iot_FC_signal_comment:this.concatenateValues(this.ChecklistB.get('iot_FC_signal_id')?.value,this.ChecklistB.get('iot_FC_signal_comment')?.value ),
    iot_close_the_doors_comment:this.concatenateValues(this.ChecklistB.get('iot_close_the_doors_id')?.value,this.ChecklistB.get('iot_close_the_doors_comment')?.value ),
    iot_FC_back_in_auto_comment:this.concatenateValues(this.ChecklistB.get('iot_FC_back_in_auto_id')?.value,this.ChecklistB.get('iot_FC_back_in_auto_comment')?.value ),
    iot_fan_motor_readings_comment:this.concatenateValues(this.ChecklistB.get('iot_fan_motor_readings_id')?.value,this.ChecklistB.get('iot_fan_motor_readings_comment')?.value ),
    oot_FD_shaft_speed_comment:this.concatenateValues(this.ChecklistB.get('oot_FD_shaft_speed_id')?.value,this.ChecklistB.get('oot_FD_shaft_speed_comment')?.value ),
    oot_FD_fan_abnormality_comment:this.concatenateValues(this.ChecklistB.get('oot_FD_fan_abnormality_id')?.value,this.ChecklistB.get('oot_FD_fan_abnormality_comment')?.value ),
    oot_LS_Steam_condensate_comment:this.concatenateValues(this.ChecklistB.get('oot_LS_Steam_condensate_id')?.value,this.ChecklistB.get('oot_LS_Steam_condensate_comment')?.value ),
    oot_S_TLE_comment:this.concatenateValues(this.ChecklistB.get('oot_S_TLE_id')?.value,this.ChecklistB.get('oot_S_TLE_comment')?.value ),
    oot_T_TLE_comment:this.concatenateValues(this.ChecklistB.get('oot_T_TLE_id')?.value,this.ChecklistB.get('oot_T_TLE_comment')?.value ),
    oot_CG_MOVs_intermediate_comment:this.concatenateValues(this.ChecklistB.get('oot_CG_MOVs_intermediate_id')?.value,this.ChecklistB.get('oot_CG_MOVs_intermediate_comment')?.value ),
    oot_CG_HV_22X6_13A_comment:this.concatenateValues(this.ChecklistB.get('oot_CG_HV_22X6_13A_id')?.value,this.ChecklistB.get('oot_CG_HV_22X6_13A_comment')?.value ),
    oot_Decoke_MOV_comment:this.concatenateValues(this.ChecklistB.get('oot_Decoke_MOV_id')?.value,this.ChecklistB.get('oot_Decoke_MOV_comment')?.value ),
    oot_Double_Block_comment:this.concatenateValues(this.ChecklistB.get('oot_Double_Block_id')?.value,this.ChecklistB.get('oot_Double_Block_comment')?.value ),
    oot_LS_purge_lined_up_comment:this.concatenateValues(this.ChecklistB.get('oot_LS_purge_lined_up_id')?.value,this.ChecklistB.get('oot_LS_purge_lined_up_comment')?.value ),
    ms_Steam_comment:this.concatenateValues(this.ChecklistB.get('ms_Steam_id')?.value,this.ChecklistB.get('ms_Steam_comment')?.value ),
    fgs_ready_comment:this.concatenateValues(this.ChecklistB.get('fgs_ready_id')?.value,this.ChecklistB.get('fgs_ready_comment')?.value ),
    oot_burners_manual_BV_comment:this.concatenateValues(this.ChecklistB.get('oot_burners_manual_BV_id')?.value,this.ChecklistB.get('oot_burners_manual_BV_comment')?.value ),
    oot_ignitor_and_flame_scanner_comment:this.concatenateValues(this.ChecklistB.get('oot_ignitor_and_flame_scanner_id')?.value,this.ChecklistB.get('oot_ignitor_and_flame_scanner_comment')?.value ),
    oot_fourth_platform_level_comment:this.concatenateValues(this.ChecklistB.get('oot_fourth_platform_level_id')?.value,this.ChecklistB.get('oot_fourth_platform_level_comment')?.value ),
    oot_1_BV_to_AT_22X0_11A_comment:this.concatenateValues(this.ChecklistB.get('oot_1_BV_to_AT_22X0_11A_id')?.value,this.ChecklistB.get('oot_1_BV_to_AT_22X0_11A_comment')?.value ),
    oot_1_BV_to_AT_22X0_11B_comment:this.concatenateValues(this.ChecklistB.get('oot_1_BV_to_AT_22X0_11B_id')?.value,this.ChecklistB.get('oot_1_BV_to_AT_22X0_11B_comment')?.value ),
    oot_34_BV_to_AP_22X0_11A_comment:this.concatenateValues(this.ChecklistB.get('oot_34_BV_to_AP_22X0_11A_id')?.value,this.ChecklistB.get('oot_34_BV_to_AP_22X0_11A_comment')?.value ),
    oot_34_BV_to_AP_22X0_11B_comment:this.concatenateValues(this.ChecklistB.get('oot_34_BV_to_AP_22X0_11B_id')?.value,this.ChecklistB.get('oot_34_BV_to_AP_22X0_11B_comment')?.value ),
    iot_ignitors_and_flame_scanners_comment:this.concatenateValues(this.ChecklistB.get('iot_ignitors_and_flame_scanners_id')?.value,this.ChecklistB.get('iot_ignitors_and_flame_scanners_comment')?.value ),
    blow_down_HXS_header_comment:this.concatenateValues(this.ChecklistB.get('blow_down_HXS_header_id')?.value,this.ChecklistB.get('blow_down_HXS_header_comment')?.value ),
    oot_10_block_valves_comment:this.concatenateValues(this.ChecklistB.get('oot_10_block_valves_id')?.value,this.ChecklistB.get('oot_10_block_valves_comment')?.value ),
    oot_8_NRV_valve_comment:this.concatenateValues(this.ChecklistB.get('oot_8_NRV_valve_id')?.value,this.ChecklistB.get('oot_8_NRV_valve_comment')?.value ),
    iot_SD_level_comment:this.concatenateValues(this.ChecklistB.get('iot_SD_level_id')?.value,this.ChecklistB.get('iot_SD_level_comment')?.value ),
    oot_bleed_to_flare_comment:this.concatenateValues(this.ChecklistB.get('oot_bleed_to_flare_id')?.value,this.ChecklistB.get('oot_bleed_to_flare_comment')?.value ),

  })
  console.log( this.ChecklistB);
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


setupSubmitInterval() {
  this.onSubmitInterval = setInterval(() => {
    console.log('onSubmitInterval: ', this.onSubmitInterval);
    this.add();
  }, 5 * 1000); // 2 minutes in milliseconds
}

onSubmit()
  {
    
    const formData = this.ChecklistB.value;
    this.apiService.savecheckBpage(formData).subscribe(
      (response) => {
        this.id=response.result.id;
        console.log('Data saved successfully:', response);
        // this.toast.open('Data saved successfully', 'Close', { duration: 3000 });

        // this.router.navigate(['/blank']);
      },
      (error) => {

        console.error('Error saving data:', error);
        // this.toast.open('Error saving data', 'Close', { duration: 3000 });
      }
    );

}


nxtAccEn(){
  this.checklistcformenable=false;
  this.expand = false;
    this.open1 =true
}


add() {
  this.apiService.getchecklistB().subscribe((response: any) => {
    if (response ) { // Check if response and response.result are not null or undefined
      
      this.remainingValues = response.result;
     
console.log("mm");    

 this.formdisable = response.result.status === "Complete" ? true : false;
   


      Object.keys(this.remainingValues).forEach(key => {
        if (key !== 'shift_comment_b_oot' && key !== 'shift_comment_b_iot') {
          
          
          this.ChecklistB.get(key)?.patchValue(this.remainingValues[key]);
        }
   
      });
    } else {
      console.log("Response or response.result is null or undefined.");
      // Handle the error or notify the user accordingly
    }
        this.ChecklistB.get('ups_system_comment')?.setValue(this.ChecklistB.get('ups_system_comment')?.value ? this.ChecklistB.get('ups_system_comment')?.value.split("||")[1].trim() : null);
        this.ChecklistB.get('iot_Overview_HMI_comment')?.setValue(this.ChecklistB.get('iot_Overview_HMI_comment')?.value ? this.ChecklistB.get('iot_Overview_HMI_comment')?.value.split("||")[1].trim() : null);
        this.ChecklistB.get('oot_bearings_oil_levels_comment')?.setValue(this.ChecklistB.get('oot_bearings_oil_levels_comment')?.value ? this.ChecklistB.get('oot_bearings_oil_levels_comment')?.value.split("||")[1].trim() : null);
        this.ChecklistB.get('oot_caged_doors_open_comment')?.setValue(this.ChecklistB.get('oot_caged_doors_open_comment')?.value ? this.ChecklistB.get('oot_caged_doors_open_comment')?.value.split("||")[1].trim() : null);
        this.ChecklistB.get('oot_peep_doors_closed_comment')?.setValue(this.ChecklistB.get('oot_peep_doors_closed_comment')?.value ? this.ChecklistB.get('oot_peep_doors_closed_comment')?.value.split("||")[1].trim() : null);
        this.ChecklistB.get('oot_local_start_stop_comment')?.setValue(this.ChecklistB.get('oot_local_start_stop_comment')?.value ? this.ChecklistB.get('oot_local_start_stop_comment')?.value.split("||")[1].trim() : null);
        this.ChecklistB.get('oot_ID_fan_casing_comment')?.setValue(this.ChecklistB.get('oot_ID_fan_casing_comment')?.value ? this.ChecklistB.get('oot_ID_fan_casing_comment')?.value.split("||")[1].trim() : null);
        this.ChecklistB.get('oot_FD_suction_comment')?.setValue(this.ChecklistB.get('oot_FD_suction_comment')?.value ? this.ChecklistB.get('oot_FD_suction_comment')?.value.split("||")[1].trim() : null);
        this.ChecklistB.get('oot_Floor_burners_comment')?.setValue(this.ChecklistB.get('oot_Floor_burners_comment')?.value ? this.ChecklistB.get('oot_Floor_burners_comment')?.value.split("||")[1].trim() : null);
        this.ChecklistB.get('oot_Wall_burners_comment')?.setValue(this.ChecklistB.get('oot_Wall_burners_comment')?.value ? this.ChecklistB.get('oot_Wall_burners_comment')?.value.split("||")[1].trim() : null);
        this.ChecklistB.get('iot_start_ID_fan_comment')?.setValue(this.ChecklistB.get('iot_start_ID_fan_comment')?.value ? this.ChecklistB.get('iot_start_ID_fan_comment')?.value.split("||")[1].trim() : null);
        this.ChecklistB.get('iot_ID_fan_running_comment')?.setValue(this.ChecklistB.get('iot_ID_fan_running_comment')?.value ? this.ChecklistB.get('iot_ID_fan_running_comment')?.value.split("||")[1].trim() : null);
        this.ChecklistB.get('iot_FD_fan_motor_readings_comment')?.setValue(this.ChecklistB.get('iot_FD_fan_motor_readings_comment')?.value ? this.ChecklistB.get('iot_FD_fan_motor_readings_comment')?.value.split("||")[1].trim() : null);
        this.ChecklistB.get('oot_ID_fan_abnormality_comment')?.setValue(this.ChecklistB.get('oot_ID_fan_abnormality_comment')?.value ? this.ChecklistB.get('oot_ID_fan_abnormality_comment')?.value.split("||")[1].trim() : null);
        this.ChecklistB.get('oot_four_air_duct_comment')?.setValue(this.ChecklistB.get('oot_four_air_duct_comment')?.value ? this.ChecklistB.get('oot_four_air_duct_comment')?.value.split("||")[1].trim() : null);
        this.ChecklistB.get('iot_start_FD_comment')?.setValue(this.ChecklistB.get('iot_start_FD_comment')?.value ? this.ChecklistB.get('iot_start_FD_comment')?.value.split("||")[1].trim() : null);
        this.ChecklistB.get('iot_FD_fan_running_comment')?.setValue(this.ChecklistB.get('iot_FD_fan_running_comment')?.value ? this.ChecklistB.get('iot_FD_fan_running_comment')?.value.split("||")[1].trim() : null);
        this.ChecklistB.get('iot_FC_signal_comment')?.setValue(this.ChecklistB.get('iot_FC_signal_comment')?.value ? this.ChecklistB.get('iot_FC_signal_comment')?.value.split("||")[1].trim() : null);
        this.ChecklistB.get('iot_close_the_doors_comment')?.setValue(this.ChecklistB.get('iot_close_the_doors_comment')?.value ? this.ChecklistB.get('iot_close_the_doors_comment')?.value.split("||")[1].trim() : null);
        this.ChecklistB.get('iot_FC_back_in_auto_comment')?.setValue(this.ChecklistB.get('iot_FC_back_in_auto_comment')?.value ? this.ChecklistB.get('iot_FC_back_in_auto_comment')?.value.split("||")[1].trim() : null);
        this.ChecklistB.get('iot_fan_motor_readings_comment')?.setValue(this.ChecklistB.get('iot_fan_motor_readings_comment')?.value ? this.ChecklistB.get('iot_fan_motor_readings_comment')?.value.split("||")[1].trim() : null);
        this.ChecklistB.get('oot_FD_shaft_speed_comment')?.setValue(this.ChecklistB.get('oot_FD_shaft_speed_comment')?.value ? this.ChecklistB.get('oot_FD_shaft_speed_comment')?.value.split("||")[1].trim() : null);
        this.ChecklistB.get('oot_FD_fan_abnormality_comment')?.setValue(this.ChecklistB.get('oot_FD_fan_abnormality_comment')?.value ? this.ChecklistB.get('oot_FD_fan_abnormality_comment')?.value.split("||")[1].trim() : null);
        this.ChecklistB.get('oot_LS_Steam_condensate_comment')?.setValue(this.ChecklistB.get('oot_LS_Steam_condensate_comment')?.value ? this.ChecklistB.get('oot_LS_Steam_condensate_comment')?.value.split("||")[1].trim() : null);
        this.ChecklistB.get('oot_S_TLE_comment')?.setValue(this.ChecklistB.get('oot_S_TLE_comment')?.value ? this.ChecklistB.get('oot_S_TLE_comment')?.value.split("||")[1].trim() : null);
        this.ChecklistB.get('oot_T_TLE_comment')?.setValue(this.ChecklistB.get('oot_T_TLE_comment')?.value ? this.ChecklistB.get('oot_T_TLE_comment')?.value.split("||")[1].trim() : null);
        this.ChecklistB.get('oot_CG_MOVs_intermediate_comment')?.setValue(this.ChecklistB.get('oot_CG_MOVs_intermediate_comment')?.value ? this.ChecklistB.get('oot_CG_MOVs_intermediate_comment')?.value.split("||")[1].trim() : null);
        this.ChecklistB.get('oot_CG_HV_22X6_13A_comment')?.setValue(this.ChecklistB.get('oot_CG_HV_22X6_13A_comment')?.value ? this.ChecklistB.get('oot_CG_HV_22X6_13A_comment')?.value.split("||")[1].trim() : null);
        this.ChecklistB.get('oot_Decoke_MOV_comment')?.setValue(this.ChecklistB.get('oot_Decoke_MOV_comment')?.value ? this.ChecklistB.get('oot_Decoke_MOV_comment')?.value.split("||")[1].trim() : null);
        this.ChecklistB.get('oot_Double_Block_comment')?.setValue(this.ChecklistB.get('oot_Double_Block_comment')?.value ? this.ChecklistB.get('oot_Double_Block_comment')?.value.split("||")[1].trim() : null);
        this.ChecklistB.get('oot_LS_purge_lined_up_comment')?.setValue(this.ChecklistB.get('oot_LS_purge_lined_up_comment')?.value ? this.ChecklistB.get('oot_LS_purge_lined_up_comment')?.value.split("||")[1].trim() : null);
        this.ChecklistB.get('ms_Steam_comment')?.setValue(this.ChecklistB.get('ms_Steam_comment')?.value ? this.ChecklistB.get('ms_Steam_comment')?.value.split("||")[1].trim() : null);
        this.ChecklistB.get('fgs_ready_comment')?.setValue(this.ChecklistB.get('fgs_ready_comment')?.value ? this.ChecklistB.get('fgs_ready_comment')?.value.split("||")[1].trim() : null);
        this.ChecklistB.get('oot_burners_manual_BV_comment')?.setValue(this.ChecklistB.get('oot_burners_manual_BV_comment')?.value ? this.ChecklistB.get('oot_burners_manual_BV_comment')?.value.split("||")[1].trim() : null);
        this.ChecklistB.get('oot_ignitor_and_flame_scanner_comment')?.setValue(this.ChecklistB.get('oot_ignitor_and_flame_scanner_comment')?.value ? this.ChecklistB.get('oot_ignitor_and_flame_scanner_comment')?.value.split("||")[1].trim() : null);
        this.ChecklistB.get('oot_1_BV_to_AT_22X0_11A_comment')?.setValue(this.ChecklistB.get('oot_fourth_platform_level_comment')?.value ? this.ChecklistB.get('oot_fourth_platform_level_comment')?.value.split("||")[1].trim() : null);
        this.ChecklistB.get('oot_1_BV_to_AT_22X0_11B_comment')?.setValue(this.ChecklistB.get('oot_1_BV_to_AT_22X0_11A_comment')?.value ? this.ChecklistB.get('oot_1_BV_to_AT_22X0_11A_comment')?.value.split("||")[1].trim() : null);
        this.ChecklistB.get('oot_LS_purge_lined_up_comment')?.setValue(this.ChecklistB.get('oot_1_BV_to_AT_22X0_11B_comment')?.value ? this.ChecklistB.get('oot_1_BV_to_AT_22X0_11B_comment')?.value.split("||")[1].trim() : null);
        this.ChecklistB.get('oot_34_BV_to_AP_22X0_11A_comment')?.setValue(this.ChecklistB.get('oot_34_BV_to_AP_22X0_11A_comment')?.value ? this.ChecklistB.get('oot_34_BV_to_AP_22X0_11A_comment')?.value.split("||")[1].trim() : null);
        this.ChecklistB.get('oot_34_BV_to_AP_22X0_11B_comment')?.setValue(this.ChecklistB.get('oot_34_BV_to_AP_22X0_11B_comment')?.value ? this.ChecklistB.get('oot_34_BV_to_AP_22X0_11B_comment')?.value.split("||")[1].trim() : null);
        this.ChecklistB.get('iot_ignitors_and_flame_scanners_comment')?.setValue(this.ChecklistB.get('iot_ignitors_and_flame_scanners_comment')?.value ? this.ChecklistB.get('iot_ignitors_and_flame_scanners_comment')?.value.split("||")[1].trim() : null);
        this.ChecklistB.get('blow_down_HXS_header_comment')?.setValue(this.ChecklistB.get('blow_down_HXS_header_comment')?.value ? this.ChecklistB.get('blow_down_HXS_header_comment')?.value.split("||")[1].trim() : null);
        this.ChecklistB.get('oot_10_block_valves_comment')?.setValue(this.ChecklistB.get('oot_10_block_valves_comment')?.value ? this.ChecklistB.get('oot_10_block_valves_comment')?.value.split("||")[1].trim() : null);
        this.ChecklistB.get('oot_8_NRV_valve_comment')?.setValue(this.ChecklistB.get('oot_8_NRV_valve_comment')?.value ? this.ChecklistB.get('oot_8_NRV_valve_comment')?.value.split("||")[1].trim() : null);
        this.ChecklistB.get('iot_SD_level_comment')?.setValue(this.ChecklistB.get('iot_SD_level_comment')?.value ? this.ChecklistB.get('iot_SD_level_comment')?.value.split("||")[1].trim() : null);
        this.ChecklistB.get('oot_bleed_to_flare_comment')?.setValue(this.ChecklistB.get('oot_bleed_to_flare_comment')?.value ? this.ChecklistB.get('oot_bleed_to_flare_comment')?.value.split("||")[1].trim() : null);





        
        if (response && response.result) {
      this.skipcolor = response.result;
      
   
    
      Object.entries(this.skipcolor).forEach(([key, value]) => {
        if (value === 'accept'|| value==='reject') {
          this.statusvalue = { [key]: value };
          console.log('this.statusvalue: ', this.statusvalue);

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
  // this.ChecklistB.get('shift_comment_b_oot')?.setValue(this.remainingValues.shift_comment_b_oot);
  //   this.ChecklistB.get('shift_comment_b_iot')?.setValue(this.remainingValues.shift_comment_b_iot);
  // this.ChecklistB.setValue(this.statusvalue);
const formData = this.ChecklistB.value;

console.log('formData: ', formData);


this.apiService.updatePermitData(formData).subscribe(
  (response) => {
    // Assuming 'permitForm' is a FormGroup
    this.ChecklistB.get('shift_comment_b_oot')?.setValue(null);
    this.ChecklistB.get('shift_comment_b_iot')?.setValue(null);

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
clearTextarea(){
  this.ChecklistB.get('shift_comment_b_oot')?.setValue(null);
  this.ChecklistB.get('shift_comment_b_iot')?.setValue(null);
}
}

