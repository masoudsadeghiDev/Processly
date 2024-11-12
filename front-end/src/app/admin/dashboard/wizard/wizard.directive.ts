import { Directive, HostListener, ElementRef, Renderer2, OnInit, DoCheck } from '@angular/core';
import { WizardService } from './wizard.service';


@Directive({
  selector: '[appHomePage]'
})
export class WizardDirective implements OnInit, DoCheck {

  constructor(private elRef: ElementRef, private renderer: Renderer2, private homePageService: WizardService) { }

  numImages = 0;
  theta = 0;
  currentImage = 0;

  ngOnInit(): void {
    if (this.elRef.nativeElement.localName == "figure") {
      this.numImages = this.elRef.nativeElement.childElementCount;
      this.theta = 2 * Math.PI / this.numImages;
      this.homePageService.currentImage.subscribe(currentImage => {
        this.currentImage = currentImage;
      })
    }
  }

  ngDoCheck(): void {
    
    
    if (this.currentImage == -6 || this.currentImage == 6 || this.currentImage == 0) {
      this.homePageService.currentImage.next(0);
      this.homePageService.currentImageId.next(1);
    }
    if (this.currentImage == 1 || this.currentImage == -5) {
      this.homePageService.currentImageId.next(2);
    }
    if (this.currentImage == 2 || this.currentImage == -4) {
      this.homePageService.currentImageId.next(3);
    }
    if (this.currentImage == 3 || this.currentImage == -3) {
      this.homePageService.currentImageId.next(4);
    }
    if (this.currentImage == 4 || this.currentImage == -2) {
      this.homePageService.currentImageId.next(5);
    }
    if (this.currentImage == 5 || this.currentImage == -1) {
      this.homePageService.currentImageId.next(6);
    }
    this.renderer.setStyle(this.elRef.nativeElement, 'transform', 'rotateY(' + this.currentImage * -this.theta + 'rad)');
  }

}
