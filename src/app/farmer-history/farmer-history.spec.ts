import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmarHistory } from './farmar-history';

describe('FarmarHistory', () => {
  let component: FarmarHistory;
  let fixture: ComponentFixture<FarmarHistory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FarmarHistory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FarmarHistory);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
