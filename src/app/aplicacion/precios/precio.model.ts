export class Precio {
  id_game: number = 0;
  valid_from: Date = new Date();
  price: number = 0;
  creationtimestamp: Date = new Date();
  creationuser: string = '';
  modificationtimestamp?: Date | null;
  modificationuser?: string | null;
}
