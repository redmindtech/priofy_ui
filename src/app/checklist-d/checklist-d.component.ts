import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChecklistDService } from '@app/utils/service/checklist-d.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-checklist-d',
  templateUrl: './checklist-d.component.html',
  styleUrls: ['./checklist-d.component.css']
})
export class ChecklistDComponent implements OnInit {
  @Input() checklistdformenable: boolean;
  checklisteformenable: boolean = true;
  open1:boolean;
  @Input() expand: boolean;
  ChecklistD:FormGroup
  userDetails: any;
  userObject: any;
  position: any;
  disableiot: any;
  disableoot: any;
  skipcolor: any;
  formid: any;
  formdisable:boolean;
  colour:string = 'null';
  clrvalue: string='null';
  private onSubmitInterval: any;
  private addSubscription: Subscription | undefined;
  currentUser: any;
  enable: boolean = false;
  aceptreject:string = 'null';
  id:any;

  remainingValues: any;
  constructor(private fb: FormBuilder,
    private apiService:ChecklistDService,
    private router: Router,
    private toast: MatSnackBar,
    ){}

    ngOnInit(): void {
    //   this.userDetails = localStorage.getItem('currentUser');
    //   this.currentUser = storedUser ? JSON.parse(storedUser) : null;
    // this.userObject = JSON.parse(this.userDetails);
    // this.position = this.userObject.position;
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
  this.setupSubmitInterval()
  }
  ngOnDestroy(): void {
    clearInterval(this.onSubmitInterval);
    if (this.addSubscription) {
      this.addSubscription.unsubscribe();
    }
  }
  formInitialization(){


    this.ChecklistD = this.fb.group({

      iot_arch_temperature_id:['1.Has IOTs confirm that “arch temperature” warm up ramp set point is 0.83 ºC/min (equivalent to 50 ºC/hr or to increase 200 ºC/hr in 4 hours) and that all fuel controllers are properly enabled and in the correct mode/mode attribute. '],
      oot_air_ONIS_blind_id:['2.OOT to open decoke air ONIS blind and 6” main B/V'],
      oot_to_open4_id:['3.COOT to open 4” decoke air B/V downstream each control valve FV-22X0-10A/B. '],
      iot_start_decoke_id:['4.Note: IOT to inform Utility before start decoke airflow IOT to enable Decoke Air controllers and start flow through the coils at the default set point of 3.0 Mt/h per pass (side) by resetting HV-22X0-07 through its HS.'],
      oot_fuel_gas_id:['5.OOT to light manual burners as requested by IOT (to maintain fuel gas pressure between 0.2 to 0.4 kg/cm2g) and by following Furnace, Burner Light off procedure.step1:Note 1: fuel gas pressure needs to be maintained as low as possible to keep the flame close to the tile when steam enters the firebox, in order to allow the scanner to see the flame.'],
      oot_burner_light_off_id:['Step2:burner light off sequence attached in Appendix A must be followed. '],
      oot_add_burners_id:['Step3:“add burners” alarm set point is 0.5 kg/cm2g (stops the ramp) and “cut burners” alarm is 0.2 kg/cm2g. Low-pressure constraint controller set point is 0.15 kg/cm2g. '],
      air_registers_3Notches_id:['6.When 10 burners are lit the air registers of the lit burners should now be opened to 3 notches. '],
      burners_20_id:['7.When around 20 burners are lit all the lit burners air registers  should be opened out to 100%.'],
      iot_to_request_OOT_id:['8.IOT to request OOT to close the 3” steam drum start up vents when the steam drum pressure is 5 kg/cm2g. '],
      iot_COTs_rising_id:['9.Step1:*Checking that all COTs are rising at about the same rate.'],
      iot_venturi_Ratios_id:['Step2:*Checking that all Venturi Ratios are about the same value.'],
      iot_suspect_coils_id:['10.IOT to clear pluggage from suspect coils by increasing the air flow (max. 3.6 Mt/h) on that side of the furnace. '],
      oot_Start_warm_MS_steam_id:['11.Keep ¾” bleed cracked open until the line is warm (dry steam coming from the drain).'],
      oot_spool_piece_id:['12.OOT to drain spool piece between 8” B/V and HV-22X0-06 to pad and then line up steam trap to MC header.Keep ¾” bleed cracked open until the line is warm (dry steam coming from the drain). '],
      oot_open_MS_EBV_id:['13.OOT to open MS EBV, HV-22X0-06. '],
      oot_topen_MS_steam8_id:['14.Once condensate has been drained OOT to open MS steam 8” B/V. '],
      iot_both_steam_id:['15.IOT to make sure that both steam control valves FV-22X0-22A/B remain closed. '],
      oot_steam_lines_up_id:['16.OOT to warm up the steam lines up to steam control valves Step1:*Keep ¾” bleed upstream each FV and ¾” bleed upstream 10” spectable blind cracked open until the lines are warm (dry steam coming from the drain).FV-22X0-22A/B. '],
      oot_dilution_steam_id:['17.OOT to drain the Dilution Steam to FPH Outlet lines (Pass 1&2) by opening the ¾” bleed downstream each FV. Keep ¾” bleed cracked open until the lines are warm (dry steam coming from the drain). '],
      oot_open2_steam_id:['18.OOT to open 2” steam B/V to ethane feed line and drain condensate by opening the ¾” bleed to pad upstream of HV-22X0-02. Keep ¾” bleed cracked open until the lines are warm (dry steam coming from the drain).</td> '],
      oot_open_3_4_ethane_id:['19.OOT to open 3/4” bleed downstream ethane feed HV-22X0-86 to pad.Keep ¾” bleed cracked open until the line is warm (dry steam coming from the drain). '],
      oot_crack_open_10_b_v_id:['20.OOT to crack open 10” B/V downstream each ethane feed control valve FV-22X0-14A/B and drain the ethane line to FPH backwards by opening the ¾” bleed downstream the FV to pad. Keep ¾” bleeds cracked open until the line is warm (dry steam coming from the drain).<br>When all the condensate is drained out close the drains and the 10” block valves.'],
      open_the_upstream_and_downstream_id:['21.Step1:Open the upstream and downstream 4” B/V of FV-22X0-08 and start closing the 2” bypass then take the control using the control valve FV-22X0-08. '],
      Phosphate_and_Morpholine_id:['Step2:Phosphate and Morpholine injection to main BFW line to be started. Dosing rate to be decided based on blowdown sample.<br>Note: Separate injection point valves for old F-2280 line should be kept closed. '],
      before_starting_id:['22.Before starting the steam flow through the coils the combustion air flow to the furnace FC-22X2-15D-16D should be increased to 60 M t/h to dilute the effect of steam on the scanners. IOT to enter manual set point. '],
      iot_reduce_draf_id:['23.IOT to reduce the draft to (-8) mmH2O by entering a manual draft set point, before starting the steam flow through the coils. '],
      iot_visually_check_the_firebox_id:['24.Step1:*Request the OOT to visually check the firebox to see if it starts to look foggy due to steam. '],
      iot_htc_1_outside_temperature_id:['Step2:*Monitor the steam flow reading to each side (FT-22X0-22A/B), the HTC-1 outside temperature on each side (TT-22X0-17A/B) and the radiant inlet temperature (TT-22X0-19A/B) and pressure (PT-22X0-18A/B) on each side to identify if steam is flowing or not yet.'],

      oot_ds_and_steam_to_fph_id:['25.OOT to line up steam lines purges (DS and steam to FPH) to C-2317 once all the steam lines are confirmed dry. '],

      iot_checking_that_all_COTs_id:['26.Step1:*Checking that all COTs are rising at about the same rate. '],

      iot_checking_that_all_venture_ratios_id:['Step2:*Checking that all venture ratios are about the same value. '],

      iot_to_clear_pluggage_id:['27.IOT to clear pluggage from suspect coils by slowly increasing the steam flow on that side of the furnace.'],
      ootsecondary_tle_id:['28.Step1:*Secondary TLE inlet PT '],
      oottertiary_tle_id:['Step2:*Tertiary TLE outlet PTs.'],
      oot_pt_between_both_CG_movs_id:['Step3: *PT between both CG MOVs.'],

      oot_CG_Decoke_MOV_id:['Step4:*Both CG MOVs and Decoke MOV seats (HV-22X0-13A and HV-22X0-14 and Cavity). '],

      iot_shp_steamflow_i_id:['29.IOT to ensure that SHP steam flow is exiting the vent silencer. '],

      iot_monitor_fuelgas_id:['30.IOT to continuously monitor the fuel gas pressure and OOT to continue lighting off more burners as required. '],
      oot_monitor_the_firebox_id:['31.OOT to continuously monitor the firebox to see if it starts to look foggy due to steam entering it. '],

      thesteamflow_is_greaterthan_10_id:['32.When the steam flow is >10 T/H/coil the decoke air flow is backed off by closing the FV’S in auto. '],
      oot_close_decoke_air_id:['33.OOT to close decoke air ONIS blind and 6” main B/V once there is no more air flow to coils. '],
      oot_to_close_4decoke_id:['34.OOT to close 4” decoke air B/V downstream each control valve FV-22X0-10A/B.'],
      iot_disable_decokeair_controller_id:['35.IOT to disable Decoke Air controllers and confirm that the ONIS “Close DI” is true. '],
      hv_22x0_07_isclosed_id:['36.When Decoke air HV-22X0-07 is closed HV-22X0-02 (purge steam to ethane feed line) should open 25% on program logic. '],

      oot_to_fully_open_downstream_id:['37.OOT to fully open downstream block valves of the ethane feed control valves FV-22X0-14A/B and metallic car seal provided. '],
      iot_to_confirm_ethane_feed_id:['38.IOT to confirm that ethane feed control valves FV-22X0-14A/B come fully open in auto to allow starting steam flow through the feed preheat coils. '],
     oot_to_lineup_steamdrum_id:['39.OOT to line up steam drum and sTLE continuous blowdown to header. When steam drum header pressure reads > 12 kg/cm2. '],

      adjust_the_steam_drum_blowdown_id:['40.If needed, adjust the steam drum blow down to maintain the BFW economizer coil outlet temperature below 312ºC. '],
      furnace_sequence_automove_to_warmup_id:['41.IOT to ensure Furnace sequence auto-move to Warm up COT HSSB step occurs. Warm up continues at 50°C per hour. '],



      id:[this.id],
        // burners_20_:[null,Validators.required],
        iot_arch_temperature:[null,Validators.required],
        oot_air_ONIS_blind:[null,Validators.required],
        oot_to_open4:[null,Validators.required],
        iot_start_decoke:[null,Validators.required],
        oot_fuel_gas:[null,Validators.required],
        oot_burner_light_off:[null,Validators.required],
        oot_add_burners:[null,Validators.required],
        air_registers_3Notches:[null,Validators.required],
        burners_20:[null,Validators.required],
        iot_to_request_OOT:[null,Validators.required],
        iot_COTs_rising:[null,Validators.required],
        iot_venturi_Ratios:[null,Validators.required],
        iot_suspect_coils:[null,Validators.required],
        oot_Start_warm_MS_steam:[null,Validators.required],
        oot_spool_piece:[null,Validators.required],
        oot_open_MS_EBV:[null,Validators.required],
        oot_topen_MS_steam8:[null,Validators.required],
        iot_both_steam:[null,Validators.required],
        oot_steam_lines_up:[null,Validators.required],
        oot_dilution_steam:[null,Validators.required],
        oot_open2_steam:[null,Validators.required],
        oot_to_open3_4:[null,Validators.required],
        oot_open_3_4_ethane:[null,Validators.required],
        oot_crack_open_10_b_v:[null,Validators.required],
        open_the_upstream_and_downstream:[null,Validators.required],
        Phosphate_and_Morpholine:[null,Validators.required],
        before_starting:[null,Validators.required],
        iot_reduce_draf:[null,Validators.required],
        iot_visually_check_the_firebox:[null,Validators.required],
        iot_htc_1_outside_temperature:[null,Validators.required],
        oot_ds_and_steam_to_fph:[null,Validators.required],
        iot_checking_that_all_COTs:[null,Validators.required],
        iot_checking_that_all_venture_ratios:[null,Validators.required],
        iot_to_clear_pluggage:[null,Validators.required],
        ootsecondary_tle:[null,Validators.required],
        oottertiary_tle:[null,Validators.required],
        oot_pt_between_both_CG_movs:[null,Validators.required],
        oot_CG_Decoke_MOV:[null,Validators.required],
        iot_shp_steamflow_i:[null,Validators.required],
        iot_monitor_fuelgas:[null,Validators.required],
        oot_monitor_the_firebox:[null,Validators.required],
        thesteamflow_is_greaterthan_10:[null,Validators.required],
        oot_close_decoke_air:[null,Validators.required],
        oot_to_close_4decoke:[null,Validators.required],
        iot_disable_decokeair_controller:[null,Validators.required],
        hv_22x0_07_isclosed:[null,Validators.required],
        oot_to_fully_open_downstream:[null,Validators.required],
        iot_to_confirm_ethane_feed:[null,Validators.required],
        oot_to_lineup_steamdrum:[null,Validators.required],
        adjust_the_steam_drum_blowdown:[null,Validators.required],
        furnace_sequence_automove_to_warmup:[null,Validators.required],
        // Warm_Up_arch_table_1_id:[]

        iot_arch_temperature_comment:[null],
        oot_air_ONIS_blind_comment:[null],
        oot_to_open4_comment:[null],
        iot_start_decoke_comment:[null],
        oot_fuel_gas_comment:[null],
        oot_burner_light_off_comment:[null],
        oot_add_burners_comment:[null],
        air_registers_3Notches_comment:[null],
        burners_20_comment:[null],
        iot_to_request_OOT_comment:[null],
        iot_COTs_rising_comment:[null],
        iot_venturi_Ratios_comment:[null],
        iot_suspect_coils_comment:[null],
        oot_Start_warm_MS_steam_comment:[null],
        oot_spool_piece_comment:[null],
        oot_open_MS_EBV_comment:[null],
        oot_topen_MS_steam8_comment:[null],
        iot_both_steam_comment:[null],
        oot_steam_lines_up_comment:[null],
        oot_dilution_steam_comment:[null],
        oot_open2_steam_comment:[null],
        oot_to_open3_4_comment:[null],
        oot_open_3_4_ethane_comment:[null],
        oot_crack_open_10_b_v_comment:[null],
        open_the_upstream_and_downstream_comment:[null],
        Phosphate_and_Morpholine_comment:[null],
        before_starting_comment:[null],
        iot_reduce_draf_comment:[null],
        iot_visually_check_the_firebox_comment:[null],
        iot_htc_1_outside_temperature_comment:[null],
        oot_ds_and_steam_to_fph_comment:[null],
        iot_checking_that_all_COTs_comment:[null],
        iot_checking_that_all_venture_ratios_comment:[null],
        iot_to_clear_pluggage_comment:[null],
        ootsecondary_tle_comment:[null],
        oottertiary_tle_comment:[null],
        oot_pt_between_both_CG_movs_comment:[null],
        oot_CG_Decoke_MOV_comment:[null],
        iot_shp_steamflow_i_comment:[null],
        iot_monitor_fuelgas_comment:[null],
        oot_monitor_the_firebox_comment:[null],
        thesteamflow_is_greaterthan_10_comment:[null],
        oot_close_decoke_air_comment:[null],
        oot_to_close_4decoke_comment:[null],
        iot_disable_decokeair_controller_comment:[null],
        hv_22x0_07_isclosed_comment:[null],
        oot_to_fully_open_downstream_comment:[null],
        iot_to_confirm_ethane_feed_comment:[null],
        oot_to_lineup_steamdrum_comment:[null],
        adjust_the_steam_drum_blowdown_comment:[null],
        furnace_sequence_automove_to_warmup_comment:[null],


        iot_arch_temperature_comment_status:[null],
        oot_air_ONIS_blind_comment_status:[null],
        oot_to_open4_comment_status:[null],
        iot_start_decoke_comment_status:[null],
        oot_fuel_gas_comment_status:[null],
        oot_burner_light_off_comment_status:[null],
        oot_add_burners_comment_status:[null],
        air_registers_3Notches_comment_status:[null],
        burners_20_comment_status:[null],
        iot_to_request_OOT_comment_status:[null],
        iot_COTs_rising_comment_status:[null],
        iot_venturi_Ratios_comment_status:[null],
        iot_suspect_coils_comment_status:[null],
        oot_Start_warm_MS_steam_comment_status:[null],
        oot_spool_piece_comment_status:[null],
        oot_open_MS_EBV_comment_status:[null],
        oot_topen_MS_steam8_comment_status:[null],
        iot_both_steam_comment_status:[null],
        oot_steam_lines_up_comment_status:[null],
        oot_dilution_steam_comment_status:[null],
        oot_open2_steam_comment_status:[null],
        oot_to_open3_4_comment_status:[null],
        oot_open_3_4_ethane_comment_status:[null],
        oot_crack_open_10_b_v_comment_status:[null],
        open_the_upstream_and_downstream_comment_status:[null],
        Phosphate_and_Morpholine_comment_status:[null],
        before_starting_comment_status:[null],
        iot_reduce_draf_comment_status:[null],
        iot_visually_check_the_firebox_comment_status:[null],
        iot_htc_1_outside_temperature_comment_status:[null],
        oot_ds_and_steam_to_fph_comment_status:[null],
        iot_checking_that_all_COTs_comment_status:[null],
        iot_checking_that_all_venture_ratios_comment_status:[null],
        iot_to_clear_pluggage_comment_status:[null],
        ootsecondary_tle_comment_status:[null],
        oottertiary_tle_comment_status:[null],
        oot_pt_between_both_CG_movs_comment_status:[null],
        oot_CG_Decoke_MOV_comment_status:[null],
        iot_shp_steamflow_i_comment_status:[null],
        iot_monitor_fuelgas_comment_status:[null],
        oot_monitor_the_firebox_comment_status:[null],
        thesteamflow_is_greaterthan_10_comment_status:[null],
        oot_close_decoke_air_comment_status:[null],
        oot_to_close_4decoke_comment_status:[null],
        iot_disable_decokeair_controller_comment_status:[null],
        hv_22x0_07_isclosed_comment_status:[null],
        oot_to_fully_open_downstream_comment_status:[null],
        iot_to_confirm_ethane_feed_comment_status:[null],
        oot_to_lineup_steamdrum_comment_status:[null],
        adjust_the_steam_drum_blowdown_comment_status:[null],
        furnace_sequence_automove_to_warmup_comment_status:[null],
        

        userid:[this.userObject.id],
        master_id:[1],
        shift_comment_d_oot:[null],
        shift_comment_d_iot:[null],

    })

    }


