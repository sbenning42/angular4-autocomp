import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselV3Component } from './carousel-v3.component';

describe('CarouselV3Component', () => {
  let component: CarouselV3Component;
  let fixture: ComponentFixture<CarouselV3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarouselV3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselV3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
