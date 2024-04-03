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
      pressure_BFW: [null,Validators.required],
      decoke_MOV: [null,Validators.required],
      furnace_control: [null,Validators.required],
      bm_sequence:[null,Validators.required],
      auto_burner: [null,Validators.required],
      gas_isolated: [null,Validators.required],
      hbf_inlet: [null,Validators.required],
      fv_downstream: [null,Validators.required],
      fv_bypass: [null,Validators.required],
      eco_inlet:[null,Validators.required],
      eco_outlet: [null,Validators.required],
      inlet_check_valve: [null,Validators.required],
      inlet_DB: [null,Validators.required],
      inlet_check: [null,Validators.required],
      hpssh: [null,Validators.required],
      hxs_upstream: [null,Validators.required],
      vent_upstream: [null,Validators.required],
      vent_downstream: [null,Validators.required],
      hxs_outlet: [null,Validators.required],
      transmitters: [null,Validators.required],
      intermittent: [null,Validators.required],
      bd_header: [null,Validators.required],
      secondary_tle: [null,Validators.required],
      intermittent_db: [null,Validators.required],
      primary_tles: [null,Validators.required],
      secondary_blow: [null,Validators.required],
      primary_common: [null,Validators.required],
      bm_Control: [null,Validators.required],
      bms_Moved:[null,Validators.required],
      drum_BFW: [null,Validators.required],
      furnace_battery: [null,Validators.required],
      up_down: [null,Validators.required],
      globe_valve:[null,Validators.required],
      steam_drum: [null,Validators.required],
      hxs_vent: [null,Validators.required],
      bypass_valves:[null,Validators.required],
      pv_22X043: [null,Validators.required],
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
