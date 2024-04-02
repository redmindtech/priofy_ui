import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChecklistDService } from '@app/utils/service/checklist-d.service';



@Component({
  selector: 'app-checklist-d',
  templateUrl: './checklist-d.component.html',
  styleUrls: ['./checklist-d.component.css']
})
export class ChecklistDComponent implements OnInit {
  @Input() checklistdformenable: boolean;
  checklisteformenable: boolean = true;
  FirstForm:FormGroup
  userDetails: any;
  userObject: any;
  position: any;
  disableiot: any;
  disableoot: any;
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
      this.FirstForm = this.fb.group({
        id:[],
        userid:[],
        master_id:[],
        burners_20_:[false],
        IOT_arch_temperature:[false],
        OOT_air_ONIS_blind:[false],
        OOT_to_open_4:[false],
        IOT_start_decoke:[false],
        OOT_fuel_gas:[false],
        OOT_burner_light_off:[false],
        OOT_add_burners:[false],
        air_registers_3_notches:[false],
        burners_20:[false],
        IOT_to_request_OOT:[false],
        IOT_COTs_rising:[false],
        IOT_Venturi_Ratios:[false],
        IOT_suspect_coils:[false],
        OOT_Start_warm_MS_steam:[false],
        OOT_spool_piece:[false],
        OOT_open_MS_EBV:[false],
        OOT_topen_MS_steam_8:[false],
        IOT_both_steam:[false],
        OOT_steam_lines_up:[false],
        OOT_Dilution_Steam:[false],
        OOT_open_2inch_steam:[false],
        OOT_to_open_3by4inch:[false],
        oot_open_3by4_ethane:[false],
        oot_crack_open_10inch_BbyV:[false],
        Open_the_upstream_and_downstream:[false],
        Phosphate_and_Morpholine:[false],
        Before_starting:[false],
        IOT_reduce_draf:[false],
        IOT_visually_check_the_firebox:[false],
        iot_HTC1_outside_temperature:[false],
        oot_DS_and_steam_to_FPH:[false],
        IOTchecking_that_all_COTs:[false],
        iot_hecking_tha_all_venture_ratios:[false],
        IOT_to_clear_pluggage:[false],
        OOTSecondary_TLE:[false],
        OOT_Tertiary_TLE:[false],
        OOT_PT_between_both_CG_MOVs:[false],
        oot_CG_Decoke_MOV:[false],
        iot_SHP_steam_flow:[false],
        IOT_monitor_fuel_gas:[false],
        oot_monitor_the_firebox:[false],
        the_steam_flow_greater10:[false],
        OOT_close_decoke_air:[false],
        OOT_to_close_4inch_decoke:[false],
        IOT_disable_Decoke_Air_controllers:[false],
        HV_22X0_07_is_closed:[false],
        OOT_to_fully_open_downstream:[false],
        IOT_to_confirm_ethane_feed:[false],
        OOT_to_line_up_steam_drum:[false],
        adjust_the_steam_drum_blow_down:[false],
        Furnace_sequence_auto_move_to_Warm_up:[false],
        Warm_Up_arch_table_1_id:[]
  
  
    })
  
    }
  submit()
  {
    if (this.FirstForm.valid) {
      const formData = this.FirstForm.value;
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
  }
  nxtAccEn(){
    this.checklistdformenable=true;
  }
}
