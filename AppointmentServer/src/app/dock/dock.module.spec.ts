import { DockModule } from './dock.module';

describe('DockModule', () => {
  let dockModule: DockModule;

  beforeEach(() => {
    dockModule = new DockModule();
  });

  it('should create an instance', () => {
    expect(dockModule).toBeTruthy();
  });
});
