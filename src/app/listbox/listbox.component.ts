import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CdkVirtualScrollViewport,
  ScrollingModule,
} from '@angular/cdk/scrolling';
import {
  CdkListbox,
  CdkListboxModule,
  CdkOption,
  ListboxValueChangeEvent,
} from '@angular/cdk/listbox';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { ClickOutsideDirective } from './click-outside.directive';

@Component({
  selector: 'listbox',
  standalone: true,
  imports: [
    CommonModule,
    ScrollingModule,
    CdkListboxModule,
    ReactiveFormsModule,
    ClickOutsideDirective
  ],
  templateUrl: './listbox.component.html',
  styleUrls: ['./listbox.component.scss'],
})
export class ListboxComponent implements OnInit, AfterViewInit {
  @Input() items: Array<any> = [];
  @Input() multiple: boolean = false;
  @Input() maxTagCount: number = 3;

  @Output() onValuesChange = new EventEmitter<Array<string>>();

  @ViewChild(CdkVirtualScrollViewport) viewport!: CdkVirtualScrollViewport;
  @ViewChild(CdkListbox) cdkListbox!: CdkListbox<any>;

  @ViewChildren(CdkOption) cdkOptions!: CdkOption[];

  // only works when ListBox is single type [multiple=false]
  isDropdownOpened = true;
  allFiltredItemsAreSelected = false;

  filtredItems: Array<any> = [];
  selectedItems = new SelectionModel<string>(true, []);

  listBoxControl = new FormControl<string[]>([]);
  filtredControl = new FormControl('');

  onOptionChange(option: ListboxValueChangeEvent<any>) {
    if (!this.multiple) {
      this.selectedItems.clear();
    }
    this.selectedItems.toggle(option.option!.value);
    this.onValuesChange.emit(this.selectedItems.selected);
    this.checkAllSelected();
  }

  onOptionRemove(option: string) {
    this.selectedItems.deselect(option);
    this.onValuesChange.emit(this.selectedItems.selected);
    this.checkAllSelected();

  }

  checkAllSelected() {
    const selectedCount = this.selectedItems.selected.length;
    if (selectedCount < this.filtredItems.length || selectedCount === 0) {
      this.allFiltredItemsAreSelected = false;
      return;
    }
    this.allFiltredItemsAreSelected = !this.filtredItems.some(
      (x) => !this.selectedItems.isSelected(x)
    );
  }

  ngOnInit(): void {
    this.onValuesChange.emit([]);
    this.filtredItems = this.items;

    this.filtredControl.valueChanges
      .pipe(distinctUntilChanged(), debounceTime(100))
      .subscribe((val) => {
        this.filtredItems = this.items.filter((x) => x.includes(val));
        this.viewport.scrollToIndex(0);
        this.updateSelectedViewItem();
        this.checkAllSelected();
      });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.isDropdownOpened = false;
    });
  }

  matchFilter(item: string) {
    return item.includes(this.filtredControl.value as string);
  }

  selectAll() {
    this.selectedItems.select(...this.filtredItems);
    this.onValuesChange.emit(this.selectedItems.selected);
    this.updateSelectedViewItem();
    this.allFiltredItemsAreSelected = true;
  }

  deselectAll() {
    this.selectedItems.deselect(...this.filtredItems);
    this.onValuesChange.emit(this.selectedItems.selected);
    this.updateSelectedViewItem();
    this.allFiltredItemsAreSelected = false;
  }

  onScrolledIndexChange() {
    this.updateSelectedViewItem();
  }

  updateSelectedViewItem() {
    const selectedItemInView: string[] = [];
    for (const option of this.cdkOptions) {
      if (this.selectedItems.isSelected(option.value as string)) {
        selectedItemInView.push(option.value as string);
      }
    }
    this.listBoxControl.setValue(selectedItemInView);
  }

  clickOutsideHandler(event: Event) {
    this.isDropdownOpened = false;
  }
}
