import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoneVizualeComponent } from './zone-vizuale.component';

describe('ZoneVizualeComponent', () => {
  let component: ZoneVizualeComponent;
  let fixture: ComponentFixture<ZoneVizualeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZoneVizualeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZoneVizualeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
