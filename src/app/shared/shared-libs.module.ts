import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { OverlayscrollbarsModule } from 'overlayscrollbars-ngx';

@NgModule({
  exports: [FormsModule, CommonModule, NgbModule, FontAwesomeModule, ReactiveFormsModule, OverlayscrollbarsModule],
})
export class SharedLibsModule {}
