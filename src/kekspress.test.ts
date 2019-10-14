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

    test(`when calling it with param 1, it skips 1 stop so 2 passengers quit(1 and 2)`, () => {
      const kekspress = defaultKekspress();
      kekspress.nextStop(1);
      expect(kekspress.getPassengers()).toEqual(['3']);
    });
  });

  describe('board', () => {
    test(`Add passenger to empty train`, () => {
      const kekspress = new Kekspress(9);
      kekspress.board('1', 1);
      expect(kekspress.getPassengers()).toEqual(['1']);
    });

    test(`Add passengers to empty train in call order`, () => {
      const kekspress = new Kekspress(9);
      kekspress.board('1', 1);
      kekspress.board('2', 1);
      expect(kekspress.getPassengers()).toEqual(['1', '2']);
    });

    test(`Add passengers to train which already has passenger with name throws error`, () => {
      const kekspress = new Kekspress(9);
      kekspress.board('1', 1);
      try {
        kekspress.board('1', 1);
        fail();
      } catch (e) {
        expect(e.message).toEqual(`Name 1 already boarded`);
      }
    });

    test(`Cannot add passenger if train is full`, () => {
      const kekspress = new Kekspress(2);
      kekspress.board('1', 1);
      kekspress.board('2', 2);
      kekspress.board('3', 3);
      expect(kekspress.getPassengers()).toEqual(['1', '2']);
    });
  });

  describe('getOff', () => {
    test(`If wrong name given returns original list`, () => {
      const kekspress = defaultKekspress();
      kekspress.getOff('not existing name');
      expect(kekspress.getPassengers()).toEqual(['1', '2', '3']);
    });

    test(`Returns undefined if no passengers`, () => {
      const kekspress = new Kekspress(9);
      const quiter = kekspress.getOff('1');
      expect(kekspress.getPassengers()).toEqual([]);
      expect(quiter).toEqual(undefined);
    });

    test(`Removes passenger 1 and return it`, () => {
      const kekspress = defaultKekspress();
      const quiter = kekspress.getOff('1');
      expect(kekspress.getPassengers()).toEqual(['2', '3']);
      expect(quiter).toEqual({ name: '1', getOffAt: 1 });
    });
  });
});
