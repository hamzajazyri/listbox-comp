import { AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, ComponentFactoryResolver, ComponentRef, ElementRef, HostListener, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DraggableDirective } from './directives/draggable.directive';
import { DroppableDirective } from './directives/droppable.directive';
import { BlockContainerComponent } from './components/block-container/block-container.component';



@Component({
  selector: 'app-editor-tool-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="tool-card">
      <div class="tool-card-content">
        <img [src]="iconUrl" class="tool-icon" [alt]="text" />
        <h5>{{text}}</h5>
        <img src="assets/editor-tools-icons/scrollable-icon.svg" alt="scrollable icon"/>
      </div>
    </div>
  `,
  styles: [
    `.tool-card {
      border-radius: 4px;
      border: 1px solid rgba(36, 28, 21, 0.15);
      background: rgba(255, 255, 255, 0.50);
      box-shadow: 2px 2px 4px 0px rgba(36, 28, 21, 0.07);
      width:100%;
      max-width: 120px;
      height: 120px;
    }`,
    `.tool-card-content {
      display:flex;
      flex-direction:column;
      align-items:center;
      justify-content: center;
      width: 100%;
      height:100%;
      pointer-events: none;
    }`,
    `h5 {
      margin:15px 0px;
      font-weight: 500;
    }`
  ]
})
export class EditorToolCardComponent {
  @Input() text!: string;
  @Input() iconUrl!: string;
}


@Component({
  selector: 'app-certificate-editor',
  standalone: true,
  imports: [CommonModule, EditorToolCardComponent, DroppableDirective, DraggableDirective],
  templateUrl: './certificate-editor.component.html',
  styleUrls: ['./certificate-editor.component.scss']
})
export class CertificateEditorComponent implements AfterViewInit {

  @ViewChild('containerRef', { read: ViewContainerRef }) containerRef!: ViewContainerRef;
  @ViewChild('htmlPreviewRef') previewElem!: ElementRef<HTMLDivElement>;

  isPlaceHolderViewInit = false;
  config: CertificateEditorConfig = {
    size: [816, 1056],
    padding: [10, 10, 10, 10],
    fontSize: 15,
    color: '#000',
    fontFamily: 'Arial, sans-serif',
    mode: 'pixel'
  }

  tools = [
    {
      iconUrl: 'assets/editor-tools-icons/divider-icon.svg',
      text: 'Divider',
      html: '<img src="assets/editor-tools-icons/divider-icon.svg" />'
    }, {
      iconUrl: 'assets/editor-tools-icons/heading-icon.svg',
      text: 'Heading',
      html: '<h1>HEADING</h1>'
    }, {
      iconUrl: 'assets/editor-tools-icons/auto-icon.svg',
      text: 'Auto Generation',
      html: 'Auto Generation'
    }, {
      iconUrl: 'assets/editor-tools-icons/image-icon.svg',
      text: 'Image',
      html: '<img src="assets/editor-tools-icons/image-icon.svg" />'
    }, {
      iconUrl: 'assets/editor-tools-icons/logo-icon.svg',
      text: 'Logo',
      html: '<img src="assets/editor-tools-icons/logo-icon.svg" />'
    }, {
      iconUrl: 'assets/editor-tools-icons/paragraph-icon.svg',
      text: 'Paragraph',
      html: '<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem voluptatum, saepe eum quibusdam inventore dolorum dolor quia consequuntur atque vel repellat eveniet unde illum aliquid accusantium. Laudantium asperiores iure possimus!</p>'
    }, {
      iconUrl: 'assets/editor-tools-icons/spacer-icon.svg',
      text: 'Spacer',
      html: '<div>SPACER</div>'
    }
  ];


  @HostListener('dragover', ['$event'])
  onDrop(event: DragEvent) {
    event.preventDefault();
  }
  @HostListener('drop', ['$event'])
  qsdf(event: DragEvent) {
    this.clearPlaceHolder();
  }

  blocks: Array<ComponentRef<BlockContainerComponent>> = [];

  constructor(private cdr: ChangeDetectorRef){}

  ngAfterViewInit(): void {
    this.previewElem.nativeElement.addEventListener('dragenter', () => {
      if (this.isPlaceHolderViewInit)
        return;
      this.isPlaceHolderViewInit = true;
      this.initPlaceHolder();
    });
  }


  clearPlaceHolder() {
    if (!this.isPlaceHolderViewInit)
      return;
    this.isPlaceHolderViewInit = false;

    const removedBlocksIndex = this.blocks
      .map((block, index) => ({ isEmpty: block.instance.isEmpty, index }))
      .filter(item => item.isEmpty)
      .map(item => item.index);

    for (const block of removedBlocksIndex) {
      this.blocks.at(block)?.destroy();
    }
    this.cdr.detectChanges();
    this.blocks = this.blocks.filter(block => !block.instance.isEmpty);
  }

  initPlaceHolder() {
    for(let i=this.blocks.length; i>0; i--){
      this.insertPlaceHolderBlockAt(i);
    }
    this.insertPlaceHolderBlockAt(0);
  }

  private insertPlaceHolderBlockAt(index: number) {
    const compRef = this.containerRef.createComponent<BlockContainerComponent>(BlockContainerComponent);
    compRef.instance.emitDrag.subscribe(_ => {
      setTimeout(() => {
        this.clearPlaceHolder();
      })
    });
    this.containerRef.insert(compRef.hostView, index);
    this.blocks.splice(index, 0, compRef);
  }

}







export interface CertificateEditorConfig {
  size: Array<number>; // width, hight (px)
  padding: Array<number>; // top, left, bottom, right (px)
  fontSize: number;
  color: string;
  fontFamily: string;
  mode: 'grid' | 'pixel'
  gridColumns?: number,
  gridRows?: number
}
