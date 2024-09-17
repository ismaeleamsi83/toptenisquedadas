import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayermessageComponent } from './playermessage.component';

describe('PlayermessageComponent', () => {
  let component: PlayermessageComponent;
  let fixture: ComponentFixture<PlayermessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayermessageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlayermessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
