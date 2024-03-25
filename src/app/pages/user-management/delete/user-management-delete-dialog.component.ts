import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-management-delete-dialog',
  templateUrl: './user-management-delete-dialog.component.html',
  styleUrls: ['./user-management-delete-dialog.component.css']
})
export class UserManagementDeleteDialogComponent implements OnInit {
  user?: any;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(login: string): void {
    // this.userService.delete(login).subscribe(() => {
    this.activeModal.close('deleted');
    // });
  }
}
