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
        userid:[1],
        master_id:[1],
        // burners_20_:[null,Validators.required],
        iot_arch_temperature:[null,Validators.required],
        OOT_air_ONIS_blind:[null,Validators.required],
        oot_to_open4:[null,Validators.required],
        iot_start_decoke:[null,Validators.required],
        oot_fuel_gas:[null,Validators.required],
        oot_burner_light_off:[null,Validators.required],
        oot_add_burners:[null,Validators.required],
        air_registers_3Notches:[null,Validators.required],
        burners_20:[null,Validators.required],
        iot_to_request_OOT:[null,Validators.required],
        iot_COTs_rising:[null,Validators.required],
        iot_venturi_Ratios:[null,Validators.required],
        iot_suspect_coils:[null,Validators.required],
        oot_Start_warm_MS_steam:[null,Validators.required],
        oot_spool_piece:[null,Validators.required],
        oot_open_MS_EBV:[null,Validators.required],
        oot_topen_MS_steam8:[null,Validators.required],
        iot_both_steam:[null,Validators.required],
        oot_steam_lines_up:[null,Validators.required],
        oot_dilution_steam:[null,Validators.required],
        oot_open2_steam:[null,Validators.required],
        oot_to_open3_4:[null,Validators.required],
        oot_open_3_4_ethane:[null,Validators.required],
        oot_crack_open_10_b_v:[null,Validators.required],
        open_the_upstream_and_downstream:[null,Validators.required],
        Phosphate_and_Morpholine:[null,Validators.required],
        before_starting:[null,Validators.required],
        iot_reduce_draf:[null,Validators.required],
        iot_visually_check_the_firebox:[null,Validators.required],
        iot_htc_1_outside_temperature:[null,Validators.required],
        oot_ds_and_steam_to_fph:[null,Validators.required],
        iot_checking_that_all_COTs:[null,Validators.required],
        iot_checking_that_all_venture_ratios:[null,Validators.required],
        iot_to_clear_pluggage:[null,Validators.required],
        ootsecondary_tle:[null,Validators.required],
        oottertiary_tle:[null,Validators.required],
        oot_pt_between_both_CG_movs:[null,Validators.required],
        oot_CG_Decoke_MOV:[null,Validators.required],
        iot_shp_steamflow_i:[null,Validators.required],
        iot_monitor_fuelgas:[null,Validators.required],
        oot_monitor_the_firebox:[null,Validators.required],
        thesteamflow_is_greaterthan_10:[null,Validators.required],
        oot_close_decoke_air:[null,Validators.required],
        oot_to_close_4decoke:[null,Validators.required],
        iot_disable_decokeair_controller:[null,Validators.required],
        hv_22x0_07_isclosed:[null,Validators.required],
        oot_to_fully_open_downstream:[null,Validators.required],
        iot_to_confirm_ethane_feed:[null,Validators.required],
        oot_to_lineup_steamdrum:[null,Validators.required],
        adjust_the_steam_drum_blowdown:[null,Validators.required],
        furnace_sequence_automove_to_warmup:[null,Validators.required],
        // Warm_Up_arch_table_1_id:[]


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
    this.apiService.getchecklistD().subscribe((response: any) => {
      console.log(response, 'checking');
      this.ChecklistD.patchValue(response.result);
    });
  }
}
