import { AfterContentInit, Component, ContentChildren, Input, QueryList, ViewChild, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibSelectItemComponent } from '../lib-select/lib-select.component';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { CdkOverlayOrigin, OverlayModule } from '@angular/cdk/overlay';
import { map, switchMap } from 'rxjs';
import { ClickOutsideDirective } from 'src/app/components/click-outside.directive';
import { CdkListbox, CdkOption, ListboxValueChangeEvent } from '@angular/cdk/listbox';

@Component({
  selector: 'lib-multi-select',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ClickOutsideDirective,
    OverlayModule,
    CdkListbox,
    CdkOption,
    CdkOverlayOrigin,
  ],
  templateUrl: './lib-multi-select.component.html',
  styleUrls: ['./lib-multi-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LibMultiSelectComponent),
      multi: true,
    },
  ],
})
export class LibMultiSelectComponent
  implements ControlValueAccessor, AfterContentInit
{
  @Input() placeholder: string = '';
  @Input() maxTagCount: number = 3;

  isOpen = false;

  filtredItems: Array<any> = [];

  searchControl = new FormControl<string>('');

  @ContentChildren(LibSelectItemComponent)
  selectItems!: QueryList<LibSelectItemComponent>;

  @ViewChild(CdkListbox) cdkListbox!: CdkListbox<any>;
  selectedItems: Array<any> =  [];

  listBoxControl = new FormControl([]);

  ngAfterContentInit(): void {
    this.filtredItems = this.selectItems.map((x) => ({
      label: x.label,
      value: x.value,
    }));
    this.searchControl.valueChanges
      .pipe(
        map((search) => search as string),
        switchMap((search) => this.filter(search))
      )
      .subscribe((res) => (this.filtredItems = res));
  }

  onOptionChange(option: ListboxValueChangeEvent<any>) {
    this.selectItem(option.value);
  }

  private filter(searchText: string | null) {
    const search = searchText ? searchText : '';
    return [
      this.selectItems
        .filter((x) => this._isMatch(x.label!, search))
        .map((x) => ({ label: x.label, value: x.value })),
    ];
  }

  private _isMatch(w: string, w2: string) {
    return w.toString().toLowerCase().includes(w2.toLowerCase());
  }

  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  isSelected(value: any): any {
    return this.selectedItems.includes(value);
  }

  clearItem() {
    this.selectedItems = [];
  }

  writeValue(value: Array<any>): void {
    this.selectedItems = value;
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  selectItem(value: any): void {
    this.selectedItems = value;
    this.onChange(this.selectedItems);
    this.onTouched();
  }

  handle_clickEvent(event: Event){
    event.preventDefault();
    event.stopPropagation();
  }

  getLabel(value: any) {
    return this.selectItems.find((x) => x.value == value)?.label;
  }
}
