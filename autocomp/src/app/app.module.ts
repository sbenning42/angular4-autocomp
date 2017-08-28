import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import 'hammerjs';

import { ReactiveFormsModule } from '@angular/forms';

import {
  MdAutocompleteModule,
  MdCheckboxModule,
  MdInputModule,
  MdSelectModule,
  MdSliderModule,
  MdSlideToggleModule,
  MdToolbarModule,
  MdCardModule,
  MdButtonModule,
  MdIconModule,
  MdProgressSpinnerModule,
  MdTooltipModule
} from '@angular/material';

import { NgModule } from '@angular/core';

import { ResourceService } from './services/resource.service';

import { AppComponent } from './app.component';
import { SmartFormComponent } from './components/smart-form/smart-form.component';
import { SpinComponent } from './components/spin/spin.component';
import { FormComponent } from './components/smart-form/form/form.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { ResponsiveCarouselComponent } from './components/responsive-carousel/responsive-carousel.component';

@NgModule({
  declarations: [
    AppComponent,
    SmartFormComponent,
    SpinComponent,
    FormComponent,
    GalleryComponent,
    CarouselComponent,
    ResponsiveCarouselComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MdAutocompleteModule,
    MdCheckboxModule,
    MdInputModule,
    MdSelectModule,
    MdSliderModule,
    MdSlideToggleModule,
    MdToolbarModule,
    MdCardModule,
    MdButtonModule,
    MdIconModule,
    MdProgressSpinnerModule,
    MdTooltipModule,
  ],
  providers: [
    ResourceService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
