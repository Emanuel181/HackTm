import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Heatmap3dComponent } from './heatmap3d.component';

describe('Heatmap3dComponent', () => {
  let component: Heatmap3dComponent;
  let fixture: ComponentFixture<Heatmap3dComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Heatmap3dComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Heatmap3dComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
