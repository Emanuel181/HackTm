// src/app/creation-dialog/creation-dialog.component.ts

import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule
} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule }      from '@angular/material/input';
import { MatButtonModule }     from '@angular/material/button';
import { MatIconModule }       from '@angular/material/icon';
import { MatCardModule }       from '@angular/material/card';
import { MatChipsModule }      from '@angular/material/chips'; 

@Component({
  selector: 'app-creation-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule
  ],
  templateUrl: './creation-dialog.component.html',
  styleUrls: ['./creation-dialog.component.scss']
})
export class CreationDialogComponent implements OnInit {
  form: FormGroup;
  public isViewMode: boolean;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isViewMode = !!data;

    this.form = this.fb.group({
      title:       [{ value: '', disabled: false }, Validators.required],
      description: [{ value: '', disabled: false }, Validators.required],
      image:       [{ value: null, disabled: false }]
    });
  }

  ngOnInit(): void {
    if (this.isViewMode) {
      this.form.patchValue({
        title:       this.data.titlu ?? '',
        description: this.data.descriere ?? ''
      });
      this.form.get('title')?.disable();
      this.form.get('description')?.disable();
      this.form.get('image')?.disable();
    }
  }

  // Called when the user picks a file from <input type="file"> (only in create mode).
  onFileChange(event: Event) {
    if (this.isViewMode) {
      return; // do nothing if we’re in view mode
    }
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file: File = input.files[0];
      this.form.patchValue({ image: file });
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

  onCreate() {
    if (this.form.invalid) {
      return;
    }
    const value = this.form.value;
    this.dialogRef.close(value);
  }

  onClose() {
    this.dialogRef.close();
  }
}
