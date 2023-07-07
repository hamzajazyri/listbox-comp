import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[Draggable]',
  standalone: true
})
export class DraggableDirective {

  @Input() component! : string;

  constructor(private element: ElementRef<HTMLElement>) {
    this.element.nativeElement.setAttribute('draggable', 'true');
  }

  @HostListener('dragstart', ['$event'])
  handleDragStart(event: DragEvent) {
    console.log("DRAG EVENT START:");
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('text/html', this.component);
    }
  }

}
