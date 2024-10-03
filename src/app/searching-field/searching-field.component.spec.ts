import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchingFieldComponent } from './searching-field.component';

describe('SearchingFieldComponent', () => {
  let component: SearchingFieldComponent;
  let fixture: ComponentFixture<SearchingFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchingFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchingFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
