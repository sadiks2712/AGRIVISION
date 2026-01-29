import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CropDetection } from './crop-detection';

describe('CropDetection', () => {
  let component: CropDetection;
  let fixture: ComponentFixture<CropDetection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CropDetection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CropDetection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
