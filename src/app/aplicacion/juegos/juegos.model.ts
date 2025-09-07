export class Juego {
  id: number = 0;
  gamename: string = '';
  release_date: string | null = null;
  publishment_date: string | null = null;
  creationtimestamp: string | null = null;
  creationuser: string = '';
  modificationtimestamp?: string | null = null;
  modificationuser?: string | null;
  publisherName: string = '';
  developerName: string = '';
  categoriasNames: string[] = [];
  price?: number;
  image_path?:string | null = null;
  isInWishlist?: boolean;
  isInLibrary?: boolean;
}