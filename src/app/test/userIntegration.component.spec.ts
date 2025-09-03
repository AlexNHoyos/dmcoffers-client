import { ComponentFixture, TestBed, fakeAsync, tick, flush } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";

import { UsuariosComponent } from "../aplicacion/usuarios/usuarios.component";

import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";

import { UserService } from "../services/user/user.service";

import { MatTableModule } from "@angular/material/table";
import { MatIconModule } from "@angular/material/icon";

import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { of } from "rxjs";

const mockUsers = [
  { id: 1, idUser: 1, username: "user1", role: "admin", rolDescription: "Administrator", rolDesc: "Admin role" },
  { id: 2, idUser: 2, username: "user2", role: "user", rolDescription: "User", rolDesc: "User role" },
  { id: 3, idUser: 3, username: "user3", role: "user", rolDescription: "User", rolDesc: "User role" }
];

describe("UsuariosComponent", () => {
  let component: UsuariosComponent;
  let fixture: ComponentFixture<UsuariosComponent>;
  let authServiceSpy: jasmine.SpyObj<UserService>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj("UserService", [
      "getAllUsers", "getUser", "updateUser", "deleteUser", "createUser"
    ]);

    const dialogMock = jasmine.createSpyObj("MatDialog", ["open", "closeAll", "afterClosed"]);

    await TestBed.configureTestingModule({
      declarations: [UsuariosComponent],
      imports: [FormsModule, MatTableModule, MatDialogModule, MatIconModule],
      providers: [
        { provide: UserService, useValue: spy },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        { provide: MatDialog, useValue: dialogMock },
      ],
    }).compileComponents();

    authServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    authServiceSpy.getAllUsers.and.returnValue(of(mockUsers)); 

    fixture = TestBed.createComponent(UsuariosComponent);
    component = fixture.componentInstance;
    dialogSpy = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
    fixture.detectChanges();
  });

  /* Boton eliminado

  it("Debería mostrar la tabla de usuarios al hacer click en el botón", fakeAsync(() => {
    authServiceSpy.getAllUsers.and.returnValue(of(mockUsers));

    //component.buttonText = "Mostrar Usuarios";
    component.displayedColumns = ["id", "user", "actions"];

    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector("button") as HTMLButtonElement;

    expect(button).withContext("No se encontró botón").not.toBeNull();
    expect(button.textContent?.trim().toLocaleLowerCase()).toContain("mostrar usuarios");

    button!.click();
    tick();
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    expect(button.textContent?.trim().toLocaleLowerCase()).toContain("ocultar usuarios");
    //expect(component.showTable).toBeTrue();
    expect(authServiceSpy.getAllUsers).toHaveBeenCalled();

    const rows = compiled.querySelectorAll("tr[mat-row]");
    expect(rows.length).toBe(mockUsers.length);
  }));*/

  it("Debería abrir el dialog de editar con ID correcto", fakeAsync(() => {
    const mockDialogRef = {
      afterClosed: () => of(true),
    };

    authServiceSpy.getUser.and.returnValue(of(mockUsers[0]));
    authServiceSpy.getAllUsers.and.returnValue(of(mockUsers));

    dialogSpy.open.and.returnValue(mockDialogRef as any);

    component.openEditDialog(mockUsers[0].idUser);
    tick();

    expect(authServiceSpy.getUser).toHaveBeenCalledOnceWith(mockUsers[0].idUser);
    expect(dialogSpy.open).toHaveBeenCalled();
  }));
});
