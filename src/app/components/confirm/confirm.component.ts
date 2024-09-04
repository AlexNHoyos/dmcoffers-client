import { Component, OnInit } from '@angular/core';
import { DialogService, DialogComponent } from 'ng2-bootstrap-modal';
import { TranslateService } from '@ngx-translate/core';

export interface ConfirmModel {
  title: string;
  message: string;
  notificationType?: string;
}

@Component({
  selector: 'confirm',
  styleUrls: ['./confirm.component.css'],
  templateUrl: './confirm.component.html',
})
export class ConfirmComponent
  extends DialogComponent<ConfirmModel, boolean>
  implements ConfirmModel
{
  title: string = '';
  message: string = '';
  notificationType: string = '';
  ok: string = '';
  cancel: string = '';

  constructor(
    dialogService: DialogService,
    private translate: TranslateService
  ) {
    super(dialogService);
  }
  confirm() {
    // we set dialog result as true on click on confirm button,
    // then we can get dialog result from caller code
    this.result = true;
    this.close();
  }

  ngOnInit() {
    if (!this.notificationType) {
      this.translate.get('COMMON.OK').subscribe((phrase: string) => {
        this.ok = phrase;
      });
      this.translate.get('COMMON.CANCEL').subscribe((phrase: string) => {
        this.cancel = phrase;
      });
    }

    if (this.notificationType === 'comun') {
      this.translate.get('COMMON.OKAY').subscribe((phrase: string) => {
        this.ok = phrase;
      });
    }
  }
}
