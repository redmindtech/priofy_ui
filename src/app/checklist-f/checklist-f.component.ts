import { Component,Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChecklistFService } from '@app/utils/service/checklist-f.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { OpendialogcompleteComponent } from '@app/opendialogcomplete/opendialogcomplete.component';
import { Router } from '@angular/router';



@Component({
  selector: 'app-checklist-f',
  templateUrl: './checklist-f.component.html',
  styleUrls: ['./checklist-f.component.css']
})
export class ChecklistFComponent implements OnInit {
  @Input() checklistfformenable: boolean;
  open1:boolean;
  @Input() expand: boolean;
  ChecklistF: FormGroup;

  private onSubmitInterval: any;
  private addSubscription: Subscription | undefined;
  currentUser: any;
  disableIO: any;
  id :any;
  remainingValues: any;
  enable: boolean = false;

  skipcolor: any;
  colour:string = 'null'; 
  clrvalue: string='null';

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ChecklistFService,public dialog: MatDialog,private router: Router
  ) { }

  ngOnInit(): void {
    const storedUser = localStorage.getItem('currentUser');
 this.currentUser = storedUser ? JSON.parse(storedUser) : null;
    console.log(' this.currentUser: ',  this.currentUser.position);
  this.disableIO=this.currentUser.position;
    this.formInitialization();
    this.setupSubmitInterval();

  }
  openDialog(): void {
    const dialogRef = this.dialog.open(OpendialogcompleteComponent, {
      width: '400px', 
      height: '300px',
    });
  
    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      dialogRef.close();
      this.router.navigate(['main/home']);
    });
  }
 
  
  ngOnDestroy(): void {
    clearInterval(this.onSubmitInterval);
    if (this.addSubscription) {
      this.addSubscription.unsubscribe();
    }
  }
  formInitialization() {
    this.ChecklistF = this.formBuilder.group({
      iot_move_furnace_sequence_to_Swing_id:['1.IOT to move furnace sequence to Swing MOV step, if not done before.'],
      iot_to_confirm_id:['2.IOT to confirm that HV-22X0-02 (purge steam to ethane feed line(FV-22X0-14 A/B are open) opens to 100% automatically.)'],
      oot_ALL_BV_of_LS_steam_id:['3.OOT to ensure that ALL B/V of LS steam to PTs and MOVs are lined up.<br>Note: automated valve to CG MOV intermediate PT will not be auto enabled until 2 seconds after feed EBV is opened and will stay open for 120 seconds after the feed EBV closes.'],
      oot_flare_block_id:['4.OOT to confirm that both B/V of the CG MOVs purge steam lines drain valves and the flare block and bleed valves are closed.'],
     
      oot_IOT_Decoke_Air_id: ['5.OOT&IOT to reconfirm that Decoke Air is blinded.'],
      oot_feed_DB_B_id: ['6.OOT to confirm that ethane feed DB&B are closed.'],
      iot_MOVs_status_id: ['7.IOT to confirm that ALL MOVs status signal are ok.'],
      oot_MOVs_local_switches_id: ['8.OOT to check and confirm that all the MOV’s local switches are in “auto” position.'],
      oot_furnace_is_clear_id: ['9.OOT to ensure the furnace is clear of all personnel before the MOV swing starts.'],
      iot_Operator_Permissives_id: ['10.IOT to initiate the MOV swing via HMI by selecting “Operator Permissives to Swing to CG header”.<br>Note: First make sure to manually RESET the BM & BNR alarms (unlatch).'],
      iot_second_CG_MOV_id: ['11.IOT to confirm that second CG MOV fully opens (HV-22X6-13B).'],
      iot_Decoke_MOV_id: ['12.IOT to confirm that Decoke MOV (HV-22X6-14) begins to close after second CG MOV has opened.<br>Note: it will close to approximately 50% without ramp or until the pressure reach the higher-pressure set point (set point for closing MOV).'],
      iot_higher_pressure_id: ['13.IOT to confirm that Decoke MOV continues closing by delayed pulses to achieve the higher-pressure set point (set point for closing MOV).'],
      iot_lower_pressure_id: ['14.IOT to confirm that primary CG MOV (HV-22X6-13A) opens by delayed pulses to achieve the lower pressure set point (set point for opening MOV).'],
      iot_decoke_MOV_closed_id: ['15.IOT to confirm that MOVs continue to open/close until the Decoke MOV is fully closed.'],
      iot_confirm_via_HMI_id: ['16.IOT to confirm via HMI that the Decoke MOV is fully closed after OOT confirms this in the field.<br>Note: this confirmation allows the IOT to open out primary CG MOV to fully open without delay pulses.'],
      iot_HSSB_Crack_Gas_step_id: ['17.IOT to move the furnace sequence to HSSB Crack Gas step after the CG MOV is fully open.'],
      adjust_combustion_id: ['18.If COT increase, follow the below step:Adjust combustion air flow.'],
      the_top_burners_id: ['18.If COT increase, follow the below step:A Cut some of the top burners if fuel gas pressure reaches 0.2 kg/cm2.'],
      increase_IBD_CBD_id: ['18.If COT increase, follow the below step:Increase IBD/ CBD.'],
      continue_with_Furnace_id: ['19.Continue with Furnace, Feed In procedure.'],
      

      iot_move_furnace_sequence_to_Swing: [null,Validators.required],
      iot_to_confirm:  [null,Validators.required],
      oot_ALL_BV_of_LS_steam:  [null,Validators.required],
      oot_flare_block: [null,Validators.required],
      oot_IOT_Decoke_Air: [null,Validators.required],
      oot_feed_DB_B: [null,Validators.required],
      iot_MOVs_status: [null,Validators.required],
      oot_MOVs_local_switches: [null,Validators.required],
      oot_furnace_is_clear: [null,Validators.required],
      iot_Operator_Permissives: [null,Validators.required],
      iot_second_CG_MOV: [null,Validators.required],
      iot_Decoke_MOV: [null,Validators.required],
      iot_higher_pressure: [null,Validators.required],
      iot_lower_pressure: [null,Validators.required],
      iot_decoke_MOV_closed: [null,Validators.required],
      iot_confirm_via_HMI: [null,Validators.required],
      iot_HSSB_Crack_Gas_step: [null,Validators.required],
      adjust_combustion: [null,Validators.required],
      the_top_burners: [null,Validators.required],
      increase_IBD_CBD: [null,Validators.required],
      continue_with_Furnace: [null,Validators.required],
      userid:[this.currentUser.id],
      master_id:[1],
      id:[this.id],
      iot_move_furnace_sequence_to_Swing_comment: [null],
      iot_to_confirm_comment:  [null],
      oot_ALL_BV_of_LS_steam_comment:  [null],
      oot_flare_block_comment: [null],
      oot_IOT_Decoke_Air_comment: [null],
      oot_feed_DB_B_comment: [null],
      iot_MOVs_status_comment: [null],
      oot_MOVs_local_switches_comment: [null],
      oot_furnace_is_clear_comment: [null],
      iot_Operator_Permissives_comment: [null],
      iot_second_CG_MOV_comment: [null],
      iot_Decoke_MOV_comment: [null],
      iot_higher_pressure_comment: [null],
      iot_lower_pressure_comment: [null],
      iot_decoke_MOV_closed_comment: [null],
      iot_confirm_via_HMI_comment: [null],
      iot_HSSB_Crack_Gas_step_comment: [null],
      adjust_combustion_comment: [null],
      the_top_burners_comment: [null],
      increase_IBD_CBD_comment: [null],
      continue_with_Furnace_comment: [null],
      shift_comment_f_iot:[null],
      shift_comment_f_oot:[null]
    });
  }


  patchvalue(){
    console.log('patchvalue() called');
    this.ChecklistF.patchValue({
      iot_move_furnace_sequence_to_Swing_com: this.concatenateValues(this.ChecklistF.get('iot_move_furnace_sequence_to_Swing_id')?.value,this.ChecklistF.get('oot_high_pressure_comment')?.value ),
      iot_to_confirm_comment:  this.concatenateValues(this.ChecklistF.get('iot_to_confirm_id')?.value,this.ChecklistF.get('iot_to_confirm_comment')?.value ),
      oot_ALL_BV_of_LS_steam_comment:  this.concatenateValues(this.ChecklistF.get('oot_ALL_BV_of_LS_steam_id')?.value,this.ChecklistF.get('oot_ALL_BV_of_LS_steam_comment')?.value ),
      oot_flare_block_comment: this.concatenateValues(this.ChecklistF.get('oot_ALL_BV_of_LS_steam_id')?.value,this.ChecklistF.get('oot_ALL_BV_of_LS_steam_comment')?.value ),
      oot_IOT_Decoke_Air_comment: this.concatenateValues(this.ChecklistF.get('oot_IOT_Decoke_Air_id')?.value,this.ChecklistF.get('oot_IOT_Decoke_Air_comment')?.value ),

      oot_feed_DB_B_comment: this.concatenateValues(this.ChecklistF.get('oot_feed_DB_B_id')?.value,this.ChecklistF.get('oot_feed_DB_B_comment')?.value ),
      iot_MOVs_status_comment: this.concatenateValues(this.ChecklistF.get('iot_MOVs_status_id')?.value,this.ChecklistF.get('iot_MOVs_status_comment')?.value ),
      oot_MOVs_local_switches_comment: this.concatenateValues(this.ChecklistF.get('oot_MOVs_local_switches_id')?.value,this.ChecklistF.get('oot_MOVs_local_switches_comment')?.value ),
      oot_furnace_is_clear_comment: this.concatenateValues(this.ChecklistF.get('oot_furnace_is_clear_id')?.value,this.ChecklistF.get('oot_furnace_is_clear_comment')?.value ),
      iot_Operator_Permissives_comment: this.concatenateValues(this.ChecklistF.get('iot_Operator_Permissives_id')?.value,this.ChecklistF.get('iot_Operator_Permissives_comment')?.value ),
      iot_second_CG_MOV_comment: this.concatenateValues(this.ChecklistF.get('iot_second_CG_MOV_id')?.value,this.ChecklistF.get('iot_second_CG_MOV_comment')?.value ),
      iot_Decoke_MOV_comment: this.concatenateValues(this.ChecklistF.get('iot_Decoke_MOV_id')?.value,this.ChecklistF.get('iot_Decoke_MOV_comment')?.value ),
      iot_higher_pressure_comment: this.concatenateValues(this.ChecklistF.get('iot_higher_pressure_id')?.value,this.ChecklistF.get('iot_higher_pressure_comment')?.value ),
      iot_lower_pressure_comment: this.concatenateValues(this.ChecklistF.get('iot_lower_pressure_id')?.value,this.ChecklistF.get('iot_lower_pressure_comment')?.value ),
      iot_decoke_MOV_closed_comment: this.concatenateValues(this.ChecklistF.get('iot_decoke_MOV_closed_id')?.value,this.ChecklistF.get('iot_decoke_MOV_closed_comment')?.value ),
      iot_confirm_via_HMI_comment: this.concatenateValues(this.ChecklistF.get('iot_confirm_via_HMI_id')?.value,this.ChecklistF.get('iot_confirm_via_HMI_comment')?.value ),
      iot_HSSB_Crack_Gas_step_comment: this.concatenateValues(this.ChecklistF.get('iot_HSSB_Crack_Gas_step_id')?.value,this.ChecklistF.get('iot_HSSB_Crack_Gas_step_comment')?.value ),
      adjust_combustion_comment: this.concatenateValues(this.ChecklistF.get('adjust_combustion_id')?.value,this.ChecklistF.get('adjust_combustion_comment')?.value ),
      the_top_burners_comment: this.concatenateValues(this.ChecklistF.get('the_top_burners_id')?.value,this.ChecklistF.get('the_top_burners_comment')?.value ),
      increase_IBD_CBD_comment: this.concatenateValues(this.ChecklistF.get('increase_IBD_CBD_id')?.value,this.ChecklistF.get('increase_IBD_CBD_comment')?.value ),
      continue_with_Furnace_comment: this.concatenateValues(this.ChecklistF.get('continue_with_Furnace_id')?.value,this.ChecklistF.get('continue_with_Furnace_comment')?.value ),
     

    
    });
    console.log( this.ChecklistF)
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

      const permitFormValue = this.ChecklistF.value;
      console.log('Form Data:', permitFormValue);
      this.addSubscription = this.apiService.createchecklistF(permitFormValue).subscribe(
        (response) => {
          this.id=response.result.id
          console.log(response.result.id)
          console.log('Response from server:', response);

        },
        (error) => {
          console.error('Error while sending data:', error);
        }
      );


  }
  add() {
    this.apiService.getchecklistF().subscribe((response: any) => {
      if (response && response.result) { // Check if response and response.result are not null or undefined
        this.remainingValues = response.result;
        console.log(  this.remainingValues.id)

        this.ChecklistF.patchValue(response.result);
        Object.keys(this.remainingValues).forEach(key => {
          if (key !== 'shift_comment_f_oot' && key !== 'shift_comment_f_iot') {
            this.ChecklistF.get(key)?.patchValue(this.remainingValues[key]);
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
  this.ChecklistF.get('id')?.value(this.id)
  // this.ChecklistF.get('shift_comment_f_oot')?.setValue(this.remainingValues.shift_comment_f_oot);
  //     this.ChecklistF.get('shift_comment_f_iot')?.setValue(this.remainingValues.shift_comment_f_iot);
  console.log(this.id)
  console.log(this.id)

  const formData = this.ChecklistF.value;
  console.log('formData: ', formData);
  this.apiService.updatePermitData(formData).subscribe(
    (response) => {
      // Assuming 'permitForm' is a FormGroup
      this.ChecklistF.get('shift_comment_f_oot')?.setValue(null);
      this.ChecklistF.get('shift_comment_f_iot')?.setValue(null);

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
