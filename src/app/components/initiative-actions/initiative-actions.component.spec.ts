import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitiativeActionsComponent } from './initiative-actions.component';

describe('InitiativeActionsComponent', () => {
  let component: InitiativeActionsComponent;
  let fixture: ComponentFixture<InitiativeActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InitiativeActionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InitiativeActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
