import { RacesStartedModel } from './races-started-model';

describe('RacesStartedModel', () => {
  it('should create an instance', () => {
    expect(new RacesStartedModel(0, false)).toBeTruthy();
  });
});
