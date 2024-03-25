import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@app/shared/shared.module';
import { UserManagementUpdateComponent } from './update/user-management-update.component';
import { UserManagementComponent } from './user-management.component';
import { userManagementRoute } from './user-management.route';
import { UserManagementDeleteDialogComponent } from './delete/user-management-delete-dialog.component';
import { UserManagementService } from './service/user-management.service';



@NgModule({
  imports: [SharedModule, RouterModule.forChild(userManagementRoute)],
  declarations: [UserManagementComponent, UserManagementUpdateComponent, UserManagementDeleteDialogComponent],
  providers: [UserManagementService],
})
export class UserManagementModule { }
