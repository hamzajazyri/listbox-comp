import { Directive, Input, ElementRef, Renderer2, HostListener, OnInit, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[libTooltip]',
  standalone: true
})
export class LibTooltipDirective implements OnInit, AfterViewInit {

  @Input() tooltipText!: string;
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
    this.renderer.appendChild(this.tooltipElement, this.renderer.createText(this.tooltipText));
    this.renderer.appendChild(this.el.nativeElement, this.tooltipElement);
    this.renderer.setStyle(this.tooltipElement, 'display', 'none');
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.renderer.setStyle(this.tooltipElement, 'display', 'block');
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.renderer.setStyle(this.tooltipElement, 'display', 'none');
  }

}
