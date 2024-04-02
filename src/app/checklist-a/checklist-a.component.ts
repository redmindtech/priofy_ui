import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
      pressure_BFW: [null],
      decoke_MOV: [null],
      furnace_control: [null],
      bm_sequence: [null],
      auto_burner: [null],
      gas_isolated: [null],
      hbf_inlet: [null],
      fv_downstream: [null],
      fv_bypass: [null],
      eco_inlet: [null],
      eco_outlet: [null],
      inlet_check_valve: [null],
      inlet_DB: [null],
      inlet_check: [null],
      hpssh: [null],
      hxs_upstream: [null],
      vent_upstream: [null],
      vent_downstream: [null],
      hxs_outlet: [null],
      transmitters: [null],
      intermittent: [null],
      bd_header: [null],
      secondary_tle: [null],
      intermittent_db: [null],
      primary_tles: [null],
      secondary_blow: [null],
      primary_common: [null],
      bm_Control: [null],
      bms_Moved: [null],
      drum_BFW: [null],
      furnace_battery: [null],
      up_down: [null],
      globe_valve: [null],
      steam_drum: [null],
      hxs_vent: [null],
      bypass_valves: [null],
      pv_22X043: [null],
      userid: [1],
    });
  }

  setupSubmitInterval() {
    this.onSubmitInterval = setInterval(() => {
      console.log('onSubmitInterval: ', this.onSubmitInterval);
      this.add();
    }, 15 * 1000); // 2 minutes in milliseconds
  }

  onSubmit() {
    if (this.ChecklistA.valid) {
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
    } else {
      console.error('Form is invalid. Please fill all required fields.');
    }
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
