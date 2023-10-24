import { Component, ContentChildren, ElementRef, Input, QueryList, ViewChild, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkOverlayOrigin, OverlayModule } from '@angular/cdk/overlay';
import { ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import { ClickOutsideDirective } from 'src/app/components/click-outside.directive';
import {CdkListbox, CdkOption} from '@angular/cdk/listbox';
import { CdkMenuTrigger } from '@angular/cdk/menu';


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
  imports: [CommonModule, ClickOutsideDirective, OverlayModule, CdkListbox, CdkOption, CdkOverlayOrigin],
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

  @ViewChild(CdkListbox) menuList!: CdkListbox;

  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  clearItem() {
    this.selectItem(null);
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

  selectItem(value:any): void {
    const label = this.selectItems.find(item => item.value == value)?.label;
    this.selectedItem = value;
    this.selectedItemLabel = label!;
    this.isOpen = false;
    this.onChange(value);
    this.onTouched();
  }

  toggleView() {
    this.isOpen = !this.isOpen;
    if(this.isOpen)
      setTimeout(() => {
        this.menuList.focus();
      });
  }
}



