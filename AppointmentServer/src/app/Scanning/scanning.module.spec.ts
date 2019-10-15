import { ScanningModule } from './scanning.module';

describe('ScanningModule', () => {
  let scanningModule: ScanningModule;

  beforeEach(() => {
    scanningModule = new ScanningModule();
  });

  it('should create an instance', () => {
    expect(scanningModule).toBeTruthy();
  });
});
