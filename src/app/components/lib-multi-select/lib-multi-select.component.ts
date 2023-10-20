import { AfterContentInit, Component, ContentChildren, Input, OnInit, QueryList, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibSelectItemComponent } from '../lib-select/lib-select.component';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { Observable, map, of, startWith, switchMap, tap } from 'rxjs';

@Component({
  selector: 'lib-multi-select',
  standalone: true,
  imports: [CommonModule, OverlayModule, ReactiveFormsModule],
  templateUrl: './lib-multi-select.component.html',
  styleUrls: ['./lib-multi-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LibMultiSelectComponent),
      multi: true
    }
  ]
})
export class LibMultiSelectComponent implements ControlValueAccessor, AfterContentInit {
  @Input() placeholder: string = '';
  @Input() maxTagCount: number = 3;

  isOpen = false;

  selectedItems: Array<any> = [];
  filtredItems: Array<any> = [];

  searchControl = new FormControl<string>('');

  @ContentChildren(LibSelectItemComponent) selectItems!: QueryList<LibSelectItemComponent>;

  ngAfterContentInit(): void {
    this.filtredItems = this.selectItems.map( x => ({label:x.label, value:x.value}));
    this.searchControl.valueChanges.pipe(
      map( search => search as string),
      switchMap( search => this.filter(search)),
    ).subscribe( res => this.filtredItems = res);

  }

  private filter(searchText:string|null) {
    const search = searchText ? searchText : '';
    return [this.selectItems.filter( x => this._isMatch(x.label!, search)).map(
      x => ({label:x.label, value:x.value})
    )];
  }

  private _isMatch(w: string, w2: string) {
    return w.toString().toLowerCase().includes(w2.toLowerCase());
  }

  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  isSelected(value: any): any {
    return this.selectedItems.map( x => x.value).includes(value);
  }

  clearItem() {
    this.selectedItems = [];
  }

  writeValue(value: any): void {
    this.selectedItems = value;
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
    if(this.isSelected(value))
      this.selectedItems = this.selectedItems.filter( x => x.value != value);
    else
      this.selectedItems.push({label, value});

    this.onChange(this.selectedItems.map( x => x.value));
    this.onTouched();
  }

}
