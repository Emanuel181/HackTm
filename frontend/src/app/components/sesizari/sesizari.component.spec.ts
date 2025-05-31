import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SesizariComponent } from './sesizari.component';

describe('SesizariComponent', () => {
  let component: SesizariComponent;
  let fixture: ComponentFixture<SesizariComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SesizariComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SesizariComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
