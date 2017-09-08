import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselV2MetaComponent } from './carousel-v2-meta.component';

describe('CarouselV2MetaComponent', () => {
  let component: CarouselV2MetaComponent;
  let fixture: ComponentFixture<CarouselV2MetaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarouselV2MetaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselV2MetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
