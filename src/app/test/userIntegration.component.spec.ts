import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { UsuariosComponent } from "../aplicacion/usuarios/usuarios.component";
import { UserService } from "../services/user/user.service";

// Angular Material
import { MatDialogModule, MatDialog } from "@angular/material/dialog";
import { MatTableModule } from "@angular/material/table";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { FormsModule } from "@angular/forms";
import { provideNativeDateAdapter } from "@angular/material/core";
import { provideHttpClient } from "@angular/common/http";

const mockUsers = [
  { idUser: 1, username: "user1", role: "admin", rolDescription: "Administrator", rolDesc: "Admin role" },
  { idUser: 2, username: "user2", role: "user", rolDescription: "User", rolDesc: "User role" }
];

describe("UsuariosComponent - Integration Test", () => {
  let fixture: ComponentFixture<UsuariosComponent>;
  let component: UsuariosComponent;
  let userService: UserService;
  let httpMock: HttpTestingController;
  let dialog: MatDialog;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsuariosComponent],
      imports: [
        FormsModule,
        BrowserAnimationsModule,
        MatDialogModule,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatIconModule,
        MatExpansionModule,
        MatDatepickerModule
      ],
      providers: [
        UserService,
        provideHttpClient(),
        provideHttpClientTesting(),
        provideNativeDateAdapter()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UsuariosComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
    dialog = TestBed.inject(MatDialog);
  });

  afterEach(() => {
    httpMock.verify(); // asegura que no queden requests abiertas
  });

  it("debería renderizar la tabla con usuarios cargados", fakeAsync(() => {
    fixture.detectChanges(); // dispara ngOnInit() que llama getAllUsers

    const req = httpMock.expectOne('http://localhost:3000/api/users/findall');
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers); // respondemos con datos mock

    tick();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const rows = compiled.querySelectorAll('tr[mat-row]');
    expect(rows.length).toBe(mockUsers.length);
    expect(compiled.textContent).toContain('user1');
    expect(compiled.textContent).toContain('user2');
  }));

  /*it("debería abrir el dialog de edición con MatDialog real", fakeAsync(() => {
    fixture.detectChanges();
    const req = httpMock.expectOne('http://localhost:3000/api/users/findall');
    req.flush(mockUsers);
    tick();
    fixture.detectChanges();

    spyOn(dialog, 'open').and.callThrough(); // espía la llamada al dialog
    component.openEditDialog(mockUsers[0].idUser);

    const userReq = httpMock.expectOne(`http://localhost:3000/api/users/${mockUsers[0].idUser}`);
    expect(userReq.request.method).toBe('GET');
    userReq.flush(mockUsers[0]);

    tick();
    fixture.detectChanges();

    expect(dialog.open).toHaveBeenCalled();
  }));*/
});
