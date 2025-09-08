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
  publisher: number = 0;
  hosting: number = 0;
  storageType: string = '';
  storageAmmount: number = 0;
  ramAmmount: number = 0;
  cpuSpecs: string = '';
  uptimePercentage: number = 0;
}
