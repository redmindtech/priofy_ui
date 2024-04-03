import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChecklistDService } from '@app/utils/service/checklist-d.service';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-checklist-d',
  templateUrl: './checklist-d.component.html',
  styleUrls: ['./checklist-d.component.css']
})
export class ChecklistDComponent implements OnInit {
  @Input() checklistdformenable: boolean;
  checklisteformenable: boolean = true;
  ChecklistD:FormGroup
  userDetails: any;
  userObject: any;
  position: any;
  disableiot: any;
  disableoot: any;
  private onSubmitInterval: any;
  private addSubscription: Subscription | undefined;
  constructor(private fb: FormBuilder,
    private apiService:ChecklistDService,
    private router: Router,
    private toast: MatSnackBar,
    ){}

    ngOnInit(): void {
      this.userDetails = localStorage.getItem('currentUser');
    this.userObject = JSON.parse(this.userDetails);
    this.position = this.userObject.position;
    if (this.position === 'iot') {
      this.disableiot = true;
      this.disableoot = false;
    } else if (this.position === 'oot') {
      this.disableiot = false;
      this.disableoot = true;
    }
    this.formInitialization();
  }
  ngOnDestroy(): void {
    clearInterval(this.onSubmitInterval);
    if (this.addSubscription) {
      this.addSubscription.unsubscribe();
    }
  }
  formInitialization(){
    this.ChecklistD = this.fb.group({
        id:[],
        userid:[],
        master_id:[],
        burners_20_:[null,Validators.required],
        IOT_arch_temperature:[null,Validators.required],
        OOT_air_ONIS_blind:[null,Validators.required],
        OOT_to_open_4:[null,Validators.required],
        IOT_start_decoke:[null,Validators.required],
        OOT_fuel_gas:[null,Validators.required],
        OOT_burner_light_off:[null,Validators.required],
        OOT_add_burners:[null,Validators.required],
        air_registers_3_notches:[null,Validators.required],
        burners_20:[null,Validators.required],
        IOT_to_request_OOT:[null,Validators.required],
        IOT_COTs_rising:[null,Validators.required],
        IOT_Venturi_Ratios:[null,Validators.required],
        IOT_suspect_coils:[null,Validators.required],
        OOT_Start_warm_MS_steam:[null,Validators.required],
        OOT_spool_piece:[null,Validators.required],
        OOT_open_MS_EBV:[null,Validators.required],
        OOT_topen_MS_steam_8:[null,Validators.required],
        IOT_both_steam:[null,Validators.required],
        OOT_steam_lines_up:[null,Validators.required],
        OOT_Dilution_Steam:[null,Validators.required],
        OOT_open_2inch_steam:[null,Validators.required],
        OOT_to_open_3by4inch:[null,Validators.required],
        oot_open_3by4_ethane:[null,Validators.required],
        oot_crack_open_10inch_BbyV:[null,Validators.required],
        Open_the_upstream_and_downstream:[null,Validators.required],
        Phosphate_and_Morpholine:[null,Validators.required],
        Before_starting:[null,Validators.required],
        IOT_reduce_draf:[null,Validators.required],
        IOT_visually_check_the_firebox:[null,Validators.required],
        iot_HTC1_outside_temperature:[null,Validators.required],
        oot_DS_and_steam_to_FPH:[null,Validators.required],
        IOTchecking_that_all_COTs:[null,Validators.required],
        iot_hecking_tha_all_venture_ratios:[null,Validators.required],
        IOT_to_clear_pluggage:[null,Validators.required],
        OOTSecondary_TLE:[null,Validators.required],
        OOT_Tertiary_TLE:[null,Validators.required],
        OOT_PT_between_both_CG_MOVs:[null,Validators.required],
        oot_CG_Decoke_MOV:[null,Validators.required],
        iot_SHP_steam_flow:[null,Validators.required],
        IOT_monitor_fuel_gas:[null,Validators.required],
        oot_monitor_the_firebox:[null,Validators.required],
        the_steam_flow_greater10:[null,Validators.required],
        OOT_close_decoke_air:[null,Validators.required],
        OOT_to_close_4inch_decoke:[null,Validators.required],
        IOT_disable_Decoke_Air_controllers:[null,Validators.required],
        HV_22X0_07_is_closed:[null,Validators.required],
        OOT_to_fully_open_downstream:[null,Validators.required],
        IOT_to_confirm_ethane_feed:[null,Validators.required],
        OOT_to_line_up_steam_drum:[null,Validators.required],
        adjust_the_steam_drum_blow_down:[null,Validators.required],
        Furnace_sequence_auto_move_to_Warm_up:[null,Validators.required],
        Warm_Up_arch_table_1_id:[]


    })
    }
    setupSubmitInterval() {
      this.onSubmitInterval = setInterval(() => {
        console.log('onSubmitInterval: ', this.onSubmitInterval);
        this.add();
      }, 15* 1000); // 2 minutes in milliseconds
    }
 onSubmit()
  {
   
      const formData = this.ChecklistD.value;
      this.apiService.savecheckdpage(formData).subscribe(
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
  nxtAccEn(){
    this.checklistdformenable=true;
  }
  add() {
    this.apiService.getchecklistD().subscribe((response: any) => {
      console.log(response, 'checking');
      this.ChecklistD.patchValue(response.result);
    });
  }
}
