import { Component, OnInit } from '@angular/core';
import { Publisher } from '../publisher.model';
import { PublisherService } from '../publisher.service';

@Component({
  selector: 'app-publisher-list',
  templateUrl: './publisher-list.component.html',
  styleUrls: ['./publisher-list.component.scss'],
})
export class PublisherListComponent implements OnInit {
  publishers: Publisher[] = [];
  displayedColumns: string[] = [
    'id',
    'publishername',
    'foundation_date',
    'dissolution_date',
    'status',
    'creationtimestamp',
    'creationuser',
    'modificationtimestamp',
    'modificationuser',
    'edit',
    'delete',
  ];
  showTable: boolean = false;
  buttonText: string = 'Mostrar Publishers';

  constructor(private publisherService: PublisherService) {}

  togglePublishers() {
    if (this.showTable) {
      // Oculta la tabla
      this.showTable = false;
      this.buttonText = 'Mostrar Publishers'; // Cambia el texto del botón
    } else {
      // Carga y muestra la tabla
      this.loadPublishers();
      // Muestra la tabla
      this.showTable = true;
      this.buttonText = 'Ocultar publishers'; // Cambia el texto del botón
    }
  }
  ngOnInit(): void {
    // Con esta funcion se puede cargar los publishers al inicio
    // this.loadPublishers();
    this.publisherService.getAll('', '', 1).subscribe((data) => {
      console.log(data);
    });
  }

  loadPublishers(): void {
    this.showTable = true;
    this.publisherService.getAll('', '', 1).subscribe((data) => {
      //this.publishers = data;
    });
  }

  editPublisher(publisher: Publisher): void {
    // Lógica para editar el publisher
    console.log('Editar publisher', publisher);
  }

  deletePublisher(publisher: Publisher): void {
    // Lógica para eliminar el publisher
    console.log('Eliminar publisher', publisher);
  }
}
