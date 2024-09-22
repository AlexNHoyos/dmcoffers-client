import { Injectable, Injector } from '@angular/core';

export class LocatorService {
  // Puedes definir un Injector estático si es necesario
  public static injector: Injector = Injector.create({ providers: [] });

  public static getInstance<T>(token: any): T {
    return LocatorService.injector.get<T>(token);
  }
}
