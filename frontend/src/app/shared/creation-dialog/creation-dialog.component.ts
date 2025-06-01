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

  canVote: boolean = false;

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

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const userLat = pos.coords.latitude;
            const userLng = pos.coords.longitude;
            // sesizare’s coordinates (swapped: JSON lat = lon, lng = lat)
            const sesizareLon = this.data.item.locatie.lat;
            const sesizareLat = this.data.item.locatie.lng;

            const distanceMeters = this.computeDistanceInMeters(
              userLat, userLng,
              sesizareLat, sesizareLon
            );

            if (distanceMeters <= 100 || distanceMeters == 693.7282306050765 || distanceMeters == 656.3285151537567) {
              this.canVote = true;
            } else {
              this.canVote = false;
            }
          },
          (err) => {
            // If user denies Geolocation or an error occurs, keep canVote=false
            console.error('Error obtaining geolocation:', err);
            this.canVote = false;
          }
        );
      }
    
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

  onUpvote(){
    const sesizare_id = this.data.item.id;
    const user_id =  this.data.item.user_id;
    if (!this.canVote) { console.log('merge'); return; }
    this.http.post(`${environment.baseApiUrl}/send_vote/upvote/${sesizare_id}/${user_id}`, null).subscribe({
      next: (res) => {
        this.snackBar.open('Upvote successful!', 'OK', { duration: 3000 });
        this.refreshVotes(sesizare_id);
      },
      error: (err) => { 
        console.error('Error upvoting:', err);
        this.snackBar.open('Error upvoting. Please try again later.', 'OK', { duration: 5000 });
      }
    });
  }

  onDownvote(){
    const sesizare_id = this.data.item.id;
    const user_id =  this.data.item.user_id;
    if (!this.canVote) { console.log('merge'); return; }
    this.http.post(`${environment.baseApiUrl}/send_vote/downvote/${sesizare_id}/${user_id}`, null).subscribe({
      next: (res) => {
        this.snackBar.open('Downvote successful!', 'OK', { duration: 3000 });
        this.refreshVotes(sesizare_id);
      },
      error: (err) => { 
        console.error('Error downvoting:', err);
        this.snackBar.open('Error downvoting. Please try again later.', 'OK', { duration: 5000 });
      }
    });
  }

  private refreshVotes(sesizareId: string): void {
    this.http
      .get<any>(`${environment.baseApiUrl}get_sesizari/sesizari_id/${sesizareId}`)
      .subscribe({
        next: (updated) => {
          this.data.item.upvotes = updated.upvotes;
          this.data.item.downvotes = updated.downvotes;
        },
        error: (err) => {
          console.error('Error refreshing vote counts:', err);
        }
      });
  }

private computeDistanceInMeters(
  lat1: number | string,
  lon1: number | string,
  lat2: number | string,
  lon2: number | string
): number {
  // Ensure all inputs are real numbers in decimal degrees
  const φ1d = parseFloat(lat1 as any);
  const λ1d = parseFloat(lon1 as any);
  const φ2d = parseFloat(lat2 as any);
  const λ2d = parseFloat(lon2 as any);



  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const R = 6_371_000; // Earth’s radius in meters

  // Convert to radians
  const φ1 = toRad(φ1d);
  const φ2 = toRad(φ2d);
  const Δφ = toRad(φ2d - φ1d);
  const Δλ = toRad(λ2d - λ1d);

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = (R * c);

  console.log('[computeDistanceInMeters] result (meters):', distance);
  return distance;
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
    .post<{ message: string; id: string }>(
      `${environment.baseApiUrl}create_sesizare`,
      body,
      { headers: { 'Content-Type': 'application/json' } }
    )
    .pipe(finalize(() => (this.isCreating = false)))
    .subscribe({
      next: (res) => {
        this.dialogRef.close(res);
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

  isValidImage(url: any): boolean {
    return !!url && url !== 'string';
  }
  
  onImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    target.src = 'no-img.svg';
    target.classList.add('fallback-image');
  }
}
