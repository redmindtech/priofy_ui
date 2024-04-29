import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChecklistAService } from '@app/utils/service/checklist-a.service';
import { Subscription } from 'rxjs';
import { SkipConfirmationDialogComponent } from '@app/skip-confirmation-dialog/skip-confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-checklist-a',
  templateUrl: './checklist-a.component.html',
  styleUrls: ['./checklist-a.component.css'],
})
export class ChecklistAComponent implements OnInit {
  @Input() checklistformenable: boolean;
  open1:boolean;
  @Input() expand: boolean;
  checklistbformenable: boolean = true;
  ChecklistA: FormGroup;
  formDisableControl = new FormControl(false);
  currentDate: string;
  currenttime: string;
  userDetails: any;
  userObject: any;
  position: any;
  disableiot: any;
  disableoot: any;
  enable: boolean = false;
  aceptreject:string = 'null'; 
  id:any;
  private onSubmitInterval: any;
  private addSubscription: Subscription | undefined;
  remainingValues: any;
 
  skipcolor: any;
  colour:string = 'null'; 
  clrvalue: string='null';
  formid: any;
  formdisable:boolean;
  oot_high_pressure: boolean = true;
  oothbfinlet: boolean = true;
  skipConfirmed: boolean = false;
  
  

  
  

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ChecklistAService,
    private toast: MatSnackBar,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.userDetails = localStorage.getItem('currentUser');
    this.userObject = JSON.parse(this.userDetails);
    this.position = this.userObject.position;
   
    console.log(this.position)
    // this.formenable();
    if (this.position === 'iot') {
      this.disableiot = true;
      this.disableoot = false;
    } else if (this.position === 'oot') {
      this.disableiot = false;
      this.disableoot = true;
    }

