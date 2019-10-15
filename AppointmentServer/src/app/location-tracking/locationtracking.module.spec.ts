import { LocationtrackingModule } from './locationtracking.module';

describe('LocationtrackingModule', () => {
  let locationtrackingModule: LocationtrackingModule;

  beforeEach(() => {
    locationtrackingModule = new LocationtrackingModule();
  });

  it('should create an instance', () => {
    expect(locationtrackingModule).toBeTruthy();
  });
});
