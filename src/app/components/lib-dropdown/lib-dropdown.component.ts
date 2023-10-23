import { Component, ContentChildren, Input, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CdkMenuItemRadio,
  CdkMenuItemCheckbox,
  CdkMenuGroup,
  CdkMenu,
  CdkMenuTrigger,
  CdkMenuItem,
  CdkMenuBar,
} from '@angular/cdk/menu';

@Component({
  selector: 'lib-dropdown-item',
  standalone: true,
  imports: [CommonModule],
  template: ``,
  styleUrls: ['./lib-dropdown.component.scss'],
})
export class LibDropdownMenuItemComponent {
  @Input() name = '';
  @Input('disabled') isDisabled = false;
}

@Component({
  selector: 'lib-dropdown',
  standalone: true,
  imports: [CommonModule, CdkMenuBar, CdkMenuItem, CdkMenuTrigger],
  template: `
    <div class="dropdown-container">
      <button  [cdkMenuTriggerFor]="menu">{{ name }}</button>
      <ng-template #menu>
        <div cdkMenu>
          <button
            *ngFor="let item of dropdownItems"
            class="dropdown-list-item"
            cdkMenuItem>
            {{ item.name }}
          </button>
        </div>
      </ng-template>
    </div>
  `,
  styleUrls: ['./lib-dropdown.component.scss'],
})
export class LibDropdownComponent {
  @Input() name = '';
  @Input() isOpen = false;

  @ContentChildren(LibDropdownMenuItemComponent)
  dropdownItems!: QueryList<LibDropdownMenuItemComponent>;
}
