import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChecklistAService } from '@app/utils/service/checklist-a.service';
import { Subscription } from 'rxjs';

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
  disableform: any;
  skipcolor: any;
  colour:string = 'null'; 
  clrvalue: string='null';
  formid: any;
  

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ChecklistAService,
    private toast: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.userDetails = localStorage.getItem('currentUser');
    this.userObject = JSON.parse(this.userDetails);
    this.position = this.userObject.position;
   // this.disableform=this.userObject.checklistA;
   this.disableform=true
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
      oot_high_pressure_comment: this.concatenateValues(
        this.ChecklistA.get('oot_high_pressure_id')?.value,
        this.ChecklistA.get('oot_high_pressure_comment')?.value
      ),
    });
    console.log( this.ChecklistA)
  }
    concatenateValues(controlValue1:any, controlValue2:any): string {
      // console.log('controlValue1:'+controlValue1+'controlValue2:'+controlValue2)
      const control1Value = controlValue1 ;
      const control2Value =controlValue2 ? controlValue2 :'';
     
      if(control2Value ==''){
        let result = ''
        console.log('if')
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

  onSubmit() {
   
      const permitFormValue = this.ChecklistA.value;
      console.log('Form Data:', permitFormValue);
      this.addSubscription = this.apiService
        .createchecklistA(permitFormValue)
        .subscribe(
          (response) => {
            this.id=response.result.id
            console.log('Response from server:', response);
            this.toast.open('Data saved successfully', 'Close', { duration: 3000 });
          },
          (error) => {
            console.error('Error while sending data:', error);
          }
        );
   
  }
  add() {
  this.apiService.getchecklist().subscribe((response: any) => {
    if (response && response.result) { // Check if response and response.result are not null or undefined
      this.remainingValues = response.result;
      this.formid= response.result.id;

      Object.keys(this.remainingValues).forEach(key => {
        if (key !== 'shift_comment_a_oot' && key !== 'shift_comment_a_iot') {
          this.ChecklistA.get(key)?.patchValue(this.remainingValues[key]);
        }
      });
    } else {
      console.log("Response or response.result is null or undefined.");
      // Handle the error or notify the user accordingly
    }

    if (response && response.result) {
      this.skipcolor = response.result;
      
   
    
      Object.entries(this.skipcolor).forEach(([key, value]) => {
        if (value === 'accept'|| value==='reject') {
            this.colour = (key);
            this.clrvalue=(value)
        }
    });
    
      console.log(this.colour);
    } else {
      console.log("Response or response.result is null or undefined.");
      // Handle the error or notify the user accordingly
    }

  });
  this.formdisable();
}

  nxtAccEn() {
    this.checklistbformenable = false;
    this.expand = false;
    this.open1 =true
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
formdisable() {
  if (this.formid) {
    console.log('this.formid: ', this.formid);
    this.apiService.getformdisable(this.formid).subscribe((response: any) => {
      console.log('API response:', response);
      
      // Verify if response.result is as expected
      const shouldDisable = response.result;
      console.log('Should disable form:', shouldDisable);

      // Disable or enable the form based on the API response
      if (shouldDisable) {
        this.ChecklistA.disable();
        console.log('Form disabled.');
      } else {
        this.ChecklistA.enable();
        console.log('Form enabled.');
      }
    }, error => {
      console.error('Error fetching form disable data:', error);
    });
  }
}

}
