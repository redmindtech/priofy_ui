import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChecklistEService } from '@app/utils/service/checklist-e.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-checklist-e',
  templateUrl: './checklist-e.component.html',
  styleUrls: ['./checklist-e.component.css']
})
export class ChecklistEComponent implements OnInit {
  ChecklistE!: FormGroup;
  private onSubmitInterval: any;
  private addSubscription: Subscription | undefined;
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ChecklistEService
  ) { }

  ngOnInit(): void {
    this.formInitialization();
    this.setupSubmitInterval();
  }
  formInitialization() {
    this.ChecklistE = this.formBuilder.group({
      OOT_lower_level_burner: [null,Validators.required],
      IOT_monitor_the_fuel_gas:[null,Validators.required],
      OOT_desuperheater:[null,Validators.required],
      IOT_desuperheater_not_pass:[null,Validators.required],
      OOT_line_up_sd:[null,Validators.required],
      OOT_CBD:[null,Validators.required],
      OOT_confirm_cooling_water:[null,Validators.required],
      OOT_sTLE_blowdown_analyzer:[null,Validators.required],
      OOT_desuperheater_untreated_BFW:[null,Validators.required],
      IOT_to_enable_sd:[null,Validators.required],
      PSV_EVT_start:[null,Validators.required],
      PSV_EVT_complete:[null,Validators.required],
      OOTIOT_Decoke_Air:[null,Validators.required],
      Furnace_sequence_to_Swing_MOV:[null,Validators.required],
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
    if (this.ChecklistE.valid) {
      const permitFormValue = this.ChecklistE.value;
      console.log('Form Data:', permitFormValue);
      this.addSubscription = this.apiService.createchecklistE(permitFormValue).subscribe(
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
    this.apiService.getchecklistE().subscribe((response: any) => {
      console.log(response, 'checking');
      this.ChecklistE.patchValue(response.result);
    });
  }
}
