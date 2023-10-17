import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibMultiSelectComponent } from './lib-multi-select.component';

describe('LibMultiSelectComponent', () => {
  let component: LibMultiSelectComponent;
  let fixture: ComponentFixture<LibMultiSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ LibMultiSelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibMultiSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
