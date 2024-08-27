import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',

  standalone: true,
  imports: [MatButtonModule, MatDividerModule, MatIconModule]
})
export class ButtonComponent {

}
