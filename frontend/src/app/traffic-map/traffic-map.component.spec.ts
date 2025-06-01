import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrafficMapComponent } from './traffic-map.component';

describe('TrafficMapComponent', () => {
  let component: TrafficMapComponent;
  let fixture: ComponentFixture<TrafficMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrafficMapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrafficMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
