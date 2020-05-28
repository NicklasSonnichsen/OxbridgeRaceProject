import { GpsLocation } from './gps-location';

describe('GpsLocation', () => {
  it('should create an instance', () => {
    expect(new GpsLocation("", "", 0, 0)).toBeTruthy();
  });
});
