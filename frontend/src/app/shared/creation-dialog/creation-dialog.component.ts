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

import { MatFormFieldModule }  from '@angular/material/form-field';
import { MatInputModule }      from '@angular/material/input';
import { MatButtonModule }     from '@angular/material/button';
import { MatIconModule }       from '@angular/material/icon';
import { MatCardModule }       from '@angular/material/card';
import { MatSelectModule }     from '@angular/material/select';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { environment } from '../../../environments/environments';
import { MatChip } from '@angular/material/chips';

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
    MatSelectModule,
    MatSnackBarModule,
    MatChip,
    HttpClientModule
  ],
  templateUrl: './creation-dialog.component.html',
  styleUrls: ['./creation-dialog.component.scss']
})
export class CreationDialogComponent implements OnInit {
  form: FormGroup;

  categories: string[]     = [];
  subcategories: string[]  = [];

  isLoadingCategories    = false;
  isLoadingSubcategories = false;
  isCreating             = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreationDialogComponent>,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA)
    public data: { mode: 'view' | 'create'; lat?: number; lng?: number; item?: any }
  ) {
    // Build the form, using “url_poza” instead of “image”
    this.form = this.fb.group({
      titlu:        [{ value: '', disabled: false }, Validators.required],
      descriere:    [{ value: '', disabled: false }, Validators.required],
      categorie:    [{ value: '', disabled: false }, Validators.required],
      subcategorie: [{ value: '', disabled: false }, Validators.required],
      url_poza:     [{ value: null, disabled: false }]  // <-- renamed here
    });
  }

  ngOnInit(): void {
    // VIEW MODE: patch + disable all
    if (this.data.mode === 'view' && this.data.item) {
      this.form.patchValue({
        titlu:        this.data.item.titlu        || '',
        descriere:    this.data.item.descriere    || '',
        categorie:    this.data.item.categorie    || '',
        subcategorie: this.data.item.subcategorie || '',
        url_poza:     this.data.item.url_poza     || null
      });

      this.form.get('titlu')?.disable();
      this.form.get('descriere')?.disable();
      this.form.get('categorie')?.disable();
      this.form.get('subcategorie')?.disable();
      this.form.get('url_poza')?.disable();
      return;
    }

    // CREATE MODE: fetch categories + set up subcategory watcher
    if (this.data.mode === 'create') {
      this.fetchCategories();

      this.form.get('categorie')!.valueChanges.subscribe((chosenCat: string) => {
        this.subcategories = [];
        this.form.get('subcategorie')!.setValue('');
        if (chosenCat) {
          this.fetchSubcategories(chosenCat);
        }
      });
    }
  }

  private fetchCategories(): void {
    this.isLoadingCategories = true;
    this.http
      .get<string[]>(`${environment.baseApiUrl}get_categories`)
      .pipe(finalize(() => (this.isLoadingCategories = false)))
      .subscribe({
        next: (res: string[]) => {
          this.categories = res;
        },
        error: (err: any) => {
          console.error('Error fetching categories:', err);
        }
      });
  }

  private fetchSubcategories(categorie: string): void {
    this.isLoadingSubcategories = true;
    this.http
      .get<string[]>(`${environment.baseApiUrl}get_subcategories/${encodeURIComponent(categorie)}`)
      .pipe(finalize(() => (this.isLoadingSubcategories = false)))
      .subscribe({
        next: (res: string[]) => {
          this.subcategories = res;
        },
        error: (err: any) => {
          console.error(`Error fetching subcategories for "${categorie}":`, err);
        }
      });
  }

  onFileChange(event: Event) {
    if (this.data.mode === 'view') {
      return;
    }
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file: File = input.files[0];
      // Patch the “url_poza” control with the File object
      this.form.patchValue({ url_poza: file });
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

  onCreate() {
    if (this.form.invalid) {
      return;
    }

    // Build a plain‐JS object for JSON (no FormData), including url_poza as base64 if present
    const body: any = {
      user_id: 77, // Hardcoded user ID for now
      titlu:        this.form.get('titlu')!.value,
      descriere:    this.form.get('descriere')!.value,
      categorie:    this.form.get('categorie')!.value,
      subcategorie: this.form.get('subcategorie')!.value
    };

    if (this.data.lat != null && this.data.lng != null) {
      body.locatie = {
        lat: this.data.lat,
        lng: this.data.lng
      };
    }

    const file: File = this.form.get('url_poza')!.value;
    if (file) {
      // Convert file to base64 string and then send JSON
      const reader = new FileReader();
      reader.onload = () => {
        // `reader.result` is something like “data:image/png;base64,AAA…”
        const base64 = (reader.result as string).split(',')[1];
        body.url_poza = base64;

        this.submitJson(body);
      };
      reader.readAsDataURL(file);
    } else {
      // No file → send JSON immediately
      this.submitJson(body);
    }
  }

  private submitJson(body: any) {
    this.isCreating = true;
    this.http
      .post<{ success: boolean; message?: string }>(
        `${environment.baseApiUrl}create_sesizare`,
        body,
        { headers: { 'Content-Type': 'application/json' } }
      )
      .pipe(finalize(() => (this.isCreating = false)))
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.dialogRef.close({ created: true, data: res });
          } else {
            this.snackBar.open(
              res.message || 'A apărut o eroare la crearea sesizării.',
              'OK',
              { duration: 5000 }
            );
          }
        },
        error: (err) => {
          console.error('Error creating sesizare:', err);
          this.snackBar.open(
            'Eroare la comunicarea cu serverul. Încearcă din nou mai târziu.',
            'OK',
            { duration: 5000 }
          );
        }
      });
  }

  onClose() {
    this.dialogRef.close();
  }
}
