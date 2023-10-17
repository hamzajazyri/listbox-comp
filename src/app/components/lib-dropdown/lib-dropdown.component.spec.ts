import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibDropdownComponent } from './lib-dropdown.component';

describe('LibDropdownComponent', () => {
  let component: LibDropdownComponent;
  let fixture: ComponentFixture<LibDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ LibDropdownComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
