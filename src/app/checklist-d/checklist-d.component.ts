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
  currentUser: any;
  enable: boolean = false;
  aceptreject:string = 'null'; 
  id:any;

  remainingValues: any;
  constructor(private fb: FormBuilder,
    private apiService:ChecklistDService,
    private router: Router,
    private toast: MatSnackBar,
    ){}

    ngOnInit(): void {
    //   this.userDetails = localStorage.getItem('currentUser');
    //   this.currentUser = storedUser ? JSON.parse(storedUser) : null;
    // this.userObject = JSON.parse(this.userDetails);
    // this.position = this.userObject.position;
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
  this.setupSubmitInterval()
  }
  ngOnDestroy(): void {
    clearInterval(this.onSubmitInterval);
    if (this.addSubscription) {
      this.addSubscription.unsubscribe();
    }
  }
  formInitialization(){
    
    this.ChecklistD = this.fb.group({
      id:[this.id],
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

        iot_arch_temperature_comment:[null],
        OOT_air_ONIS_blind_comment:[null],
        oot_to_open4_comment:[null],
        iot_start_decoke_comment:[null],
        oot_fuel_gas_comment:[null],
        oot_burner_light_off_comment:[null],
        oot_add_burners_comment:[null],
        air_registers_3Notches_comment:[null],
        burners_20_comment:[null],
        iot_to_request_OOT_comment:[null],
        iot_COTs_rising_comment:[null],
        iot_venturi_Ratios_comment:[null],
        iot_suspect_coils_comment:[null],
        oot_Start_warm_MS_steam_comment:[null],
        oot_spool_piece_comment:[null],
        oot_open_MS_EBV_comment:[null],
        oot_topen_MS_steam8_comment:[null],
        iot_both_steam_comment:[null],
        oot_steam_lines_up_comment:[null],
        oot_dilution_steam_comment:[null],
        oot_open2_steam_comment:[null],
        oot_to_open3_4_comment:[null],
        oot_open_3_4_ethane_comment:[null],
        oot_crack_open_10_b_v_comment:[null],
        open_the_upstream_and_downstream_comment:[null],
        Phosphate_and_Morpholine_comment:[null],
        before_starting_comment:[null],
        iot_reduce_draf_comment:[null],
        iot_visually_check_the_firebox_comment:[null],
        iot_htc_1_outside_temperature_comment:[null],
        oot_ds_and_steam_to_fph_comment:[null],
        iot_checking_that_all_COTs_comment:[null],
        iot_checking_that_all_venture_ratios_comment:[null],
        iot_to_clear_pluggage_comment:[null],
        ootsecondary_tle_comment:[null],
        oottertiary_tle_comment:[null],
        oot_pt_between_both_CG_movs_comment:[null],
        oot_CG_Decoke_MOV_comment:[null],
        iot_shp_steamflow_i_comment:[null],
        iot_monitor_fuelgas_comment:[null],
        oot_monitor_the_firebox_comment:[null],
        thesteamflow_is_greaterthan_10_comment:[null],
        oot_close_decoke_air_comment:[null],
        oot_to_close_4decoke_comment:[null],
        iot_disable_decokeair_controller_comment:[null],
        hv_22x0_07_isclosed_comment:[null],
        oot_to_fully_open_downstream_comment:[null],
        iot_to_confirm_ethane_feed_comment:[null],
        oot_to_lineup_steamdrum_comment:[null],
        adjust_the_steam_drum_blowdown_comment:[null],
        furnace_sequence_automove_to_warmup_comment:[null],
        userid:[this.userObject.id],
        master_id:[1],
     
    })
    
    }
    setupSubmitInterval() {
      this.onSubmitInterval = setInterval(() => {
        console.log('onSubmitInterval: ', this.onSubmitInterval);
        this.add();
      }, 5* 1000); // 2 minutes in milliseconds
    }
 onSubmit()
  {

      const formData = this.ChecklistD.value;
      console.log('formData: ', formData);
      this.apiService.savecheckdpage(formData).subscribe(
        (response) => {
          this.id=response.result.id;
          // this.ChecklistD.get('id')?.setValue(this.id);
          console.log('Data saved successfully:', response);
          this.toast.open('Data saved successfully', 'Close', { duration: 3000 });
        
          console.log('this.id: ', this.id);
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
    this.apiService.getchecklistD().subscribe((response: any) => {
      if (response && response.result) { // Check if response and response.result are not null or undefined
        this.remainingValues = response.result;
  
        Object.keys(this.remainingValues).forEach(key => {
          if (key !== 'shift_comment_d_oot' && key !== 'shift_comment_d_iot') {
            this.ChecklistD.get(key)?.patchValue(this.remainingValues[key]);
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
  const formData = this.ChecklistD.value;
  console.log('formData: ', formData);
  this.apiService.updatePermitData(formData).subscribe(
    (response) => {
      // Assuming 'permitForm' is a FormGroup
      this.ChecklistD.get('shift_comment_d_oot')?.reset();
      this.ChecklistD.get('shift_comment_d_iot')?.reset();

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
 
}
