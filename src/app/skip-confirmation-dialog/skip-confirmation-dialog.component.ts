import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-skip-confirmation-dialog',
  templateUrl: './skip-confirmation-dialog.component.html',
  styleUrls: ['./skip-confirmation-dialog.component.css']
})
export class SkipConfirmationDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<SkipConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onConfirm(): void {
    this.dialogRef.close(true); // Pass true when confirmed
  }

  onCancel(): void {
    this.dialogRef.close(false); // Pass false when canceled
  }

}
