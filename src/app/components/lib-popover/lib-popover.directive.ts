import { Directive, Input, ElementRef, Renderer2, HostListener, OnInit, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[libPopover]',
  standalone: true
})
export class LibPopoverDirective implements OnInit, AfterViewInit {

  @Input() popoverHtml!: string;
  @Input() eventType: 'click' | 'hover' = 'hover';
  private tooltipElement!: HTMLElement;

  constructor(private el: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit() {
    this.createTooltip();
}

ngAfterViewInit(): void {
  console.log(this.el);
    this.renderer.setStyle(this.el.nativeElement, 'position', 'relative');
  }

  createTooltip() {
    this.tooltipElement = this.renderer.createElement('div');
    this.renderer.addClass(this.tooltipElement, 'tooltip');
    this.renderer.appendChild(this.tooltipElement, this.renderer.createText(''));
    this.tooltipElement.innerHTML = this.popoverHtml;
    this.renderer.appendChild(this.el.nativeElement, this.tooltipElement);
    this.renderer.setStyle(this.tooltipElement, 'display', 'none');
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    if(this.eventType === 'hover')
      this.renderer.setStyle(this.tooltipElement, 'display', 'block');
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    if(this.eventType === 'hover')
      this.renderer.setStyle(this.tooltipElement, 'display', 'none');
  }


  @HostListener('click')
  onMouseClick() {
    if(this.eventType === 'hover')
      return;
    this.renderer.setStyle(this.tooltipElement, 'display', this.tooltipElement.style.display === 'none' ? 'block': 'none');
  }
}
