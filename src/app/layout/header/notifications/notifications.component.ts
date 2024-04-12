import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NotificationService } from '@app/utils/service/notification.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit, OnDestroy {
  private onSubmitInterval: any;
  private addSubscription: Subscription | undefined;
  ootIotObject: { [k: string]: unknown } = {};
  notificationForm: FormGroup;
  id: any;
  show: any;
  next: boolean;

  constructor(
    private fb: FormBuilder,
    private apiService: NotificationService
  ) {}

  ngOnInit(): void {
    this.setupSubmitInterval();
    this.notificationForm = this.fb.group({});
  }

  ngOnDestroy(): void {
    clearInterval(this.onSubmitInterval);
  }

  setupSubmitInterval() {
    this.onSubmitInterval = setInterval(() => {
      this.add();
    }, 5 * 1000); // 5 seconds interval
  }

  add() {
    this.apiService.getnotificationA().subscribe((response: any) => {
      if(response.result.id){
        this.id=response.result.id
        this.show= response.result
           const ootIotEntries = Object.entries(response.result).filter(([key, _]) =>
             key.startsWith('oot') || key.startsWith('iot')
           );
           if(this.ootIotObject){
            this.ootIotObject = Object.fromEntries(ootIotEntries);
            this.createFormControls();
            this.next=true;
           }
           
      }
    });
    // if(this.next){

    //   this.apiService.getnotificationB().subscribe((response: any) => {
    //     if(response.result.id){
    //       this.id=response.result.id
    //       this.show= response.result
    //          const ootIotEntries = Object.entries(response.result).filter(([key, _]) =>
    //            key.startsWith('oot') || key.startsWith('iot')
    //          );
    //          this.ootIotObject = Object.fromEntries(ootIotEntries);
    //          this.createFormControls();
    //     }
    //   });
    // }
    
    // this.apiService.getnotificationC().subscribe((response: any) => {
    //   if(response.result.id){
    //     this.id=response.result.id
    //     this.show= response.result
    //        const ootIotEntries = Object.entries(response.result).filter(([key, _]) =>
    //          key.startsWith('oot') || key.startsWith('iot')
    //        );
    //        this.ootIotObject = Object.fromEntries(ootIotEntries);
    //        this.createFormControls();
    //   }
    // });
    // this.apiService.getnotificationD().subscribe((response: any) => {
    //   if(response.result.id){
    //     this.id=response.result.id
    //     this.show= response.result
    //        const ootIotEntries = Object.entries(response.result).filter(([key, _]) =>
    //          key.startsWith('oot') || key.startsWith('iot')
    //        );
    //        this.ootIotObject = Object.fromEntries(ootIotEntries);
    //        this.createFormControls();
    //   }
    // });
    // this.apiService.getnotificationE().subscribe((response: any) => {
    //   if(response.result.id){
    //     this.id=response.result.id
    //     this.show= response.result
    //        const ootIotEntries = Object.entries(response.result).filter(([key, _]) =>
    //          key.startsWith('oot') || key.startsWith('iot')
    //        );
    //        this.ootIotObject = Object.fromEntries(ootIotEntries);
    //        this.createFormControls();
    //   }
    // });
    // this.apiService.getnotificationF().subscribe((response: any) => {
    //   if(response.result.id){
    //     this.id=response.result.id
    //     this.show= response.result
    //        const ootIotEntries = Object.entries(response.result).filter(([key, _]) =>
    //          key.startsWith('oot') || key.startsWith('iot')
    //        );
    //        this.ootIotObject = Object.fromEntries(ootIotEntries);
    //        this.createFormControls();
    //   }
    // });
  }

  createFormControls() {
    // Clear existing form controls
    this.notificationForm = this.fb.group({});

    // Dynamically create form controls based on the received data
    Object.keys(this.ootIotObject).forEach(key => {
      this.notificationForm.addControl(key, new FormControl(''));
    });
  }

  accept(key: string) {
    console.log("acc");
    const formValue = this.notificationForm.get(key)?.value;
    this.saveNotification(formValue, key, 'accept');
  }

  reject(key: string) {
    const formValue = this.notificationForm.get(key)?.value;
    this.saveNotification(formValue, key, 'reject');
  }

  saveNotification(formValue: any, key: string, action: string) {
    console.log("save");
    const payload = {
      id: this.id,
      userid: this.show.userLoginDTO.id,
      master_id: this.show.masterTableDTO.master_id,
      [key]: action
    };
    
    this.addSubscription = this.apiService.savenotification(payload).subscribe(
      (response) => {
        console.log('Response from server:', response);
        // Optionally, you can perform additional actions upon successful save
      },
      (error) => {
        console.error('Error while sending data:', error);
      }
    );
  }
}
