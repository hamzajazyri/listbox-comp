import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DroppableDirective } from '../../directives/droppable.directive';

@Component({
  selector: 'app-block-container',
  standalone: true,
  imports: [CommonModule, DroppableDirective],
  templateUrl: './block-container.component.html',
  styleUrls: ['./block-container.component.scss']
})
export class BlockContainerComponent {

  @Output('emitDrag') emitDrag = new EventEmitter<void>();

  isEmpty = true;

}
