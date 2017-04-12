import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PanelModule } from 'primeng/primeng';

import { ServicestatusComponent } from './servicestatus.component';

describe('ServicestatusComponent', () => {
  let component: ServicestatusComponent;
  let fixture: ComponentFixture<ServicestatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ServicestatusComponent],
      imports: [PanelModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicestatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
