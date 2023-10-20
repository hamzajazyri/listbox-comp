import { AfterContentInit, Component, ContentChildren, Input, QueryList, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors } from '@angular/forms';


@Component({
  selector: 'lib-select-item',
  standalone: true,
  imports: [CommonModule],
  template: ``,
  styles: [],
})
export class LibSelectItemComponent {
  @Input('select-label') _label: string | null = null;
  @Input('select-value') _value!: string | number;

  get label() {
    if(this._label)
      return this._label;
    return this._label;
  }
  get value(){
    return this._value;
  }
}



@Component({
  selector: 'lib-select',
  standalone: true,
  imports: [CommonModule, OverlayModule],
  templateUrl: './lib-select.component.html',
  styleUrls: ['./lib-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LibSelectComponent),
      multi: true,
    }
  ],
})
export class LibSelectComponent implements ControlValueAccessor {
  @Input() placeholder = '';
  @Input() nullable = false;

  // is dropdown opened or not
  isOpen = false;

  selectedItem: any;
  selectedItemLabel: string = '';

  @ContentChildren(LibSelectItemComponent) selectItems!: QueryList<LibSelectItemComponent>;


  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  clearItem() {
    this.selectItem(null,null);
  }

  writeValue(value: any): void {
    this.selectedItem = value;
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // Implement this if you want to support disabling the input
  }

  selectItem(label: any, value:any): void {
    this.selectedItem = value;
    this.selectedItemLabel = label;
    this.isOpen = false;
    this.onChange(value);
    this.onTouched();
  }

}



