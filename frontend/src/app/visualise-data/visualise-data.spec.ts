import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualiseData } from './visualise-data';

describe('VisualiseData', () => {
  let component: VisualiseData;
  let fixture: ComponentFixture<VisualiseData>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualiseData]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualiseData);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
