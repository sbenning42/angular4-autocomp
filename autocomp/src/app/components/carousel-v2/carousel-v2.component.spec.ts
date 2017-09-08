import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselV2Component } from './carousel-v2.component';

describe('CarouselV2Component', () => {
  let component: CarouselV2Component;
  let fixture: ComponentFixture<CarouselV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarouselV2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
