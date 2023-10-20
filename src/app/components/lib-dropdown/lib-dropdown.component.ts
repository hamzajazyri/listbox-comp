import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConnectionPositionPair, OverlayModule } from '@angular/cdk/overlay';

@Component({
  selector: 'lib-dropdown',
  standalone: true,
  imports: [CommonModule, OverlayModule],
  template: `
    <div class="dropdown-container">
      <button cdkOverlayOrigin #trigger="cdkOverlayOrigin" (click)="isOpen = !isOpen">{{name}}</button>
      <ng-template cdkConnectedOverlay
      [cdkConnectedOverlayOrigin]="trigger"
      [cdkConnectedOverlayOpen]="isOpen"
      [cdkConnectedOverlayPosition]="positionStrategy">
        <div class="dropdown-list">
          <ng-content select="lib-dropdown-item"></ng-content>
        </div>
      </ng-template>
    </div>
  `,
  styleUrls: ['./lib-dropdown.component.scss']
})
export class LibDropdownComponent {
  @Input() name = '';
  @Input() isOpen = false;


  positionStrategy = new ConnectionPositionPair(
    { originX: 'end', originY: 'top' },
    { overlayX: 'end', overlayY: 'bottom' }
  );
}


@Component({
  selector: 'lib-dropdown-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dropdown-list-item">
      {{name}}
    </div>
  `,
  styleUrls: ['./lib-dropdown.component.scss']
})
export class LibDropdownMenuItemComponent {
  @Input() name = '';
  @Input('disabled') isDisabled = false;
}
