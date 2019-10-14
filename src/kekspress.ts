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
    this.passengers.filter(({ getOffAt }) => getOffAt <= this.currentStop).forEach(({ name }) => this.getOff(name));
  }

  board(newName: string, getOffAt: number) {
    if (this.passengers.find(({ name }) => name === newName)) {
      throw new Keksception(`Name ${newName} already boarded`);
    }
    if (this.passengers.length < this.maxSeats) {
      this.passengers.push({ name: newName, getOffAt });
    }
  }

  getOff(name: string): KekspressPassenger | undefined {
    const quiter = this.passengers.find(p => p.name === name);
    this.passengers = this.passengers.filter(p => p.name !== name);
    return quiter;
  }
}