    patchvalue(){
      console.log('patchvalue() called');
      this.ChecklistD.patchValue({

        iot_arch_temperature_comment:this.concatenateValues(this.ChecklistD.get('iot_arch_temperature_id')?.value,this.ChecklistD.get('iot_arch_temperature_comment')?.value ),
        oot_air_ONIS_blind_comment:this.concatenateValues(this.ChecklistD.get('oot_air_ONIS_blind_id')?.value,this.ChecklistD.get('oot_air_ONIS_blind_comment')?.value ),
        oot_to_open4_comment:this.concatenateValues(this.ChecklistD.get('oot_to_open4_id')?.value,this.ChecklistD.get('oot_to_open4_comment')?.value ),
        iot_start_decoke_comment:this.concatenateValues(this.ChecklistD.get('iot_start_decoke_id')?.value,this.ChecklistD.get('iot_start_decoke_comment')?.value ),
        oot_fuel_gas_comment:this.concatenateValues(this.ChecklistD.get('oot_fuel_gas_id')?.value,this.ChecklistD.get('oot_fuel_gas_comment')?.value ),
        oot_burner_light_off_comment:this.concatenateValues(this.ChecklistD.get('oot_burner_light_off_id')?.value,this.ChecklistD.get('oot_burner_light_off_comment')?.value ),
        oot_add_burners_comment:this.concatenateValues(this.ChecklistD.get('oot_add_burners_id')?.value,this.ChecklistD.get('oot_add_burners_comment')?.value ),
        air_registers_3Notches_comment:this.concatenateValues(this.ChecklistD.get('air_registers_3Notches_id')?.value,this.ChecklistD.get('air_registers_3Notches_comment')?.value ),
        burners_20_comment:this.concatenateValues(this.ChecklistD.get('burners_20_id')?.value,this.ChecklistD.get('burners_20_comment')?.value ),
        iot_to_request_OOT_comment:this.concatenateValues(this.ChecklistD.get('iot_to_request_OOT_id')?.value,this.ChecklistD.get('iot_to_request_OOT_comment')?.value ),
        iot_COTs_rising_comment:this.concatenateValues(this.ChecklistD.get('iot_COTs_rising_id')?.value,this.ChecklistD.get('iot_COTs_rising_comment')?.value ),
        iot_venturi_Ratios_comment:this.concatenateValues(this.ChecklistD.get('iot_venturi_Ratios_id')?.value,this.ChecklistD.get('iot_venturi_Ratios_comment')?.value ),
        iot_suspect_coils_comment:this.concatenateValues(this.ChecklistD.get('iot_suspect_coils_id')?.value,this.ChecklistD.get('iot_suspect_coils_comment')?.value ),
        oot_Start_warm_MS_steam_comment:this.concatenateValues(this.ChecklistD.get('oot_Start_warm_MS_steam_id')?.value,this.ChecklistD.get('oot_Start_warm_MS_steam_comment')?.value ),
        oot_spool_piece_comment:this.concatenateValues(this.ChecklistD.get('oot_spool_piece_id')?.value,this.ChecklistD.get('oot_spool_piece_comment')?.value ),
        oot_open_MS_EBV_comment:this.concatenateValues(this.ChecklistD.get('oot_open_MS_EBV_id')?.value,this.ChecklistD.get('oot_open_MS_EBV_comment')?.value ),
        oot_topen_MS_steam8_comment:this.concatenateValues(this.ChecklistD.get('oot_topen_MS_steam8_id')?.value,this.ChecklistD.get('oot_topen_MS_steam8_comment')?.value ),
        iot_both_steam_comment:this.concatenateValues(this.ChecklistD.get('iot_both_steam_id')?.value,this.ChecklistD.get('iot_both_steam_comment')?.value ),
        oot_steam_lines_up_comment:this.concatenateValues(this.ChecklistD.get('oot_steam_lines_up_id')?.value,this.ChecklistD.get('oot_steam_lines_up_comment')?.value ),
        oot_dilution_steam_comment:this.concatenateValues(this.ChecklistD.get('oot_dilution_steam_id')?.value,this.ChecklistD.get('oot_dilution_steam_comment')?.value ),
        oot_open2_steam_comment:this.concatenateValues(this.ChecklistD.get('oot_open2_steam_id')?.value,this.ChecklistD.get('oot_open2_steam_comment')?.value ),
        oot_to_open3_4_comment:this.concatenateValues(this.ChecklistD.get('oot_to_open3_4_id')?.value,this.ChecklistD.get('oot_to_open3_4_comment')?.value ),
        oot_open_3_4_ethane_comment:this.concatenateValues(this.ChecklistD.get('oot_open_3_4_ethane_id')?.value,this.ChecklistD.get('oot_open_3_4_ethane_comment')?.value ),
        oot_crack_open_10_b_v_comment:this.concatenateValues(this.ChecklistD.get('oot_crack_open_10_b_v_id')?.value,this.ChecklistD.get('oot_crack_open_10_b_v_comment')?.value ),
        open_the_upstream_and_downstream_comment:this.concatenateValues(this.ChecklistD.get('open_the_upstream_and_downstream_id')?.value,this.ChecklistD.get('open_the_upstream_and_downstream_comment')?.value ),
        Phosphate_and_Morpholine_comment:this.concatenateValues(this.ChecklistD.get('Phosphate_and_Morpholine_id')?.value,this.ChecklistD.get('Phosphate_and_Morpholine_comment')?.value ),
        before_starting_comment:this.concatenateValues(this.ChecklistD.get('before_starting_id')?.value,this.ChecklistD.get('before_starting_comment')?.value ),
        iot_reduce_draf_comment:this.concatenateValues(this.ChecklistD.get('iot_reduce_draf_id')?.value,this.ChecklistD.get('iot_reduce_draf_comment')?.value ),
        iot_visually_check_the_firebox_comment:this.concatenateValues(this.ChecklistD.get('iot_visually_check_the_firebox_id')?.value,this.ChecklistD.get('iot_visually_check_the_firebox_comment')?.value ),
        iot_htc_1_outside_temperature_comment:this.concatenateValues(this.ChecklistD.get('iot_htc_1_outside_temperature_id')?.value,this.ChecklistD.get('iot_htc_1_outside_temperature_comment')?.value ),
        oot_ds_and_steam_to_fph_comment:this.concatenateValues(this.ChecklistD.get('oot_ds_and_steam_to_fph_id')?.value,this.ChecklistD.get('oot_ds_and_steam_to_fph_comment')?.value ),
        iot_checking_that_all_COTs_comment:this.concatenateValues(this.ChecklistD.get('iot_checking_that_all_COTs_id')?.value,this.ChecklistD.get('iot_checking_that_all_COTs_comment')?.value ),
        iot_checking_that_all_venture_ratios_comment:this.concatenateValues(this.ChecklistD.get('iot_checking_that_all_venture_ratios_id')?.value,this.ChecklistD.get('iot_checking_that_all_venture_ratios_comment')?.value ),
        iot_to_clear_pluggage_comment:this.concatenateValues(this.ChecklistD.get('iot_to_clear_pluggage_id')?.value,this.ChecklistD.get('iot_to_clear_pluggage_comment')?.value ),
        ootsecondary_tle_comment:this.concatenateValues(this.ChecklistD.get('ootsecondary_tle_id')?.value,this.ChecklistD.get('ootsecondary_tle_comment')?.value ),
        oottertiary_tle_comment:this.concatenateValues(this.ChecklistD.get('oottertiary_tle_id')?.value,this.ChecklistD.get('oottertiary_tle_comment')?.value ),
        oot_pt_between_both_CG_movs_comment:this.concatenateValues(this.ChecklistD.get('oot_pt_between_both_CG_movs_id')?.value,this.ChecklistD.get('oot_pt_between_both_CG_movs_comment')?.value ),
        oot_CG_Decoke_MOV_comment:this.concatenateValues(this.ChecklistD.get('oot_CG_Decoke_MOV_id')?.value,this.ChecklistD.get('oot_CG_Decoke_MOV_comment')?.value ),
        iot_shp_steamflow_i_comment:this.concatenateValues(this.ChecklistD.get('iot_shp_steamflow_i_id')?.value,this.ChecklistD.get('iot_shp_steamflow_i_comment')?.value ),
        iot_monitor_fuelgas_comment:this.concatenateValues(this.ChecklistD.get('iot_monitor_fuelgas_id')?.value,this.ChecklistD.get('iot_monitor_fuelgas_comment')?.value ),
        oot_monitor_the_firebox_comment:this.concatenateValues(this.ChecklistD.get('oot_monitor_the_firebox_id')?.value,this.ChecklistD.get('oot_monitor_the_firebox_comment')?.value ),
        thesteamflow_is_greaterthan_10_comment:this.concatenateValues(this.ChecklistD.get('thesteamflow_is_greaterthan_10_id')?.value,this.ChecklistD.get('thesteamflow_is_greaterthan_10_comment')?.value ),
        oot_close_decoke_air_comment:this.concatenateValues(this.ChecklistD.get('oot_close_decoke_air_id')?.value,this.ChecklistD.get('oot_close_decoke_air_comment')?.value ),
        oot_to_close_4decoke_comment:this.concatenateValues(this.ChecklistD.get('oot_to_close_4decoke_id')?.value,this.ChecklistD.get('oot_to_close_4decoke_comment')?.value ),
        iot_disable_decokeair_controller_comment:this.concatenateValues(this.ChecklistD.get('iot_disable_decokeair_controller_id')?.value,this.ChecklistD.get('iot_disable_decokeair_controller_comment')?.value ),
        hv_22x0_07_isclosed_comment:this.concatenateValues(this.ChecklistD.get('hv_22x0_07_isclosed_id')?.value,this.ChecklistD.get('hv_22x0_07_isclosed_comment')?.value ),
        oot_to_fully_open_downstream_comment:this.concatenateValues(this.ChecklistD.get('oot_to_fully_open_downstream_id')?.value,this.ChecklistD.get('oot_to_fully_open_downstream_comment')?.value ),
        iot_to_confirm_ethane_feed_comment:this.concatenateValues(this.ChecklistD.get('iot_to_confirm_ethane_feed_id')?.value,this.ChecklistD.get('iot_to_confirm_ethane_feed_comment')?.value ),
        oot_to_lineup_steamdrum_comment:this.concatenateValues(this.ChecklistD.get('oot_to_lineup_steamdrum_id')?.value,this.ChecklistD.get('oot_to_lineup_steamdrum_comment')?.value ),
        adjust_the_steam_drum_blowdown_comment:this.concatenateValues(this.ChecklistD.get('adjust_the_steam_drum_blowdown_id')?.value,this.ChecklistD.get('adjust_the_steam_drum_blowdown_comment')?.value ),
        furnace_sequence_automove_to_warmup_comment:this.concatenateValues(this.ChecklistD.get('furnace_sequence_automove_to_warmup_id')?.value,this.ChecklistD.get('furnace_sequence_automove_to_warmup_comment')?.value ),


      })
      console.log( this.ChecklistD)
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
 onSubmit()
  {

      const formData = this.ChecklistD.value;
      console.log('formData: ', formData);
      this.apiService.savecheckdpage(formData).subscribe(
        (response) => {
          this.id=response.result.id;
          // this.ChecklistD.get('id')?.setValue(this.id);
          console.log('Data saved successfully:', response);
          // this.toast.open('Data saved successfully', 'Close', { duration: 3000 });

          console.log('this.id: ', this.id);
          // this.router.navigate(['/blank']);
        },
        (error) => {

          console.error('Error saving data:', error);
          // this.toast.open('Error saving data', 'Close', { duration: 3000 });
        }
      );

  }
  nxtAccEn(){
    this.checklisteformenable=false;
    this.expand = false;
    this.open1 =true
  }
  add() {
    this.apiService.getchecklistD().subscribe((response: any) => {
      if (response && response.result) { // Check if response and response.result are not null or undefined
        this.remainingValues = response.result;
        this.formdisable = response.result.status === "Complete" ? true : false;
        Object.keys(this.remainingValues).forEach(key => {
          if (key !== 'shift_comment_d_oot' && key !== 'shift_comment_d_iot') {
            this.ChecklistD.get(key)?.patchValue(this.remainingValues[key]);
          }
        });
      } else {
        console.log("Response or response.result is null or undefined.");
        // Handle the error or notify the user accordingly
      }
      this.ChecklistD.get('iot_arch_temperature_comment')?.setValue(this.ChecklistD.get('iot_arch_temperature_comment')?.value ? this.ChecklistD.get('iot_arch_temperature_comment')?.value.split("||")[1].trim() : null);
      this.ChecklistD.get('oot_air_ONIS_blind_comment')?.setValue(this.ChecklistD.get('oot_air_ONIS_blind_comment')?.value ? this.ChecklistD.get('oot_air_ONIS_blind_comment')?.value.split("||")[1].trim() : null);
      this.ChecklistD.get('oot_to_open4_comment')?.setValue(this.ChecklistD.get('oot_to_open4_comment')?.value ? this.ChecklistD.get('oot_to_open4_comment')?.value.split("||")[1].trim() : null);
      this.ChecklistD.get('iot_start_decoke_comment')?.setValue(this.ChecklistD.get('iot_start_decoke_comment')?.value ? this.ChecklistD.get('iot_start_decoke_comment')?.value.split("||")[1].trim() : null);
      this.ChecklistD.get('oot_fuel_gas_comment')?.setValue(this.ChecklistD.get('oot_fuel_gas_comment')?.value ? this.ChecklistD.get('oot_fuel_gas_comment')?.value.split("||")[1].trim() : null);
      this.ChecklistD.get('oot_burner_light_off_comment')?.setValue(this.ChecklistD.get('oot_burner_light_off_comment')?.value ? this.ChecklistD.get('oot_burner_light_off_comment')?.value.split("||")[1].trim() : null);
      this.ChecklistD.get('oot_add_burners_comment')?.setValue(this.ChecklistD.get('oot_add_burners_comment')?.value ? this.ChecklistD.get('oot_add_burners_comment')?.value.split("||")[1].trim() : null);
      this.ChecklistD.get('air_registers_3Notches_comment')?.setValue(this.ChecklistD.get('air_registers_3Notches_comment')?.value ? this.ChecklistD.get('air_registers_3Notches_comment')?.value.split("||")[1].trim() : null);
      this.ChecklistD.get('burners_20_comment')?.setValue(this.ChecklistD.get('burners_20_comment')?.value ? this.ChecklistD.get('burners_20_comment')?.value.split("||")[1].trim() : null);
      this.ChecklistD.get('iot_to_request_OOT_comment')?.setValue(this.ChecklistD.get('iot_to_request_OOT_comment')?.value ? this.ChecklistD.get('iot_to_request_OOT_comment')?.value.split("||")[1].trim() : null);
      this.ChecklistD.get('iot_COTs_rising_comment')?.setValue(this.ChecklistD.get('iot_COTs_rising_comment')?.value ? this.ChecklistD.get('iot_COTs_rising_comment')?.value.split("||")[1].trim() : null);
      this.ChecklistD.get('iot_venturi_Ratios_comment')?.setValue(this.ChecklistD.get('iot_venturi_Ratios_comment')?.value ? this.ChecklistD.get('iot_venturi_Ratios_comment')?.value.split("||")[1].trim() : null);
      this.ChecklistD.get('iot_suspect_coils_comment')?.setValue(this.ChecklistD.get('iot_suspect_coils_comment')?.value ? this.ChecklistD.get('iot_suspect_coils_comment')?.value.split("||")[1].trim() : null);
      this.ChecklistD.get('oot_Start_warm_MS_steam_comment')?.setValue(this.ChecklistD.get('oot_Start_warm_MS_steam_comment')?.value ? this.ChecklistD.get('oot_Start_warm_MS_steam_comment')?.value.split("||")[1].trim() : null);
      this.ChecklistD.get('oot_spool_piece_comment')?.setValue(this.ChecklistD.get('oot_spool_piece_comment')?.value ? this.ChecklistD.get('oot_burner_light_off_comment')?.value.split("||")[1].trim() : null);
      this.ChecklistD.get('oot_open_MS_EBV_comment')?.setValue(this.ChecklistD.get('oot_open_MS_EBV_comment')?.value ? this.ChecklistD.get('oot_open_MS_EBV_comment')?.value.split("||")[1].trim() : null);
      this.ChecklistD.get('oot_topen_MS_steam8_comment')?.setValue(this.ChecklistD.get('oot_topen_MS_steam8_comment')?.value ? this.ChecklistD.get('oot_topen_MS_steam8_comment')?.value.split("||")[1].trim() : null);
      this.ChecklistD.get('iot_both_steam_comment')?.setValue(this.ChecklistD.get('iot_both_steam_comment')?.value ? this.ChecklistD.get('iot_both_steam_comment')?.value.split("||")[1].trim() : null);
      this.ChecklistD.get('oot_steam_lines_up_comment')?.setValue(this.ChecklistD.get('oot_steam_lines_up_comment')?.value ? this.ChecklistD.get('oot_steam_lines_up_comment')?.value.split("||")[1].trim() : null);
      this.ChecklistD.get('oot_dilution_steam_comment')?.setValue(this.ChecklistD.get('oot_dilution_steam_comment')?.value ? this.ChecklistD.get('oot_dilution_steam_comment')?.value.split("||")[1].trim() : null);
      this.ChecklistD.get('oot_open2_steam_comment')?.setValue(this.ChecklistD.get('oot_open2_steam_comment')?.value ? this.ChecklistD.get('oot_open2_steam_comment')?.value.split("||")[1].trim() : null);
      this.ChecklistD.get('oot_to_open3_4_comment')?.setValue(this.ChecklistD.get('oot_to_open3_4_comment')?.value ? this.ChecklistD.get('oot_to_open3_4_comment')?.value.split("||")[1].trim() : null);
      this.ChecklistD.get('oot_open_3_4_ethane_comment')?.setValue(this.ChecklistD.get('oot_open_3_4_ethane_comment')?.value ? this.ChecklistD.get('oot_open_3_4_ethane_comment')?.value.split("||")[1].trim() : null);
      this.ChecklistD.get('oot_crack_open_10_b_v_comment')?.setValue(this.ChecklistD.get('oot_crack_open_10_b_v_comment')?.value ? this.ChecklistD.get('oot_crack_open_10_b_v_comment')?.value.split("||")[1].trim() : null);
      this.ChecklistD.get('open_the_upstream_and_downstream_comment')?.setValue(this.ChecklistD.get('open_the_upstream_and_downstream_comment')?.value ? this.ChecklistD.get('open_the_upstream_and_downstream_comment')?.value.split("||")[1].trim() : null);
      this.ChecklistD.get('Phosphate_and_Morpholine_comment')?.setValue(this.ChecklistD.get('Phosphate_and_Morpholine_comment')?.value ? this.ChecklistD.get('Phosphate_and_Morpholine_comment')?.value.split("||")[1].trim() : null);
      this.ChecklistD.get('before_starting_comment')?.setValue(this.ChecklistD.get('before_starting_comment')?.value ? this.ChecklistD.get('before_starting_comment')?.value.split("||")[1].trim() : null);
      this.ChecklistD.get('iot_reduce_draf_comment')?.setValue(this.ChecklistD.get('iot_reduce_draf_comment')?.value ? this.ChecklistD.get('iot_reduce_draf_comment')?.value.split("||")[1].trim() : null);

      this.ChecklistD.get('iot_visually_check_the_firebox_comment')?.setValue(this.ChecklistD.get('iot_visually_check_the_firebox_comment')?.value ? this.ChecklistD.get('iot_visually_check_the_firebox_comment')?.value.split("||")[1].trim() : null);
      this.ChecklistD.get('iot_htc_1_outside_temperature_comment')?.setValue(this.ChecklistD.get('iot_htc_1_outside_temperature_comment')?.value ? this.ChecklistD.get('iot_htc_1_outside_temperature_comment')?.value.split("||")[1].trim() : null);
      this.ChecklistD.get('oot_ds_and_steam_to_fph_comment')?.setValue(this.ChecklistD.get('oot_ds_and_steam_to_fph_comment')?.value ? this.ChecklistD.get('oot_ds_and_steam_to_fph_comment')?.value.split("||")[1].trim() : null);
      this.ChecklistD.get('iot_checking_that_all_COTs_comment')?.setValue(this.ChecklistD.get('iot_checking_that_all_COTs_comment')?.value ? this.ChecklistD.get('iot_checking_that_all_COTs_comment')?.value.split("||")[1].trim() : null);
      this.ChecklistD.get('iot_checking_that_all_venture_ratios_comment')?.setValue(this.ChecklistD.get('iot_checking_that_all_venture_ratios_comment')?.value ? this.ChecklistD.get('iot_checking_that_all_venture_ratios_comment')?.value.split("||")[1].trim() : null);
      this.ChecklistD.get('iot_to_clear_pluggage_comment')?.setValue(this.ChecklistD.get('iot_to_clear_pluggage_comment')?.value ? this.ChecklistD.get('iot_to_clear_pluggage_comment')?.value.split("||")[1].trim() : null);
      this.ChecklistD.get('ootsecondary_tle_comment')?.setValue(this.ChecklistD.get('ootsecondary_tle_comment')?.value ? this.ChecklistD.get('ootsecondary_tle_comment')?.value.split("||")[1].trim() : null);
      this.ChecklistD.get('oottertiary_tle_comment')?.setValue(this.ChecklistD.get('oottertiary_tle_comment')?.value ? this.ChecklistD.get('oottertiary_tle_comment')?.value.split("||")[1].trim() : null);

      this.ChecklistD.get('oot_pt_between_both_CG_movs_comment')?.setValue(this.ChecklistD.get('oot_pt_between_both_CG_movs_comment')?.value ? this.ChecklistD.get('oot_pt_between_both_CG_movs_comment')?.value.split("||")[1].trim() : null);
      this.ChecklistD.get('oot_CG_Decoke_MOV_comment')?.setValue(this.ChecklistD.get('oot_CG_Decoke_MOV_comment')?.value ? this.ChecklistD.get('oot_CG_Decoke_MOV_comment')?.value.split("||")[1].trim() : null);
      this.ChecklistD.get('iot_shp_steamflow_i_comment')?.setValue(this.ChecklistD.get('iot_shp_steamflow_i_comment')?.value ? this.ChecklistD.get('iot_shp_steamflow_i_comment')?.value.split("||")[1].trim() : null);
      this.ChecklistD.get('iot_monitor_fuelgas_comment')?.setValue(this.ChecklistD.get('iot_monitor_fuelgas_comment')?.value ? this.ChecklistD.get('iot_monitor_fuelgas_comment')?.value.split("||")[1].trim() : null);
      this.ChecklistD.get('oot_monitor_the_firebox_comment')?.setValue(this.ChecklistD.get('oot_monitor_the_firebox_comment')?.value ? this.ChecklistD.get('oot_monitor_the_firebox_comment')?.value.split("||")[1].trim() : null);
      this.ChecklistD.get('thesteamflow_is_greaterthan_10_comment')?.setValue(this.ChecklistD.get('thesteamflow_is_greaterthan_10_comment')?.value ? this.ChecklistD.get('thesteamflow_is_greaterthan_10_comment')?.value.split("||")[1].trim() : null);
      this.ChecklistD.get('oot_close_decoke_air_comment')?.setValue(this.ChecklistD.get('oot_close_decoke_air_comment')?.value ? this.ChecklistD.get('oot_close_decoke_air_comment')?.value.split("||")[1].trim() : null);
      this.ChecklistD.get('oot_to_close_4decoke_comment')?.setValue(this.ChecklistD.get('oot_to_close_4decoke_comment')?.value ? this.ChecklistD.get('oot_to_close_4decoke_comment')?.value.split("||")[1].trim() : null);
      this.ChecklistD.get('iot_disable_decokeair_controller_comment')?.setValue(this.ChecklistD.get('iot_disable_decokeair_controller_comment')?.value ? this.ChecklistD.get('iot_disable_decokeair_controller_comment')?.value.split("||")[1].trim() : null);
      this.ChecklistD.get('hv_22x0_07_isclosed_comment')?.setValue(this.ChecklistD.get('hv_22x0_07_isclosed_comment')?.value ? this.ChecklistD.get('hv_22x0_07_isclosed_comment')?.value.split("||")[1].trim() : null);
      this.ChecklistD.get('oot_to_fully_open_downstream_comment')?.setValue(this.ChecklistD.get('oot_to_fully_open_downstream_comment')?.value ? this.ChecklistD.get('oot_to_fully_open_downstream_comment')?.value.split("||")[1].trim() : null);
      this.ChecklistD.get('iot_to_confirm_ethane_feed_comment')?.setValue(this.ChecklistD.get('iot_to_confirm_ethane_feed_comment')?.value ? this.ChecklistD.get('iot_to_confirm_ethane_feed_comment')?.value.split("||")[1].trim() : null);
      this.ChecklistD.get('oot_to_lineup_steamdrum_comment')?.setValue(this.ChecklistD.get('oot_to_lineup_steamdrum_comment')?.value ? this.ChecklistD.get('oot_to_lineup_steamdrum_comment')?.value.split("||")[1].trim() : null);
      this.ChecklistD.get('adjust_the_steam_drum_blowdown_comment')?.setValue(this.ChecklistD.get('adjust_the_steam_drum_blowdown_comment')?.value ? this.ChecklistD.get('adjust_the_steam_drum_blowdown_comment')?.value.split("||")[1].trim() : null);
      this.ChecklistD.get('furnace_sequence_automove_to_warmup_comment')?.setValue(this.ChecklistD.get('furnace_sequence_automove_to_warmup_comment')?.value ? this.ChecklistD.get('furnace_sequence_automove_to_warmup_comment')?.value.split("||")[1].trim() : null);
      





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
    // this.ChecklistD.get('shift_comment_d_oot')?.setValue(this.remainingValues.shift_comment_d_oot);
    // this.ChecklistD.get('shift_comment_d_iot')?.setValue(this.remainingValues.shift_comment_d_oot);
  const formData = this.ChecklistD.value;
  console.log('formData: ', formData);
  this.apiService.updatePermitData(formData).subscribe(
    (response) => {
      // Assuming 'permitForm' is a FormGroup
      this.ChecklistD.get('shift_comment_d_oot')?.setValue(null);
      this.ChecklistD.get('shift_comment_d_iot')?.setValue(null);

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
    this.ChecklistD.get('shift_comment_d_oot')?.setValue(null);
    this.ChecklistD.get('shift_comment_d_iot')?.setValue(null);
  }
}
