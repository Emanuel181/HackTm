import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapHeat3DComponent } from './heatmap3d.component';

describe('Heatmap3dComponent', () => {
  let component: MapHeat3DComponent;
  let fixture: ComponentFixture<MapHeat3DComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapHeat3DComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapHeat3DComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
