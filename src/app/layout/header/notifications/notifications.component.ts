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
  beforeValue: string;
  afterValue: string;
  detailsHidden :boolean=true;
  currentUser: any;
  comment: unknown[];
  text: unknown[];

  constructor(
    private fb: FormBuilder,
    private apiService: NotificationService
  ) {}

  ngOnInit(): void {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUser = storedUser ? JSON.parse(storedUser) : null;
    console.log(' this.currentUser: ',  this.currentUser.username);
    this.setupSubmitInterval();
    this.notificationForm = this.fb.group({});
  }

  ngOnDestroy(): void {
    clearInterval(this.onSubmitInterval);
  }

  setupSubmitInterval() {
    this.onSubmitInterval = setInterval(() => {
      this.add();
    }, 6 * 1000); // 5 seconds interval
  }

  add() {
    this.apiService.getnotificationA().subscribe((response: any) => {
      if (response.result.id) {
        
          this.id = response.result.id;
          this.show = response.result;
          const ootIotEntries = Object.entries(response.result).filter(([key, _]) =>
              key.endsWith('status') 
          );

          // if (this.ootIotObject) {
             
          const lines = Object.entries(response.result).filter(([key, _]) =>
            key.endsWith('comment') || key.endsWith('comment')
        );
this.comment = lines.map(([_, value]) => value);

const text = Object.entries(response.result).filter(([key, _]) =>
  key.endsWith('text') || key.endsWith('text')
);
this.text = text.map(([_, value]) => value);

        //   console.log('lines: ', lines);
        //   if (lines.length > 0) {
        //     console.log('lines: ', lines);
        //     const line = lines[0][1] as string; // Extracting the string value from the array
        //     const parts: string[] = line.split("||");
        //     console.log('parts: ', parts);
        //     if (parts.length > 1) {
        //         this.beforeValue = parts[0].trim(); // Value before "||"
        //         console.log('beforeValue: ', this.beforeValue);
        //         // Join the remaining parts after splitting by "||" to handle any special characters
        //         this.afterValue = parts.slice(1).join("||").trim(); 
        //         console.log('afterValue: ', this.afterValue);
        //         // Now you can use 'beforeValue' and 'afterValue' as needed
        //     }
        //     this.detailsHidden=false;
        // }
        this.detailsHidden=false;
        this.ootIotObject = Object.fromEntries(ootIotEntries);
        console.log('ootIotObject: ',this.ootIotObject);
          this.createFormControls();
      }
          
      // } else {
      //   console.log("hh");
          
      // }
    
  });
  this.notificationB();
};

  notificationB(){
    this.apiService.getnotificationB().subscribe((response: any) => {
      if(response.result.id){
        this.id=response.result.id
        this.show= response.result
           const ootIotEntries = Object.entries(response.result).filter(([key, _]) =>
            key.endsWith('status') 
           );
          
           const lines = Object.entries(response.result).filter(([key, _]) =>
            key.endsWith('comment') || key.endsWith('comment')
        );
this.comment = lines.map(([_, value]) => value);

const text = Object.entries(response.result).filter(([key, _]) =>
  key.endsWith('text') || key.endsWith('text')
);
this.text = text.map(([_, value]) => value);
          console.log('lines: ', lines);
        //   if (lines.length > 0) {
        //     console.log('lines: ', lines);
        //     const line = lines[0][1] as string; // Extracting the string value from the array
        //     const parts: string[] = line.split("||");
        //     console.log('parts: ', parts);
        //     if (parts.length > 1) {
        //         this.beforeValue = parts[0].trim(); // Value before "||"
        //         console.log('beforeValue: ', this.beforeValue);
        //         // Join the remaining parts after splitting by "||" to handle any special characters
        //         this.afterValue = parts.slice(1).join("||").trim(); 
        //         console.log('afterValue: ', this.afterValue);
        //         // Now you can use 'beforeValue' and 'afterValue' as needed
        //     }
        //     this.detailsHidden=false;
        // }
        this.detailsHidden=false;
            this.ootIotObject = Object.fromEntries(ootIotEntries);
            console.log('ootIotObject: ',this.ootIotObject);
            this.createFormControls();
            
          
      }
    });
    this.notificationC();
  }

  notificationC(){
    this.apiService.getnotificationC().subscribe((response: any) => {
      if(response.result.id){
        this.id=response.result.id
        this.show= response.result
           const ootIotEntries = Object.entries(response.result).filter(([key, _]) =>
            key.endsWith('status') 
           );
           const lines = Object.entries(response.result).filter(([key, _]) =>
            key.endsWith('comment') || key.endsWith('comment')
        );
this.comment = lines.map(([_, value]) => value);

const text = Object.entries(response.result).filter(([key, _]) =>
  key.endsWith('text') || key.endsWith('text')
);
this.text = text.map(([_, value]) => value);
          console.log('lines: ', lines);
        //   if (lines.length > 0) {
        //     console.log('lines: ', lines);
        //     const line = lines[0][1] as string; // Extracting the string value from the array
        //     const parts: string[] = line.split("||");
        //     console.log('parts: ', parts);
        //     if (parts.length > 1) {
        //         this.beforeValue = parts[0].trim(); // Value before "||"
        //         console.log('beforeValue: ', this.beforeValue);
        //         // Join the remaining parts after splitting by "||" to handle any special characters
        //         this.afterValue = parts.slice(1).join("||").trim(); 
        //         console.log('afterValue: ', this.afterValue);
        //         // Now you can use 'beforeValue' and 'afterValue' as needed
        //     }
        //     this.detailsHidden=false;
        // }
        this.detailsHidden=false;

            this.ootIotObject = Object.fromEntries(ootIotEntries);
            console.log('ootIotObject: ',this.ootIotObject);
            this.createFormControls();
            
           
      }
    });
    this.notificationD();
  }

  notificationD(){
    this.apiService.getnotificationD().subscribe((response: any) => {
      if(response.result.id){
        this.id=response.result.id
        this.show= response.result
           const ootIotEntries = Object.entries(response.result).filter(([key, _]) =>
            key.endsWith('status') 
           );
           
           const lines = Object.entries(response.result).filter(([key, _]) =>
            key.endsWith('comment') || key.endsWith('comment')
        );
this.comment = lines.map(([_, value]) => value);

const text = Object.entries(response.result).filter(([key, _]) =>
  key.endsWith('text') || key.endsWith('text')
);
this.text = text.map(([_, value]) => value);
          console.log('lines: ', lines);
        //   if (lines.length > 0) {
        //     console.log('lines: ', lines);
        //     const line = lines[0][1] as string; // Extracting the string value from the array
        //     const parts: string[] = line.split("||");
        //     console.log('parts: ', parts);
        //     if (parts.length > 1) {
        //         this.beforeValue = parts[0].trim(); // Value before "||"
        //         console.log('beforeValue: ', this.beforeValue);
        //         // Join the remaining parts after splitting by "||" to handle any special characters
        //         this.afterValue = parts.slice(1).join("||").trim(); 
        //         console.log('afterValue: ', this.afterValue);
        //         // Now you can use 'beforeValue' and 'afterValue' as needed
        //     }
        //     this.detailsHidden=false;
        // }
        this.detailsHidden=false;

            this.ootIotObject = Object.fromEntries(ootIotEntries);
            console.log('ootIotObject: ',this.ootIotObject);
            this.createFormControls();
            
           
      }
    });
    this.notificationE();
  }

  notificationE(){
    this.apiService.getnotificationE().subscribe((response: any) => {
      if(response.result.id){
        this.id=response.result.id
        this.show= response.result
           const ootIotEntries = Object.entries(response.result).filter(([key, _]) =>
            key.endsWith('status') 
           );
           const lines = Object.entries(response.result).filter(([key, _]) =>
            key.endsWith('comment') || key.endsWith('comment')
        );
this.comment = lines.map(([_, value]) => value);

const text = Object.entries(response.result).filter(([key, _]) =>
  key.endsWith('text') || key.endsWith('text')
);
this.text = text.map(([_, value]) => value);
          console.log('lines: ', lines);
        //   if (lines.length > 0) {
        //     console.log('lines: ', lines);
        //     const line = lines[0][1] as string; // Extracting the string value from the array
        //     const parts: string[] = line.split("||");
        //     console.log('parts: ', parts);
        //     if (parts.length > 1) {
        //         this.beforeValue = parts[0].trim(); // Value before "||"
        //         console.log('beforeValue: ', this.beforeValue);
        //         // Join the remaining parts after splitting by "||" to handle any special characters
        //         this.afterValue = parts.slice(1).join("||").trim(); 
        //         console.log('afterValue: ', this.afterValue);
        //         // Now you can use 'beforeValue' and 'afterValue' as needed
        //     }
        //     this.detailsHidden=false;
        // }
        this.detailsHidden=false;
            this.ootIotObject = Object.fromEntries(ootIotEntries);
            console.log('ootIotObject: ',this.ootIotObject);
            this.createFormControls();
            
        
    }
    });
    this.notificationF();
  }

  notificationF(){
    this.apiService.getnotificationF().subscribe((response: any) => {
      if(response.result.id){
        this.id=response.result.id
        this.show= response.result
           const ootIotEntries = Object.entries(response.result).filter(([key, _]) =>
            key.endsWith('status') 
           );
           const lines = Object.entries(response.result).filter(([key, _]) =>
            key.endsWith('comment') || key.endsWith('comment')
        );
this.comment = lines.map(([_, value]) => value);

const text = Object.entries(response.result).filter(([key, _]) =>
  key.endsWith('text') || key.endsWith('text')
);
this.text = text.map(([_, value]) => value);
        console.log('lines: ', lines);
      //   if (lines.length > 0) {
      //     console.log('lines: ', lines);
      //     const line = lines[0][1] as string; // Extracting the string value from the array
      //     const parts: string[] = line.split("||");
      //     console.log('parts: ', parts);
      //     if (parts.length > 1) {
      //         this.beforeValue = parts[0].trim(); // Value before "||"
      //         console.log('beforeValue: ', this.beforeValue);
      //         // Join the remaining parts after splitting by "||" to handle any special characters
      //         this.afterValue = parts.slice(1).join("||").trim(); 
      //         console.log('afterValue: ', this.afterValue);
      //         // Now you can use 'beforeValue' and 'afterValue' as needed
      //     }
      //     this.detailsHidden=false;
      // }
      this.detailsHidden=false;
            this.ootIotObject = Object.fromEntries(ootIotEntries);
            console.log('ootIotObject: ',this.ootIotObject);
            this.createFormControls();
            
           
           
      }
    });
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
    this.saveNotification(formValue, key, 'Accepted');
    this.detailsHidden=true;
  }

  reject(key: string) {
    const formValue = this.notificationForm.get(key)?.value;
    this.saveNotification(formValue, key, 'Rejected');
    this.detailsHidden=true;
  }

  saveNotification(formValue: any, key: string, action: string) {
    console.log("save");
    const payload = {
      id: this.id,
      // userid: this.show.userLoginDTO.id,
      checklistType: this.show.checklist,
      Action:action,
      objectName:[key]
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
