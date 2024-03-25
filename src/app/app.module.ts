
































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
    DocsComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AppRoutingModule,
    HttpClientModule
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
