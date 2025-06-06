import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthComponent } from '../auth/auth.component';
import { CommonModule } from '@angular/common'; // Optional if needed
import { FormsModule } from '@angular/forms'; // Needed if your component uses [(ngModel)]

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthComponent],
      imports: [FormsModule] // Add FormsModule if using ngModel
    }).compileComponents();

    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
