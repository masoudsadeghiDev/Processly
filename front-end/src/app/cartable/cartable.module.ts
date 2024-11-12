import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartableRoutingModule } from './cartable-routing.module';
import { CartableComponent } from './cartable.component';
import { ThemeModule } from 'app/@theme/theme.module';
import { NbMenuModule } from '@nebular/theme';



@NgModule({
  declarations: [CartableComponent],
  imports: [
    CommonModule,
    CartableRoutingModule,
    ThemeModule,
    NbMenuModule,
  ]
})
export class CartableModule { }
