import { Kekspress } from './kekspress';

function defaultKekspress(): Kekspress {
  const kekspress = new Kekspress(9);
  kekspress.board('1', 1);
  kekspress.board('2', 2);
  kekspress.board('3', 3);
  return kekspress;
}

describe('Kekspress', () => {
  describe('getPassengers', () => {
    test(`should return 0 passengers if the Kekspress is empty`, () => {
      const kekspress = new Kekspress(9);
      expect(kekspress.getPassengers()).toHaveLength(0);
    });

    test(`should return 1 passenger's name if there is one`, () => {
      const kekspress = new Kekspress(9);
      kekspress.board('1', 1);
      expect(kekspress.getPassengers()).toEqual(['1']);
    });

    test(`should return all passenger's name if there is more`, () => {
      const kekspress = defaultKekspress();
      expect(kekspress.getPassengers()).toEqual(['1', '2', '3']);
    });
  });

  describe('nextStop', () => {
    test(`when calling it without param, it only makes 1 passenger quit`, () => {
      const kekspress = defaultKekspress();
      kekspress.nextStop();
      expect(kekspress.getPassengers()).toEqual(['2', '3']);
    });

    test(`when calling it with param 1, it makes 2 passengers quit`, () => {
      const kekspress = defaultKekspress();
      kekspress.nextStop(1);
      expect(kekspress.getPassengers()).toEqual(['3']);
    });
  });

  describe('board', () => {});

  describe('getOff', () => {});
});