    this.formInitialization();
    this.setupSubmitInterval();
  }
  
  formInitialization() {
    this.ChecklistA = this.formBuilder.group({
      
 oot_high_pressure_id:['1.OOT to ensure treated high pressure BFW (140 kg/cm2g HBF) is available.'],
 oot_hbf_inlet_id:['2.HBF inlet DB 1" drains.'],
 oot_downstream_1_drains_id:['FV-22X6-08 downstream 1" drains.'],
 oot_bypass_id:['FV-22X6-08 bypass 1" drains.'],
 oot_inlet_vents_id:['ECO inlet 1 vents.'],
 oot_outlet_drains_id:['ECO outlet 1" drains.'],
 oot_stream_drum_inlet_check_id:['Steam Drum Inlet Check Valve 1" drains.'],
 oot_untreated_inlet_db_1_id:['Untreated HBF Inlet DB 1 drains.'],
 oot_untreated_hbf_inlet_check_id:['Untreated HBF Inlet Check Valve 1" drains.'],
 oot_hpssh_2_Outlet_id:['HPSSH-2 Outlet 1-1/2" drains.'],
 oot_hxs_upstream_nrv_id:['HXS line upstream NRV (non-return valve).'],
 oot_vent_silencer_upstream_id:['Vent Silencer PV-22X0-43 upstream 1 drains.'],
 oot_vent_silencer_downstream_id:['Vent Silencer PV-22X0-43 downstream 1" drain.'],
 oot_hxs_outlet_id:['HXS outlet DB 1" drains.'],
 oot_sdl_transmitters_id:['Steam Drum Level Transmitters (#3) 1" drains and vents.'],
 oot_sdi_blow_down_id:['2" Steam Drum Intermittent Blow down (#2).'],
 oot_bd_header_id:['Steam Drum Continuous BD Header DB 1" drains'],
 oot_secondary_tle_id:['Secondary TLE Continuous BD Header DB 1" drains.'],
 oot_intermittent_bd_header_id :['Intermittent BD Header B/V 1" drains'],
 oot_primary_tles_2_id:['Primary TLEs 2" blow downs (#12).'],
 oot_secondary_tle_1_id :['Secondary TLE 1 blow downs (#2)'],
 oot_primary_tles_commom_header_id:['Primary TLEs Common Header 1" bleeds'],
 iot_decoke_mov_id:['3.IOT to ensure that Decoke MOV is open, CG MOVs are closed and the local MOV switches are in REMOTE position.'],
 iot_furnace_control_sequence_id:['4.IOT to ensure Furnace control sequence is in Process Wait step.'],
 iot_bm_sequence_id:['5.IOT to move BM sequence to Process Wait step.'],
 iot_individual_auto_burner_id:['6.IOT to go to each individual auto burner and move its sequence to Process Wait.'],
 oot_feed_and_fuel_gas_id:['7.OOT to double check that feed and fuel gas are isolated.'],
 iot_bm_control_sequence_to_stand_id:['8.IOT to move BM control sequence to Stand By step.'],
 iot_purge_light_off_id:['9.Once BMS is moved to Standby, IOT can manually move Furnace control sequence step from process wait to purge light off.'],
 oot_open_and_car_sealed_id:['10.OOT to ensure steam drum BFW inlet B/V at the inlet of steam drum is open and car sealed (on top deck).'],
 oot_second_bv_id:['11.OOT to ensure furnace battery limit HBF inlet 4" second B/V is closed.<br>Note: First B/V should not be operated (it should be always open).'],
 oot_upstream_and_downstram_bv_open_id:['12.OOT to ensure HBF control valve (FV-22X6-08) upstream and downstream B/Vs are open.'],
 oot_bv_and_globe_value_close_id:['13.OOT to ensure HBF control valve (FV-22X6-08) bypass 2 B/V and globe valve are closed.'],
 drum_3_startup_vent_id:['14.Keep the steam drum 3" startup vent valves open.'],
 oot_hxs_vent_valve_id:['15.OOT to open both HXS vent valve PV-22X0-43 4" upstream block valves.'],
 iot_default_pressure_id:['16.IOT to ensure PV-22X0-43 is in "auto" control at the default flow set point of 10 Mt/h and default pressure set point of 112 kg/cm2g.'],
 pressurize_the_downstream_id:['17.Initially use the bypass valves across first block valve to pressurize the downstream header and then open the main block valve. Then close the bypass valves across the first block valve.Start taking BFW to steam drum through FV-22X6-08 2" bypass line, keeping first bypass open and throttling 2nd bypass valve.'],
 iot_filling_the_steam_drum_id:['18.IOT to start filling the steam drum SLOWLY. Must enable “BFW to steam drum flow control slave” controller through activation of the HS.'],
 iot_steam_drum_level_control_master_id:['19.IOT to confirm that “steam drum level control master” controller is automatically enabled after level has been within 5% of fill set point'],
      oot_high_pressure: [null, Validators.required],
      oot_high_pressure_comment: [null],
      oot_hbf_inlet: [null, Validators.required],
      oot_hbf_inlet_comment:[null],
      iot_decoke_mov: [null, Validators.required],
      iot_decoke_mov_comment: [null],
      iot_furnace_control_sequence: [null, Validators.required],
      iot_furnace_control_sequence_comment: [null],
      iot_bm_sequence: [null, Validators.required],
      iot_bm_sequence_comment: [null],
      iot_individual_auto_burner: [null, Validators.required],
      iot_individual_auto_burner_comment: [null],
      oot_feed_and_fuel_gas: [null, Validators.required],
      oot_feed_and_fuel_gas_comment: [null],
      oot_downstream_1_drains: [null, Validators.required],
      oot_downstream_1_drains_comment: [null],
      oot_bypass: [null, Validators.required],
      oot_bypass_comment:[null],
      oot_inlet_vents: [null, Validators.required],
      oot_inlet_vents_comment: [null],
      oot_outlet_drains: [null, Validators.required],
      oot_outlet_drains_comment: [null],
      oot_stream_drum_inlet_check: [null, Validators.required],
      oot_stream_drum_inlet_check_comment: [null],
      oot_untreated_inlet_db_1: [null, Validators.required],
      oot_untreated_inlet_db_1_comment: [null],
      oot_untreated_hbf_inlet_check: [null, Validators.required],
      oot_untreated_hbf_inlet_check_comment: [null],
      oot_hpssh_2_Outlet: [null, Validators.required],
      oot_hpssh_2_Outlet_comment:[null],
      oot_hxs_upstream_nrv: [null, Validators.required],
      oot_hxs_upstream_nrv_comment: [null],
      oot_vent_silencer_upstream: [null, Validators.required],
      oot_vent_silencer_upstream_comment: [null],
      oot_vent_silencer_downstream: [null, Validators.required],
      oot_vent_silencer_downstream_comment:[null],
      oot_hxs_outlet: [null, Validators.required],
      oot_hxs_outlet_comment: [null],
      oot_sdl_transmitters: [null, Validators.required],
      oot_sdl_transmitters_comment: [null],
      oot_sdi_blow_down: [null, Validators.required],
      oot_sdi_blow_down_comment: [null],
      oot_bd_header: [null, Validators.required],
      oot_bd_header_comment: [null],
      oot_secondary_tle: [null, Validators.required],
      oot_secondary_tle_comment: [null],
      oot_intermittent_bd_header_comment:[null],
      oot_intermittent_bd_header: [null, Validators.required],

      oot_primary_tles_2_comment: [null],
      oot_primary_tles_2: [null, Validators.required],

      oot_secondary_tle_1: [null, Validators.required],
      oot_secondary_tle_1_comment: [null],
      oot_primary_tles_commom_header: [null, Validators.required],
      oot_primary_tles_commom_header_comment:[null],
      iot_bm_control_sequence_to_stand: [null, Validators.required],
      iot_bm_control_sequence_to_stand_comment: [null],
      iot_purge_light_off: [null, Validators.required],
      iot_purge_light_off_comment: [null],

      oot_open_and_car_sealed: [null, Validators.required],
      oot_open_and_car_sealed_comment: [null],
      oot_second_bv: [null, Validators.required],
      oot_second_bv_comment: [null],
      oot_upstream_and_downstram_bv_open: [null, Validators.required],
      oot_upstream_and_downstram_bv_open_comment:[null],
      oot_bv_and_globe_value_close: [null, Validators.required],
      oot_bv_and_globe_value_close_comment: [null],

      drum_3_startup_vent: [null, Validators.required],
      drum_3_startup_vent_comment: [null],

      oot_hxs_vent_valve: [null, Validators.required],
      oot_hxs_vent_valve_comment: [null],
      iot_default_pressure: [null, Validators.required],
      iot_default_pressure_comment: [null],
      iot_filling_the_steam_drum: [null, Validators.required],
      iot_filling_the_steam_drum_comment: [null],

      iot_steam_drum_level_control_master: [null, Validators.required],
      iot_steam_drum_level_control_master_comment: [null],
      pressurize_the_downstream: [null, Validators.required],
      pressurize_the_downstream_comment: [null],
      shift_comment_a_oot:[null],
      shift_comment_a_iot:[null],
      userid: [this.userObject.id],
      master_id: [1],
      id:[this.id],
    });
  }
  patchvalue(){
    console.log('patchvalue() called');
    this.ChecklistA.patchValue({
      oot_high_pressure_comment: this.concatenateValues(this.ChecklistA.get('oot_high_pressure_id')?.value,this.ChecklistA.get('oot_high_pressure_comment')?.value ),
      iot_bm_sequence_comment: this.concatenateValues(this.ChecklistA.get('iot_bm_sequence_id')?.value,this.ChecklistA.get('iot_bm_sequence_comment')?.value ),
      oot_hbf_inlet_comment: this.concatenateValues(this.ChecklistA.get('oot_hbf_inlet_id')?.value,this.ChecklistA.get('oot_hbf_inlet_comment')?.value ),
      oot_downstream_1_drains_comment: this.concatenateValues(this.ChecklistA.get('oot_downstream_1_drains_id')?.value,this.ChecklistA.get('oot_downstream_1_drains_comment')?.value ),
      oot_bypass_comment: this.concatenateValues(this.ChecklistA.get('oot_bypass_id')?.value,this.ChecklistA.get('oot_bypass_comment')?.value ),
      oot_inlet_vents_comment: this.concatenateValues(this.ChecklistA.get('oot_inlet_vents_id')?.value,this.ChecklistA.get('oot_inlet_vents_comment')?.value ),
      oot_outlet_drains_comment: this.concatenateValues(this.ChecklistA.get('oot_outlet_drains_id')?.value,this.ChecklistA.get('oot_outlet_drains_comment')?.value ),
      oot_stream_drum_inlet_check_comment: this.concatenateValues(this.ChecklistA.get('oot_stream_drum_inlet_check_id')?.value,this.ChecklistA.get('oot_stream_drum_inlet_check_comment')?.value ),
      oot_untreated_inlet_db_1_comment: this.concatenateValues(this.ChecklistA.get('oot_untreated_inlet_db_1_id')?.value,this.ChecklistA.get('oot_untreated_inlet_db_1_comment')?.value ),
      oot_untreated_hbf_inlet_check_comment: this.concatenateValues(this.ChecklistA.get('oot_untreated_hbf_inlet_check_id')?.value,this.ChecklistA.get('oot_untreated_hbf_inlet_check_comment')?.value ),
      oot_hpssh_2_Outlet_comment: this.concatenateValues(this.ChecklistA.get('oot_hpssh_2_Outlet_id')?.value,this.ChecklistA.get('oot_hpssh_2_Outlet_comment')?.value ),
      oot_hxs_upstream_nrv_comment: this.concatenateValues(this.ChecklistA.get('oot_hxs_upstream_nrv_id')?.value,this.ChecklistA.get('oot_hxs_upstream_nrv_comment')?.value ),
      oot_vent_silencer_upstream_comment: this.concatenateValues(this.ChecklistA.get('oot_vent_silencer_upstream_id')?.value,this.ChecklistA.get('oot_vent_silencer_upstream_comment')?.value ),
      oot_vent_silencer_downstream_comment: this.concatenateValues(this.ChecklistA.get('oot_vent_silencer_downstream_id')?.value,this.ChecklistA.get('oot_vent_silencer_downstream_comment')?.value ),
      oot_hxs_outlet_comment: this.concatenateValues(this.ChecklistA.get('oot_hxs_outlet_id')?.value,this.ChecklistA.get('oot_hxs_outlet_comment')?.value ),
      oot_sdl_transmitters_comment: this.concatenateValues(this.ChecklistA.get('oot_sdl_transmitters_id')?.value,this.ChecklistA.get('oot_sdl_transmitters_comment')?.value ),
      oot_sdi_blow_down_comment: this.concatenateValues(this.ChecklistA.get('oot_sdi_blow_down_id')?.value,this.ChecklistA.get('oot_sdi_blow_down_comment')?.value ),
      oot_bd_header_comment: this.concatenateValues(this.ChecklistA.get('oot_bd_header_id')?.value,this.ChecklistA.get('oot_bd_header_comment')?.value ),
      oot_secondary_tle_comment: this.concatenateValues(this.ChecklistA.get('oot_secondary_tle_id')?.value,this.ChecklistA.get('oot_secondary_tle_comment')?.value ),
      oot_intermittent_bd_header_comment: this.concatenateValues(this.ChecklistA.get('oot_intermittent_bd_header_id')?.value,this.ChecklistA.get('oot_intermittent_bd_header_comment')?.value ),
      oot_primary_tles_2_comment: this.concatenateValues(this.ChecklistA.get('oot_primary_tles_2_id')?.value,this.ChecklistA.get('oot_primary_tles_2_comment')?.value ),
      oot_secondary_tle_1_comment: this.concatenateValues(this.ChecklistA.get('oot_secondary_tle_1_id')?.value,this.ChecklistA.get('oot_secondary_tle_1_comment')?.value ),
      oot_primary_tles_commom_header_comment: this.concatenateValues(this.ChecklistA.get('oot_primary_tles_commom_header_id')?.value,this.ChecklistA.get('oot_primary_tles_commom_header_comment')?.value ),
      iot_decoke_mov_comment: this.concatenateValues(this.ChecklistA.get('iot_decoke_mov_id')?.value,this.ChecklistA.get('iot_decoke_mov_comment')?.value ),

      iot_furnace_control_sequence_comment: this.concatenateValues(this.ChecklistA.get('iot_furnace_control_sequence_id')?.value,this.ChecklistA.get('iot_furnace_control_sequence_comment')?.value ),

      iot_individual_auto_burner_comment: this.concatenateValues(this.ChecklistA.get('iot_individual_auto_burner_id')?.value,this.ChecklistA.get('iot_individual_auto_burner_comment')?.value ),
      oot_feed_and_fuel_gas_comment: this.concatenateValues(this.ChecklistA.get('oot_feed_and_fuel_gas_id')?.value,this.ChecklistA.get('oot_feed_and_fuel_gas_comment')?.value ),
      iot_bm_control_sequence_to_stand_comment: this.concatenateValues(this.ChecklistA.get('iot_bm_control_sequence_to_stand_id')?.value,this.ChecklistA.get('iot_bm_control_sequence_to_stand_comment')?.value ),
      iot_purge_light_off_comment: this.concatenateValues(this.ChecklistA.get('iot_purge_light_off_id')?.value,this.ChecklistA.get('iot_purge_light_off_comment')?.value ),
      oot_open_and_car_sealed_comment: this.concatenateValues(this.ChecklistA.get('oot_open_and_car_sealed_id')?.value,this.ChecklistA.get('oot_open_and_car_sealed_comment')?.value ),
      oot_second_bv_comment: this.concatenateValues(this.ChecklistA.get('oot_second_bv_id')?.value,this.ChecklistA.get('oot_second_bv_comment')?.value ),
      oot_upstream_and_downstram_bv_open_comment: this.concatenateValues(this.ChecklistA.get('oot_upstream_and_downstram_bv_open_id')?.value,this.ChecklistA.get('oot_upstream_and_downstram_bv_open_comment')?.value ),
      oot_bv_and_globe_value_close_comment: this.concatenateValues(this.ChecklistA.get('oot_bv_and_globe_value_close_id')?.value,this.ChecklistA.get('oot_bv_and_globe_value_close_comment')?.value ),
      drum_3_startup_vent_comment: this.concatenateValues(this.ChecklistA.get('drum_3_startup_vent_id')?.value,this.ChecklistA.get('drum_3_startup_vent_comment')?.value ),
      oot_hxs_vent_valve_comment: this.concatenateValues(this.ChecklistA.get('oot_hxs_vent_valve_id')?.value,this.ChecklistA.get('oot_hxs_vent_valve_comment')?.value ),
      iot_default_pressure_comment: this.concatenateValues(this.ChecklistA.get('iot_default_pressure_id')?.value,this.ChecklistA.get('iot_default_pressure_comment')?.value ),
      pressurize_the_downstream_comment: this.concatenateValues(this.ChecklistA.get('pressurize_the_downstream_id')?.value,this.ChecklistA.get('pressurize_the_downstream_comment')?.value ),
      iot_filling_the_steam_drum_comment: this.concatenateValues(this.ChecklistA.get('iot_filling_the_steam_drum_id')?.value,this.ChecklistA.get('iot_filling_the_steam_drum_comment')?.value ),
      iot_steam_drum_level_control_master_comment: this.concatenateValues(this.ChecklistA.get('iot_steam_drum_level_control_master_id')?.value,this.ChecklistA.get('iot_steam_drum_level_control_master_comment')?.value ),




    
    });
    console.log( this.ChecklistA)
  }
    concatenateValues(controlValue1:any, controlValue2:any): string {
      // console.log('controlValue1:'+controlValue1+'controlValue2:'+controlValue2)
      const control1Value = controlValue1 ;
      const control2Value =controlValue2 ? controlValue2 :null;
     
      if (control2Value === null) {
        let result :any; 
        console.log('if');
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

  onSubmit(controlName: string) {
   
      const permitFormValue = this.ChecklistA.value;
      console.log('Form Data:', permitFormValue);
      this.addSubscription = this.apiService
        .createchecklistA(permitFormValue)
        .subscribe(
          (response) => {
            this.id=response.result.id
            console.log('Response from server:', response.result.id);
            this.toast.open('Data saved successfully', 'Close', { duration: 3000 });
          },
          (error) => {
            console.error('Error while sending data:', error);
          }
        );
        if (controlName === 'oot_high_pressure') {
          this.oot_high_pressure = false;
        } else if (controlName === 'some_other_control_name') {
          // Handle other controls similarly
        }
  }
  add() {
  this.apiService.getchecklist().subscribe((response: any) => {
    if (response && response.result) { // Check if response and response.result are not null or undefined
      this.remainingValues = response.result;
      this.formid= response.result.id;
     
     this.formdisable = response.result.status === "Complete" ? true : false;

      Object.keys(this.remainingValues).forEach(key => {
        if (key !== 'shift_comment_a_oot' && key !== 'shift_comment_a_iot') {
          this.ChecklistA.get(key)?.patchValue(this.remainingValues[key]);
          console.log('this.remainingValues[key]: ', this.remainingValues[key]);
        }
      });
    } else {
      console.log("Response or response.result is null or undefined.");
      // Handle the error or notify the user accordingly
    }
    this.ChecklistA.get('oot_high_pressure_comment')?.setValue(this.ChecklistA.get('oot_high_pressure_comment')?.value ? this.ChecklistA.get('oot_high_pressure_comment')?.value.split("||")[1].trim() : null);
    this.ChecklistA.get('iot_bm_sequence_comment')?.setValue(this.ChecklistA.get('iot_bm_sequence_comment')?.value ? this.ChecklistA.get('iot_bm_sequence_comment')?.value.split("||")[1].trim() : null);
    this.ChecklistA.get('oot_hbf_inlet_comment')?.setValue(this.ChecklistA.get('oot_hbf_inlet_comment')?.value ? this.ChecklistA.get('oot_hbf_inlet_comment')?.value.split("||")[1].trim() : null);
    this.ChecklistA.get('oot_downstream_1_drains_comment')?.setValue(this.ChecklistA.get('oot_downstream_1_drains_comment')?.value ? this.ChecklistA.get('oot_downstream_1_drains_comment')?.value.split("||")[1].trim() : null);
    this.ChecklistA.get('oot_bypass_comment')?.setValue(this.ChecklistA.get('oot_bypass_comment')?.value ? this.ChecklistA.get('oot_bypass_comment')?.value.split("||")[1].trim() : null);
    this.ChecklistA.get('oot_inlet_vents_comment')?.setValue(this.ChecklistA.get('oot_inlet_vents_comment')?.value ? this.ChecklistA.get('oot_inlet_vents_comment')?.value.split("||")[1].trim() : null);
    this.ChecklistA.get('oot_outlet_drains_comment')?.setValue(this.ChecklistA.get('oot_outlet_drains_comment')?.value ? this.ChecklistA.get('oot_outlet_drains_comment')?.value.split("||")[1].trim() : null);
    this.ChecklistA.get('oot_stream_drum_inlet_check_comment')?.setValue(this.ChecklistA.get('oot_stream_drum_inlet_check_comment')?.value ? this.ChecklistA.get('oot_stream_drum_inlet_check_comment')?.value.split("||")[1].trim() : null);
    this.ChecklistA.get('oot_untreated_inlet_db_1_comment')?.setValue(this.ChecklistA.get('oot_untreated_inlet_db_1_comment')?.value ? this.ChecklistA.get('oot_untreated_inlet_db_1_comment')?.value.split("||")[1].trim() : null);
    this.ChecklistA.get('oot_untreated_hbf_inlet_check_comment')?.setValue(this.ChecklistA.get('oot_untreated_hbf_inlet_check_comment')?.value ? this.ChecklistA.get('oot_untreated_hbf_inlet_check_comment')?.value.split("||")[1].trim() : null);
    this.ChecklistA.get('oot_hpssh_2_Outlet_comment')?.setValue(this.ChecklistA.get('oot_hpssh_2_Outlet_comment')?.value ? this.ChecklistA.get('oot_hpssh_2_Outlet_comment')?.value.split("||")[1].trim() : null);
    this.ChecklistA.get('oot_hxs_upstream_nrv_comment')?.setValue(this.ChecklistA.get('oot_hxs_upstream_nrv_comment')?.value ? this.ChecklistA.get('oot_hxs_upstream_nrv_comment')?.value.split("||")[1].trim() : null);
    this.ChecklistA.get('oot_vent_silencer_upstream_comment')?.setValue(this.ChecklistA.get('oot_vent_silencer_upstream_comment')?.value ? this.ChecklistA.get('oot_vent_silencer_upstream_comment')?.value.split("||")[1].trim() : null);
    this.ChecklistA.get('oot_vent_silencer_downstream_comment')?.setValue(this.ChecklistA.get('oot_vent_silencer_downstream_comment')?.value ? this.ChecklistA.get('oot_vent_silencer_downstream_comment')?.value.split("||")[1].trim() : null);
    this.ChecklistA.get('oot_hxs_outlet_comment')?.setValue(this.ChecklistA.get('oot_hxs_outlet_comment')?.value ? this.ChecklistA.get('oot_hxs_outlet_comment')?.value.split("||")[1].trim() : null);
    this.ChecklistA.get('oot_sdl_transmitters_comment')?.setValue(this.ChecklistA.get('oot_sdl_transmitters_comment')?.value ? this.ChecklistA.get('oot_sdl_transmitters_comment')?.value.split("||")[1].trim() : null);
    this.ChecklistA.get('oot_sdi_blow_down_comment')?.setValue(this.ChecklistA.get('oot_sdi_blow_down_comment')?.value ? this.ChecklistA.get('oot_sdi_blow_down_comment')?.value.split("||")[1].trim() : null);
    this.ChecklistA.get('oot_bd_header_comment')?.setValue(this.ChecklistA.get('oot_bd_header_comment')?.value ? this.ChecklistA.get('oot_bd_header_comment')?.value.split("||")[1].trim() : null);
    this.ChecklistA.get('oot_secondary_tle_comment')?.setValue(this.ChecklistA.get('oot_secondary_tle_comment')?.value ? this.ChecklistA.get('oot_secondary_tle_comment')?.value.split("||")[1].trim() : null);
    this.ChecklistA.get('oot_intermittent_bd_header_comment')?.setValue(this.ChecklistA.get('oot_intermittent_bd_header_comment')?.value ? this.ChecklistA.get('oot_intermittent_bd_header_comment')?.value.split("||")[1].trim() : null);
    this.ChecklistA.get('oot_primary_tles_2_comment')?.setValue(this.ChecklistA.get('oot_primary_tles_2_comment')?.value ? this.ChecklistA.get('oot_primary_tles_2_comment')?.value.split("||")[1].trim() : null);
    this.ChecklistA.get('oot_secondary_tle_1_comment')?.setValue(this.ChecklistA.get('oot_secondary_tle_1_comment')?.value ? this.ChecklistA.get('oot_secondary_tle_1_comment')?.value.split("||")[1].trim() : null);
    this.ChecklistA.get('oot_primary_tles_commom_header_comment')?.setValue(this.ChecklistA.get('oot_primary_tles_commom_header_comment')?.value ? this.ChecklistA.get('oot_primary_tles_commom_header_comment')?.value.split("||")[1].trim() : null);
    this.ChecklistA.get('iot_decoke_mov_comment')?.setValue(this.ChecklistA.get('iot_decoke_mov_comment')?.value ? this.ChecklistA.get('iot_decoke_mov_comment')?.value.split("||")[1].trim() : null);
    this.ChecklistA.get('iot_furnace_control_sequence_comment')?.setValue(this.ChecklistA.get('iot_furnace_control_sequence_comment')?.value ? this.ChecklistA.get('iot_furnace_control_sequence_comment')?.value.split("||")[1].trim() : null);
    this.ChecklistA.get('iot_individual_auto_burner_comment')?.setValue(this.ChecklistA.get('iot_individual_auto_burner_comment')?.value ? this.ChecklistA.get('iot_individual_auto_burner_comment')?.value.split("||")[1].trim() : null);
    this.ChecklistA.get('oot_feed_and_fuel_gas_comment')?.setValue(this.ChecklistA.get('oot_feed_and_fuel_gas_comment')?.value ? this.ChecklistA.get('oot_feed_and_fuel_gas_comment')?.value.split("||")[1].trim() : null);
    this.ChecklistA.get('iot_bm_control_sequence_to_stand_comment')?.setValue(this.ChecklistA.get('iot_bm_control_sequence_to_stand_comment')?.value ? this.ChecklistA.get('iot_bm_control_sequence_to_stand_comment')?.value.split("||")[1].trim() : null);
    this.ChecklistA.get('iot_purge_light_off_comment')?.setValue(this.ChecklistA.get('iot_purge_light_off_comment')?.value ? this.ChecklistA.get('iot_purge_light_off_comment')?.value.split("||")[1].trim() : null);
    this.ChecklistA.get('oot_open_and_car_sealed_comment')?.setValue(this.ChecklistA.get('oot_open_and_car_sealed_comment')?.value ? this.ChecklistA.get('oot_open_and_car_sealed_comment')?.value.split("||")[1].trim() : null);
    this.ChecklistA.get('oot_second_bv_comment')?.setValue(this.ChecklistA.get('oot_second_bv_comment')?.value ? this.ChecklistA.get('oot_second_bv_comment')?.value.split("||")[1].trim() : null);
    this.ChecklistA.get('oot_upstream_and_downstram_bv_open_comment')?.setValue(this.ChecklistA.get('oot_upstream_and_downstram_bv_open_comment')?.value ? this.ChecklistA.get('oot_upstream_and_downstram_bv_open_comment')?.value.split("||")[1].trim() : null);
    this.ChecklistA.get('oot_bv_and_globe_value_close_comment')?.setValue(this.ChecklistA.get('oot_bv_and_globe_value_close_comment')?.value ? this.ChecklistA.get('oot_bv_and_globe_value_close_comment')?.value.split("||")[1].trim() : null);
    this.ChecklistA.get('drum_3_startup_vent_comment')?.setValue(this.ChecklistA.get('drum_3_startup_vent_comment')?.value ? this.ChecklistA.get('drum_3_startup_vent_comment')?.value.split("||")[1].trim() : null);
    this.ChecklistA.get('oot_hxs_vent_valve_comment')?.setValue(this.ChecklistA.get('oot_hxs_vent_valve_comment')?.value ? this.ChecklistA.get('oot_hxs_vent_valve_comment')?.value.split("||")[1].trim() : null);
     this.ChecklistA.get('iot_default_pressure_comment')?.setValue(this.ChecklistA.get('iot_default_pressure_comment')?.value ? this.ChecklistA.get('iot_default_pressure_comment')?.value.split("||")[1].trim() : null);
     this.ChecklistA.get('pressurize_the_downstream_comment')?.setValue(this.ChecklistA.get('pressurize_the_downstream_comment')?.value ? this.ChecklistA.get('pressurize_the_downstream_comment')?.value.split("||")[1].trim() : null);
      this.ChecklistA.get('iot_filling_the_steam_drum_comment')?.setValue(this.ChecklistA.get('iot_filling_the_steam_drum_comment')?.value ? this.ChecklistA.get('iot_filling_the_steam_drum_comment')?.value.split("||")[1].trim() : null);
     this.ChecklistA.get('iot_steam_drum_level_control_master_comment')?.setValue(this.ChecklistA.get('iot_steam_drum_level_control_master_comment')?.value ? this.ChecklistA.get('iot_steam_drum_level_control_master_comment')?.value.split("||")[1].trim() : null);
     
    if (response && response.result) {
      this.skipcolor = response.result;
      
   
    
      Object.entries(this.skipcolor).forEach(([key, value]) => {
        if (value === 'accept'|| value==='reject') {
         

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

  nxtAccEn() {
    this.checklistbformenable = false;
    this.expand = false;
    this.open1 =true
  }

  onRadioChange(controlName: string) {
    // You may want to check if the input field has focus or not
    // before making the API call
    const activeElement = document.activeElement as HTMLElement;
    console.log('activeElement: ', activeElement);
    console.log('activeElement.tagName.toLowerCase(): ', activeElement.tagName.toLowerCase());
    if (activeElement && activeElement.tagName.toLowerCase() !== 'input') {
      this.onSubmit(controlName);
    }
  
    if (controlName === 'oot_high_pressure') {
      if (this.ChecklistA?.get('oot_high_pressure')?.value === 'Skip' && this.oot_high_pressure) {
        this.oot_high_pressure = true; // Show textarea and buttons if Skip is selected for the first time
      } else {
        this.oot_high_pressure = false; // Hide textarea and buttons if Skip is not selected or already pressed
      }
    } else if (controlName === 'some_other_control_name') {
      // Handle logic for other radio buttons similarly
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
  console.log('this.remainingValues.shift_comment_a_oot:', this.remainingValues.shift_comment_a_oot);
  console.log('this.remainingValues.shift_comment_a_oot:', this.remainingValues.shift_comment_a_iot);
  // this.ChecklistA.get('shift_comment_a_oot')?.setValue(this.remainingValues.shift_comment_a_oot );
  // console.log('this.remainingValues.shift_comment_a_oot: ', this.remainingValues.get('shift_comment_a_oot').value);
  // this.ChecklistA.get('shift_comment_a_iot')?.setValue(this.remainingValues.shift_comment_a_iot );
  const formData = this.ChecklistA.value;
  console.log('formData: ', formData);
  
  this.apiService.updatePermitData(formData).subscribe(
    (response) => {
      // Assuming 'permitForm' is a FormGroup
      this.ChecklistA.get('shift_comment_a_oot')?.setValue(null);
      this.ChecklistA.get('shift_comment_a_iot')?.setValue(null);
      
     console.log(response)
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
  this.ChecklistA.get('shift_comment_a_oot')?.setValue(null);
  this.ChecklistA.get('shift_comment_a_iot')?.setValue(null);
}

onSkip(controlName: string) {
  if (controlName === 'iot_decoke_mov') {
    const dialogRef = this.dialog.open(SkipConfirmationDialogComponent, {
      width: '400px',
      data: {
        title: 'Skip Confirmation',
        message: 'On Skipping This, it will Automatically Skip 4 & 5. Continue?',
        confirmText: 'Continue',
        cancelText: 'Cancel'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      // This code will execute after closing the dialog
    });
  }
}

confirmSkip() {
  const comment = this.ChecklistA.get('iot_decoke_mov_comment')?.value || '';

  // Update the comment and set the skip value for the 3rd row
  this.updateCommentsAndSkip('iot_decoke_mov_comment', comment);

  // Set comment of the 3rd row to 4th and 5th row textboxes if it is skipped
  const thirdRowValue = this.ChecklistA.get('iot_decoke_mov')?.value;
  if (thirdRowValue === 'Skip') {
    // Assign the comment of the 3rd row to thirdRowComment
    const thirdRowComment = comment;

    // Set comments and skip values for the 4th and 5th rows
    this.updateCommentsAndSkip('iot_furnace_control_sequence_comment', thirdRowComment);
    this.updateCommentsAndSkip('iot_bm_sequence_comment', thirdRowComment);
  }
}



updateCommentsAndSkip(controlName: string, comment: string) {
  const commentControl = this.ChecklistA.get(controlName);
  if (commentControl) {
    commentControl.setValue(comment);
  }

  const skipControlName = controlName.replace('_comment', '');
  const skipControl = this.ChecklistA.get(skipControlName);
  if (skipControl) {
    skipControl.setValue('Skip');
  }
}




}
