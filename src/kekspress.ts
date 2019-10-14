interface KekspressPassenger {
  name: string;
  getOffAt: number;
}

class Keksception extends Error {}

export class Kekspress {
  private passengers: KekspressPassenger[] = [];
  private currentStop: number = 0;

  constructor(public maxSeats: number) {}

  getPassengers(): string[] {
    return this.passengers.map(({ name }) => name);
  }

  nextStop(skipping = 0) {
    this.currentStop += skipping + 1;
    this.passengers = this.passengers.reduce((newPassangers: KekspressPassenger[], passenger) => {
      if (passenger.getOffAt > this.currentStop) {
        newPassangers.push(passenger);
      }
      return newPassangers;
    }, []);
  }

  board(name: string, getOffAt: number) {
    if (this.passengers.find(seat => seat.name === name)) {
      throw new Keksception(`Name ${name} already boarded`);
    }
    if (this.passengers.length < this.maxSeats) {
      this.passengers.push({ name, getOffAt });
    }
  }

  getOff(name: string): KekspressPassenger | undefined {
    const getOffIndex = this.passengers.findIndex(passenger => passenger.name === name);
    if (getOffIndex != -1) {
      return this.passengers.splice(getOffIndex, 1)[0];
    }
  }
}
