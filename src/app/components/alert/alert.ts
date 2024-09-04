export class Alert {
  type: AlertType;
  message: string;
  notifyElement: any;
  constructor(type: AlertType, message: string, notifyElement: any) {
    this.type = type;
    this.message = message;
    this.notifyElement = notifyElement;
  }
}

export enum AlertType {
  Success,
  Error,
  Info,
  Warning,
}
