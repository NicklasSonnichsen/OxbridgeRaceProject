import { RaceForm } from './race-form';

describe('RaceForm', () => {
  it('should create an instance', () => {
    expect(new RaceForm(0,"", false, false, "", "", [])).toBeTruthy();
  });
});
