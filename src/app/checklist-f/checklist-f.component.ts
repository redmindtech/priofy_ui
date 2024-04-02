import { Component,Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ChecklistAService } from '@app/utils/service/checklist-a.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-checklist-f',
  templateUrl: './checklist-f.component.html',
  styleUrls: ['./checklist-f.component.css']
})
export class ChecklistFComponent implements OnInit {

  
  ChecklistF: FormGroup;
  currentDate: string;
  currenttime: string;
  private onSubmitInterval: any;
  private addSubscription: Subscription | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ChecklistAService
  ) { }

  ngOnInit(): void {
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
    this.ChecklistF = this.formBuilder.group({
      iot_move_furnace_sequence_to_Swing: [null],
      IOT_to_confirm: [null],
      oot_ALL_BV_of_LS_steam: [null],
      OOT_flare_block:[null],
      OOT_IOT_Decoke_Air:[null],
      OOT_feed_DB_B:[null],
      iot_MOVs_status:[null],
      oot_MOVs_local_switches:[null],
      oot_furnace_is_clear:[null],
      iot_Operator_Permissives:[null],
      IOT_second_CG_MOV:[null],
      iot_Decoke_MOV:[null],
      iot_higher_pressure:[null],
      IOT_lower_pressure:[null],
      iot_decoke_MOV_closed:[null],
      IOT_confirm_via_HMI:[null],
      iot_HSSB_Crack_Gas_step:[null],
      Adjust_combustion:[null],
      the_top_burners:[null],
      Increase_IBD_CBD:[null],
      Continue_with_Furnace:[null],
       userid:[1]
    });
  }

  setupSubmitInterval() {
    this.onSubmitInterval = setInterval(() => {
      console.log('onSubmitInterval: ', this.onSubmitInterval);
      this.add();
    }, 15* 1000); // 2 minutes in milliseconds
  }

  onSubmit() {
    if (this.ChecklistF.valid) {
      const permitFormValue = this.ChecklistF.value;
      console.log('Form Data:', permitFormValue);
      this.addSubscription = this.apiService.createchecklistA(permitFormValue).subscribe(
        (response) => {
          console.log('Response from server:', response);
         
        },
        (error) => {
          console.error('Error while sending data:', error);
        }
      );
    } else {
      
      console.error('Form is invalid. Please fill all required fields.');
    }
    
  }
  add() {
    this.apiService.getchecklist().subscribe((response: any) => {
      console.log(response, 'checking');
      this.ChecklistF.patchValue(response.result);
    });
  }

}
