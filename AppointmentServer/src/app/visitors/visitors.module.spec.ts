import { VisitorsModule } from './visitors.module';

describe('VisitorsModule', () => {
  let visitorsModule: VisitorsModule;

  beforeEach(() => {
    visitorsModule = new VisitorsModule();
  });

  it('should create an instance', () => {
    expect(visitorsModule).toBeTruthy();
  });
});
