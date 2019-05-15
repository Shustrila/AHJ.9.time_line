import Posts from '../src/js/Posts';

describe('TESTS: Post validate geo location', () => {
   let post = {};

   beforeAll = () => {
       post = new Posts();
   };

    test('validate: 51.50851, −0.12572', () => {
        const expected = () => post.validateGeoLocation('51.50851, −0.12572');

        expect(expected).toBeTruthy();
    });

    test('validate: 51.50851,−0.12572', () => {
        const expected = () => post.validateGeoLocation('51.50851, −0.12572');

        expect(expected).toBeTruthy();
    });

    test('validate: [51.50851, −0.12572]', () => {
        const expected = () => post.validateGeoLocation('51.50851, −0.12572');

        expect(expected).toBeTruthy();
    });
});
