export interface Publisher {
  id: string;
  publishername: string;
  foundation_date: Date | null;
  dissolution_date?: Date | null;
  status: string;
  creationtimestamp: string;
  creationuser: string;
  modificationtimestamp?: Date | null;
  modificationuser?: string;
}
