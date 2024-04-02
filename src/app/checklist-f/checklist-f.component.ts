import { Component,Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChecklistFService } from '@app/utils/service/checklist-f.service';
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
  currentUser: any;
  disableIO: any;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ChecklistFService
  ) { }

  ngOnInit(): void {
    const storedUser = localStorage.getItem('currentUser');
 this.currentUser = storedUser ? JSON.parse(storedUser) : null;
    console.log(' this.currentUser: ',  this.currentUser.position);
  this.disableIO=this.currentUser.position;
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
      IOT_to_confirm:  [null,Validators.required],
      oot_ALL_BV_of_LS_steam:  [null,Validators.required],
      OOT_flare_block: [null,Validators.required],
      OOT_IOT_Decoke_Air: [null,Validators.required],
      OOT_feed_DB_B: [null,Validators.required],
      iot_MOVs_status: [null,Validators.required],
      oot_MOVs_local_switches: [null,Validators.required],
      oot_furnace_is_clear: [null,Validators.required],
      iot_Operator_Permissives: [null,Validators.required],
      IOT_second_CG_MOV: [null,Validators.required],
      iot_Decoke_MOV: [null,Validators.required],
      iot_higher_pressure: [null,Validators.required],
      IOT_lower_pressure: [null,Validators.required],
      iot_decoke_MOV_closed: [null,Validators.required],
      IOT_confirm_via_HMI: [null,Validators.required],
      iot_HSSB_Crack_Gas_step: [null,Validators.required],
      Adjust_combustion: [null,Validators.required],
      the_top_burners: [null,Validators.required],
      Increase_IBD_CBD: [null,Validators.required],
      Continue_with_Furnace: [null,Validators.required],
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
      this.addSubscription = this.apiService.createchecklistF(permitFormValue).subscribe(
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
    this.apiService.getchecklistF().subscribe((response: any) => {
      console.log(response, 'checking');
      this.ChecklistF.patchValue(response.result);
    });
  }

}
