export interface Publisher {
  id: string;
  publishername: string;
  foundation_date: Date | null;
  dissolution_date?: Date | null; // Campo opcional
  status: string;
  creationtimestamp: string;
  creationuser: string;
  modificationtimestamp?: Date | null; // Campo opcional
  modificationuser?: string; // Campo opcional
}
