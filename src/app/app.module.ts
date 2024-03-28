
































import { registerLocaleData } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import localeThai from '@angular/common/locales/th';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';
import { DropdownMenuComponent } from '@app/components/dropdown/dropdown-menu/dropdown-menu.component';
import { DropdownComponent } from '@app/components/dropdown/dropdown.component';
import { MenuItemComponent } from '@app/components/menu-item/menu-item.component';
// import { ErrorInterceptor } from '@app/error.interceptor';
import { MessagesComponent } from '@app/layout/header/messages/messages.component';
import { NotificationsComponent } from '@app/layout/header/notifications/notifications.component';
import { UserMenuComponent } from '@app/layout/header/user/user-menu.component';
import { MainComponent } from '@app/layout/main/main.component';
import { BlankComponent } from '@app/pages/blank/blank.component';
import { DocsComponent } from '@app/pages/docs/docs.component';
import { HomeComponent } from '@app/pages/home/home.component';
import { LoginComponent } from '@app/pages/login/login.component';
import { PermissionDeniedComponent } from '@app/pages/permission-denied/permission-denied.component';
import { RegisterComponent } from '@app/pages/register/register.component';
import { SubMenuComponent } from '@app/pages/sub-menu/sub-menu.component';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { NgbCalendar, NgbCalendarBuddhist, NgbDateAdapter, NgbDateParserFormatter, NgbDatepickerConfig, NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { fontAwesomeIcons } from './config/font-awesome-icons';
import { CustomNgbDateAdapter } from './shared/custom-ngb-date-adapter';
import { CustomNgbDateParserFormatter } from './shared/custom-ngb-date-parser-formatter';
import { CustomNgbDatepickerI18n } from './shared/custom-ngb-datepicker-i18n';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { TodaytaskComponent } from './todaytask/todaytask.component';


import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatRadioModule } from '@angular/material/radio';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTreeModule } from '@angular/material/tree';
import {MatTabsModule} from '@angular/material/tabs';
import { ReactiveFormsModule } from '@angular/forms';
import { TodayComponent } from './today/today.component';
import { ChecklistAComponent } from './checklist-a/checklist-a.component';
import { ToolcompComponent } from './toolcomp/toolcomp.component';
import { StartupComponent } from './startup/startup.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    MenuItemComponent,
    SubMenuComponent,
    BlankComponent,
    DropdownComponent,
    DropdownMenuComponent,
    MessagesComponent,
    NotificationsComponent,
    UserMenuComponent,
    HomeComponent,
   
    PermissionDeniedComponent,
    RegisterComponent,
    DocsComponent,
    TodaytaskComponent,
    TodayComponent,
    ChecklistAComponent,
    ToolcompComponent,
    StartupComponent,
    
  ],
  imports: [
  
    SharedModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
     MatCardModule,
     MatExpansionModule,
     BrowserModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatTableModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDialogModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRippleModule,
    MatDividerModule,
    MatTreeModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatAutocompleteModule,
    MatRadioModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    MatChipsModule,
    MatButtonToggleModule,
    MatSnackBarModule,
    MatTabsModule,
  ],
  providers: [
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: NgbDateAdapter, useClass: CustomNgbDateAdapter },
    { provide: NgbCalendar, useClass: NgbCalendarBuddhist },
    { provide: NgbDateParserFormatter, useClass: CustomNgbDateParserFormatter },
    { provide: NgbDatepickerI18n, useClass: CustomNgbDatepickerI18n },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(iconLibrary: FaIconLibrary, dpConfig: NgbDatepickerConfig) {
    iconLibrary.addIcons(...fontAwesomeIcons);
    registerLocaleData(localeThai);
    // year ต้องใส่ ปี พ.ศ. เพราะ NgbCalendarBuddhist จะใช้ค่าเป็น พศ. ทั้งหมดเลย ทั้งรับ และส่ง
    // * ดังนั้นหากจะนำมาใช้ต้อง + - 543 เอง ส่วนปฎิทินนั้นจะไม่ผิดเพี้ยน แต่ต้องใส่ ค่า พ.ศ. แทน คศ.
    dpConfig.minDate = { year: (new Date().getFullYear() + 543) - 100, month: 1, day: 1 };
  }
}
