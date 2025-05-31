import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SesizarileMeleComponent } from './sesizarile-mele.component';

describe('SesizarileMeleComponent', () => {
  let component: SesizarileMeleComponent;
  let fixture: ComponentFixture<SesizarileMeleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SesizarileMeleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SesizarileMeleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
