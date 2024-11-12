import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WizardService {

  currentImage: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  currentImageId: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  constructor() { }
}
