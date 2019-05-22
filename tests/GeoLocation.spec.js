import GeoLocation from '../src/js/Posts';

describe('TESTS: Post validate geo location', () => {
    test('validate: 51.50851, −0.12572', () => {
        const expected = () => GeoLocation.validateGeoLocation('51.50851, −0.12572');

        expect(expected).toBeTruthy();
    });

    test('validate: 51.50851,−0.12572', () => {
        const expected = () => GeoLocation.validateGeoLocation('51.50851,−0.12572');

        expect(expected).toBeTruthy();
    });

    test('validate: [51.50851, −0.12572]', () => {
        const expected = () => GeoLocation.validateGeoLocation('[51.50851, −0.12572]');

        expect(expected).toBeTruthy();
    });
});
