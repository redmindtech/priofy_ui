import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChecklistEService } from '@app/utils/service/checklist-e.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-checklist-e',
  templateUrl: './checklist-e.component.html',
  styleUrls: ['./checklist-e.component.css']
})
export class ChecklistEComponent implements OnInit {
  @Input() checklisteformenable: boolean;
  checklistfformenable: boolean = true;
  @Input() printexpand8: boolean = false; // Initialize printexpand when declared

  printexpand9: boolean;
  ChecklistE!: FormGroup;
  private onSubmitInterval: any;
  private addSubscription: Subscription | undefined;
  disableIO: string;
  currentUser: any;
  id: any;
  open1:boolean;
  @Input() expand: boolean;
  enable: boolean = false; 
  aceptreject:string = 'null';
  remainingValues: any;
  skipcolor: any;
  colour:string = 'null'; 
  clrvalue: string='null';
  formdisable:boolean;
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ChecklistEService
  ) { }

  ngOnInit(): void {
    
    const storedUser = localStorage.getItem('currentUser');
     this.currentUser = storedUser ? JSON.parse(storedUser) : null;
     console.log(' this.currentUser: ',  this.currentUser.position);
   this.disableIO=this.currentUser.position;
    this.formInitialization();
    this.setupSubmitInterval();
  }
  formInitialization() {
    this.ChecklistE = this.formBuilder.group({
      oot_lower_level_burner_id:['1.OOT to ensure that all lower level burners are lit before starting light off of upper level burners'],
      iot_monitor_the_fuel_gas_id:['2.IOT to continuously monitor the fuel gas pressure and OOT to continue lighting off more burners as required'],
      oot_desuperheater_id:['3.OOT to open desuperheater Untreated BFW manual block valves (DB&B) when the COT is &gt; 450 ºC.'],
    
    
      iot_desuperheater_not_pass_id:['4.IOT to confirm that the desuperheater valve does not pass. If it passes, instruct the OOT to close the B/V until desuperheating flow is needed.'],
      oot_lineup_sd_id:['5.When steam drum pressure is above 90 kg/cm2g:OOT to line up steam drum continuous blowdown valve and block in steam drum intermittent blowdown.'],
      oot_cbd_id:['5.When steam drum pressure is above 90 kg/cm2g:OOT to confirm that the sTLE blowdown to CBD header is lined up.'],
      oot_confirm_cooling_water_id:['5.When steam drum pressure is above 90 kg/cm2g:OOT to ensure steam drum blowdown analyzer online and confirm cooling water flow to and from cooler.'],
      oot_stle_blowdown_analyzer_id:['5.When steam drum pressure is above 90 kg/cm2g:OOT to ensure sTLE blowdown analyzer cooling water flow to and from cooler is established.'],
      oot_desuperheater_untreated_bfw_id:['5.When steam drum pressure is above 90 kg/cm2g: OOT to open desuperheater untreated BFW manual block valves (DB&B) if not done before.'],
      furnace_sequence_to_swing_mov_id:['8.When COT temperature is above 760ºC and if steam flow confirmed higher than 10 Mt/h per side, it is possible to move the Furnace sequence to Swing MOV step, if ready to do so.'],
      ootIOT_decoke_air_id:['7.OOT&IOT to reconfirm that Decoke Air is blinded (ONIS device).'],
      psv_evt_complete_id:['6.Continue with warm-up when PSV EVT testing is complete'],
      psv_evt_start_id:['6.If steam PSV EVT testing needs to be done, hold COTs at 700°C (via COT manual set point) and steam drum pressure at 93kg/cm2g using steam vent to atmosphere control valve (flow should be around 12 M t/h).'],
      iot_to_enable_sd_id:['5.When steam drum pressure is above 90 kg/cm2g:IOT to enable steam drum and sTLE continuous blow downs from HMI Station.'],
      // oot_desuperheater_untreated_bfw_id:['3.OOT to open desuperheater Untreated BFW manual block valves (DB&B) when the COT is &gt; 450 ºC.'],
     
      // oot_cbd_id:['5.When steam drum pressure is above 90 kg/cm2g:OOT to confirm that the sTLE blowdown to CBD header is lined up.'],
     
     
      shift_id_e_oot:[''],
      shift_id_e_iot:[''],

      oot_lower_level_burner: [null,Validators.required],
      iot_monitor_the_fuel_gas:[null,Validators.required],
      oot_desuperheater:[null,Validators.required],
      iot_desuperheater_not_pass:[null,Validators.required],
      oot_lineup_sd:[null,Validators.required],
      oot_cbd:[null,Validators.required],
      oot_confirm_cooling_water:[null,Validators.required],
      oot_stle_blowdown_analyzer:[null,Validators.required],
      oot_desuperheater_untreated_bfw:[null,Validators.required],
      iot_to_enable_sd:[null,Validators.required],
      psv_evt_start:[null,Validators.required],
      psv_evt_complete:[null,Validators.required],
      ootIOT_decoke_air:[null,Validators.required],
      furnace_sequence_to_swing_mov:[null,Validators.required],
      furnace_sequence_to_swing_mov_comment:[null],
      ootIOT_decoke_air_comment:[null],
      psv_evt_complete_comment:[null],
      psv_evt_start_comment:[null],
      iot_to_enable_sd_comment:[null],
      oot_desuperheater_untreated_bfw_comment:[null],
      oot_stle_blowdown_analyzer_comment:[null],
      oot_confirm_cooling_water_comment:[null],
      oot_cbd_comment:[null],
      oot_lineup_sd_comment:[null],
      iot_desuperheater_not_pass_comment:[null],
      oot_desuperheater_comment:[null],
      iot_monitor_the_fuel_gas_comment:[null],
      oot_lower_level_burner_comment:[null],

      furnace_sequence_to_swing_mov_comment_status:[null],
      ootIOT_decoke_air_comment_status:[null],
      psv_evt_complete_comment_status:[null],
      psv_evt_start_comment_status:[null],
      iot_to_enable_sd_comment_status:[null],
      oot_desuperheater_untreated_bfw_comment_status:[null],
      oot_stle_blowdown_analyzer_comment_status:[null],
      oot_confirm_cooling_water_comment_status:[null],
      oot_cbd_comment_status:[null],
      oot_lineup_sd_comment_status:[null],
      iot_desuperheater_not_pass_comment_status:[null],
      oot_desuperheater_comment_status:[null],
      iot_monitor_the_fuel_gas_comment_status:[null],
      oot_lower_level_burner_comment_status:[null],


      shift_comment_e_oot:[null],
      shift_comment_e_iot:[null],
      userid:[this.currentUser.id],
      id:[this.id],
      master_id:[1],
    });
  }
  
  patchvalue(){
    console.log('patchvalue() called');
    this.ChecklistE.patchValue({
      oot_lower_level_burner_comment:this.concatenateValues(this.ChecklistE.get('oot_lower_level_burner_id')?.value,this.ChecklistE.get('oot_lower_level_burner_comment')?.value ),
      iot_monitor_the_fuel_gas_comment:this.concatenateValues(this.ChecklistE.get('iot_monitor_the_fuel_gas_id')?.value,this.ChecklistE.get('iot_monitor_the_fuel_gas_comment')?.value ),
      furnace_sequence_to_swing_mov_comment:this.concatenateValues(this.ChecklistE.get('furnace_sequence_to_swing_mov_id')?.value,this.ChecklistE.get('furnace_sequence_to_swing_mov_comment')?.value ),
      ootIOT_decoke_air_comment:this.concatenateValues(this.ChecklistE.get('ootIOT_decoke_air_id')?.value,this.ChecklistE.get('ootIOT_decoke_air_comment')?.value ),
      psv_evt_complete_comment:this.concatenateValues(this.ChecklistE.get('psv_evt_complete_id')?.value,this.ChecklistE.get('psv_evt_complete_comment')?.value ),
      psv_evt_start_comment:this.concatenateValues(this.ChecklistE.get('psv_evt_start_id')?.value,this.ChecklistE.get('psv_evt_start_comment')?.value ),
      iot_to_enable_sd_comment:this.concatenateValues(this.ChecklistE.get('iot_to_enable_sd_id')?.value,this.ChecklistE.get('iot_to_enable_sd_comment')?.value ),
      oot_desuperheater_untreated_bfw_comment:this.concatenateValues(this.ChecklistE.get('oot_desuperheater_untreated_bfw_id')?.value,this.ChecklistE.get('oot_desuperheater_untreated_bfw_comment')?.value ),
      oot_stle_blowdown_analyzer_comment:this.concatenateValues(this.ChecklistE.get('oot_stle_blowdown_analyzer_id')?.value,this.ChecklistE.get('oot_stle_blowdown_analyzer_comment')?.value ),
      oot_confirm_cooling_water_comment:this.concatenateValues(this.ChecklistE.get('oot_confirm_cooling_water_id')?.value,this.ChecklistE.get('oot_confirm_cooling_water_comment')?.value ),
      oot_cbd_comment:this.concatenateValues(this.ChecklistE.get('oot_cbd_id')?.value,this.ChecklistE.get('oot_cbd_comment')?.value ),
      oot_lineup_sd_comment:this.concatenateValues(this.ChecklistE.get('oot_lineup_sd_id')?.value,this.ChecklistE.get('oot_lineup_sd_comment')?.value ),
      iot_desuperheater_not_pass_comment:this.concatenateValues(this.ChecklistE.get('iot_desuperheater_not_pass_id')?.value,this.ChecklistE.get('iot_desuperheater_not_pass_comment')?.value ),
      oot_desuperheater_comment:this.concatenateValues(this.ChecklistE.get('oot_desuperheater_id')?.value,this.ChecklistE.get('oot_desuperheater_comment')?.value ),
    
    });
    console.log( this.ChecklistE)
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
    }, 5* 1000); // 2 minutes in milliseconds
  }

  onSubmit() {
    const permitFormValue = this.ChecklistE.value;
    console.log('Form Data:', permitFormValue);
    this.addSubscription = this.apiService.createchecklistE(permitFormValue).subscribe(
        (response) => {
          this.id=response.result.id
            console.log('Response from server:', response);
        },
        (error) => {
            console.error('Error while sending data:', error);
        }
    );
}
add() {
  this.apiService.getchecklistE().subscribe((response: any) => {
    if (response && response.result) { // Check if response and response.result are not null or undefined
      this.remainingValues = response.result;
      this.formdisable = response.result.status === "Complete" ? true : false;
      Object.keys(this.remainingValues).forEach(key => {
        if (key !== 'shift_comment_e_oot' && key !== 'shift_comment_e_iot') {
          this.ChecklistE.get(key)?.patchValue(this.remainingValues[key]);
        }
      });
    } else {
      console.log("Response or response.result is null or undefined.");
      // Handle the error or notify the user accordingly
    }
    this.ChecklistE.get('furnace_sequence_to_swing_mov_comment')?.setValue(this.ChecklistE.get('furnace_sequence_to_swing_mov_comment')?.value ? this.ChecklistE.get('furnace_sequence_to_swing_mov_comment')?.value.split("||")[1].trim() : null);

    this.ChecklistE.get('ootIOT_decoke_air_comment')?.setValue(this.ChecklistE.get('ootIOT_decoke_air_comment')?.value ? this.ChecklistE.get('ootIOT_decoke_air_comment')?.value.split("||")[1].trim() : null);

    this.ChecklistE.get('psv_evt_complete_comment')?.setValue(this.ChecklistE.get('psv_evt_complete_comment')?.value ? this.ChecklistE.get('psv_evt_complete_comment')?.value.split("||")[1].trim() : null);

    this.ChecklistE.get('psv_evt_start_comment')?.setValue(this.ChecklistE.get('psv_evt_start_comment')?.value ? this.ChecklistE.get('psv_evt_start_comment')?.value.split("||")[1].trim() : null);

    this.ChecklistE.get('iot_to_enable_sd_comment')?.setValue(this.ChecklistE.get('iot_to_enable_sd_comment')?.value ? this.ChecklistE.get('iot_to_enable_sd_comment')?.value.split("||")[1].trim() : null);

    this.ChecklistE.get('oot_desuperheater_untreated_bfw_comment')?.setValue(this.ChecklistE.get('oot_desuperheater_untreated_bfw_comment')?.value ? this.ChecklistE.get('oot_desuperheater_untreated_bfw_comment')?.value.split("||")[1].trim() : null);

    this.ChecklistE.get('oot_stle_blowdown_analyzer_comment')?.setValue(this.ChecklistE.get('oot_stle_blowdown_analyzer_comment')?.value ? this.ChecklistE.get('oot_stle_blowdown_analyzer_comment')?.value.split("||")[1].trim() : null);

    this.ChecklistE.get('oot_confirm_cooling_water_comment')?.setValue(this.ChecklistE.get('oot_confirm_cooling_water_comment')?.value ? this.ChecklistE.get('oot_confirm_cooling_water_comment')?.value.split("||")[1].trim() : null);

    this.ChecklistE.get('oot_cbd_comment')?.setValue(this.ChecklistE.get('oot_cbd_comment')?.value ? this.ChecklistE.get('oot_cbd_comment')?.value.split("||")[1].trim() : null);

    this.ChecklistE.get('oot_lineup_sd_comment')?.setValue(this.ChecklistE.get('oot_lineup_sd_comment')?.value ? this.ChecklistE.get('oot_lineup_sd_comment')?.value.split("||")[1].trim() : null);

    this.ChecklistE.get('iot_desuperheater_not_pass_comment')?.setValue(this.ChecklistE.get('iot_desuperheater_not_pass_comment')?.value ? this.ChecklistE.get('iot_desuperheater_not_pass_comment')?.value.split("||")[1].trim() : null);

    this.ChecklistE.get('oot_desuperheater_comment')?.setValue(this.ChecklistE.get('oot_desuperheater_comment')?.value ? this.ChecklistE.get('oot_desuperheater_comment')?.value.split("||")[1].trim() : null);

    this.ChecklistE.get('iot_monitor_the_fuel_gas_comment')?.setValue(this.ChecklistE.get('iot_monitor_the_fuel_gas_comment')?.value ? this.ChecklistE.get('iot_monitor_the_fuel_gas_comment')?.value.split("||")[1].trim() : null);

    this.ChecklistE.get('oot_lower_level_burner_comment')?.setValue(this.ChecklistE.get('oot_lower_level_burner_comment')?.value ? this.ChecklistE.get('oot_lower_level_burner_comment')?.value.split("||")[1].trim() : null);



    // if (response && response.result) {
    //   this.skipcolor = response.result;
      
   
    
    //   Object.entries(this.skipcolor).forEach(([key, value]) => {
    //     if (value === 'accept'|| value==='reject') {
    //         this.colour = (key);
    //         this.clrvalue=(value)
    //     }
    // });
    
    //   console.log(this.colour);
    // } else {
    //   console.log("Response or response.result is null or undefined.");
    //   // Handle the error or notify the user accordingly
    // }
    
  });
}


  nxtAccEn(){
    this.checklistfformenable=false;
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
  // this.ChecklistE.get('shift_comment_e_oot')?.setValue(this.remainingValues.shift_comment_e_oot);
  // this.ChecklistE.get('shift_comment_e_iot')?.setValue(this.remainingValues.shift_comment_e_iot);
  const formData = this.ChecklistE.value;
  console.log('formData: ', formData);
  this.apiService.updatePermitData(formData).subscribe(
    (response) => {
      // Assuming 'permitForm' is a FormGroup
      //this.aceptreject=response.result
      this.ChecklistE.get('shift_comment_e_oot')?.setValue(null);
      this.ChecklistE.get('shift_comment_e_iot')?.setValue(null);
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
// AcceptReject() {
//   this.apiService.getnotification().subscribe((response: any) => {
 
//  console.log('response.result: ', response.result);
    
//   });
// }
clearTextarea(){
  this.ChecklistE.get('shift_comment_e_oot')?.setValue(null);
  this.ChecklistE.get('shift_comment_e_iot')?.setValue(null);
}
}