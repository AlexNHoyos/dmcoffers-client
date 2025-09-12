import { Publisher } from "../publishers/publisher.model.js";

export class Hosting {
  id: number = 0;
  name: string = '';
  creationuser: string = '';
  creationtimestamp: string | null = null;
  modificationuser?: string;
  modificationtimestamp?: string | null = null;
  status: boolean = false;
}

export class HostingPublisher {
  id: number = 0;
  publisher: Publisher = new Publisher();
  hosting: Hosting = new Hosting();
  storageType: string = '';
  storageAmmount: number | null = null;
  ramAmmount: number | null = null;
  cpuSpecs: string = '';
  uptimePercentage: number | null = null;

}
