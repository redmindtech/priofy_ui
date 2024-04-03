import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChecklistAService } from '@app/utils/service/checklist-a.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-checklist-a',
  templateUrl: './checklist-a.component.html',
  styleUrls: ['./checklist-a.component.css'],
})
export class ChecklistAComponent implements OnInit {
  @Input() checklistformenable: boolean;
  checklistbformenable: boolean = true;
  ChecklistA: FormGroup;
  currentDate: string;
  currenttime: string;
  userDetails: any;
  userObject: any;
  position: any;
  disableiot: any;
  disableoot: any;
  private onSubmitInterval: any;
  private addSubscription: Subscription | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ChecklistAService
  ) {}

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
    this.setupSubmitInterval();
  }
  ngOnDestroy(): void {
    clearInterval(this.onSubmitInterval);
    if (this.addSubscription) {
      this.addSubscription.unsubscribe();
    }
  }
  formInitialization() {
    this.ChecklistA = this.formBuilder.group({
      oot_high_pressure: [null,Validators.required],
      iot_decoke_mov: [null,Validators.required],
      iot_furnace_control_sequence: [null,Validators.required],
      iot_bm_sequence:[null,Validators.required],
      iot_individual_auto_burner: [null,Validators.required],
      oot_feed_and_fuel_gas: [null,Validators.required],
      oot_hbf_inlet: [null,Validators.required],
      oot_downstream_1_drains: [null,Validators.required],
      oot_bypass: [null,Validators.required],
      oot_inlet_vents:[null,Validators.required],
      oot_outlet_drains: [null,Validators.required],
      oot_stream_drum_inlet_check: [null,Validators.required],
      oot_untreated_inlet_db_1: [null,Validators.required],
      oot_untreated_hbf_inlet_check: [null,Validators.required],
      oot_hpssh_2_Outlet: [null,Validators.required],
      oot_hxs_upstream_nrv: [null,Validators.required],
      oot_vent_silencer_upstream: [null,Validators.required],
      oot_vent_silencer_downstream: [null,Validators.required],
      oot_hxs_outlet: [null,Validators.required],
      oot_sdl_transmitters: [null,Validators.required],
      oot_sdi_blow_down: [null,Validators.required],
      oot_bd_header: [null,Validators.required],
      oot_secondary_tle: [null,Validators.required],
      oot_intermittent_bd_header: [null,Validators.required],
      oot_primary_tles_2: [null,Validators.required],
      oot_secondary_tle_1: [null,Validators.required],
      oot_primary_tles_commom_header: [null,Validators.required],
      iot_bm_control_sequence_to_stand: [null,Validators.required],
      iot_purge_light_off:[null,Validators.required],
      oot_open_and_car_sealed: [null,Validators.required],
      oot_second_bv: [null,Validators.required],
      oot_upstream_and_downstram_bv_open: [null,Validators.required],
      oot_bv_and_globe_value_close:[null,Validators.required],
      drum_3_startup_vent: [null,Validators.required],
      oot_hxs_vent_valve: [null,Validators.required],
      iot_default_pressure:[null,Validators.required],
      iot_filling_the_steam_drum: [null,Validators.required],
      iot_steam_drum_level_control_master: [null,Validators.required],
      pressurize_the_downstream:[null,Validators.required],
      
      userid:[this.userObject.id],
    master_id:[1],
    });
  }

  setupSubmitInterval() {
    this.onSubmitInterval = setInterval(() => {
      console.log('onSubmitInterval: ', this.onSubmitInterval);
      this.add();
    }, 15 * 1000); // 2 minutes in milliseconds
  }

  onSubmit() {
   
      const permitFormValue = this.ChecklistA.value;
      console.log('Form Data:', permitFormValue);
      this.addSubscription = this.apiService
        .createchecklistA(permitFormValue)
        .subscribe(
          (response) => {
            console.log('Response from server:', response);
          },
          (error) => {
            console.error('Error while sending data:', error);
          }
        );
   
  }
  add() {
    this.apiService.getchecklist().subscribe((response: any) => {
      console.log(response, 'checking');
      this.ChecklistA.patchValue(response.result);
    });
  }
  nxtAccEn() {
    this.checklistbformenable = true;
  }
}
