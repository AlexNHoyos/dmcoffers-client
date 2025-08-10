import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dropdown-selector',
  templateUrl: './dropdown-selector.component.html',
  styleUrls: ['./dropdown-selector.component.scss']
})
export class DropdownSelectComponent {
  @Input() label: string = '';                  // Texto de la etiqueta
  @Input() options: string[] = [];              // Lista de opciones
  @Input() multiple: boolean = false;           // Si permite seleccionar varias
  @Input() value: string  = '';                 // Valor actual
  @Input() placeholderAll: string = '';         // Opción "Todas" opcional

  @Output() valueChange = new EventEmitter<string >();

  onValueChange(value: any) {
    this.valueChange.emit(value);
  }
}