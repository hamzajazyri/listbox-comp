import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibSelectComponent } from './lib-select.component';

describe('LibSelectComponent', () => {
  let component: LibSelectComponent;
  let fixture: ComponentFixture<LibSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ LibSelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
