import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';

import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatChipListbox, MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatCardActions, MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, MatNativeDateModule, NativeDateAdapter } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { LoginComponent } from './auth/login/login.component';
import { NavComponent } from './shared/nav/nav.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { AlertService } from './components/alert/alert.service';

import { JwtInterceptorService } from './services/auth/jwt-interceptor.service';
import { ErrorInterceptorService } from './services/auth/error-interceptor.service';
import { LoadingInterceptor } from './components/loading.interceptor';

import { PublisherService } from './aplicacion/publishers/publisher.service';
import { PublisherComponent } from './aplicacion/publishers/publishers.component';
import { PublisherCreateComponent } from './aplicacion/publishers/publisher-create/publisher-create.component';
import { PublisherUpdateComponent } from './aplicacion/publishers/publisher-update/publisher-update.component';
import { PublisherDeleteComponent } from './aplicacion/publishers/publisher-delete/publisher-delete.component';
import { PublisherDetailComponent } from './aplicacion/publishers/publisher-detail/publisher-detail.component';
import { CategoriasComponent } from './aplicacion/categorias/categorias.component';
import { CategoriaCreateComponent } from './aplicacion/categorias/categoria-create/categoria-create.component';
import { CategoriaDeleteComponent } from './aplicacion/categorias/categoria-delete/categoria-delete.component';
import { CategoriaDetailComponent } from './aplicacion/categorias/categoria-detail/categoria-detail.component';
import { CategoriaUpdateComponent } from './aplicacion/categorias/categoria-update/categoria-update.component';
import { CategoriaService } from './aplicacion/categorias/categoria.service';
import { DesarrolladoresComponent } from './aplicacion/desarrolladores/desarrolladores.component';
import { DesarrolladoresService } from './aplicacion/desarrolladores/desarrolladores.service';
import { DesarrolladoresCreateComponent } from './aplicacion/desarrolladores/desarrolladores-create/desarrolladores-create.component';
import { DesarrolladoresDetailComponent } from './aplicacion/desarrolladores/desarrolladores-detail/desarrolladores-detail.component';
import { DesarrolladoresUpdateComponent } from './aplicacion/desarrolladores/desarrolladores-update/desarrolladores-update.component';
import { DesarrolladoresDeleteComponent } from './aplicacion/desarrolladores/desarrolladores-delete/desarrolladores-delete.component';
import { HostingComponent } from './aplicacion/hosting/hosting.component';
import { HostingCreateComponent } from './aplicacion/hosting/hosting-create/hosting-create.component';
import { HostingDeleteComponent } from './aplicacion/hosting/hosting-delete/hosting-delete.component';
import { HostingDetailComponent } from './aplicacion/hosting/hosting-detail/hosting-detail.component';
import { HostingUpdateComponent } from './aplicacion/hosting/hosting-update/hosting-update.component';
import { SupportTicketComponent } from './aplicacion/support-ticket/support-ticket.component';
import { SupportTicketCreateComponent } from './aplicacion/support-ticket/support-ticket-create/support-ticket-create.component';
import { SupportTicketDeleteComponent } from './aplicacion/support-ticket/support-ticket-delete/support-ticket-delete.component';
import { SupportTicketDetailComponent } from './aplicacion/support-ticket/support-ticket-detail/support-ticket-detail.component';
import { SupportTicketUpdateComponent } from './aplicacion/support-ticket/support-ticket-update/support-ticket-update.component';
import { RegisterComponent } from './auth/register/register.component';
import { RegisterService } from './services/auth/register.service';
import { HomeComponent } from './pages/home/home.component';
import { JuegosComponent } from './aplicacion/juegos/juegos.component';
import { JuegoDetailComponent } from './aplicacion/juegos/juego-detail/juego-detail.component';
import { ResultadosBusquedaComponent } from './aplicacion/juegos/resultados-busqueda/resultados-busqueda.component';
import { JuegoListComponent } from './aplicacion/juegos/juego-list/juego-list.component';
import { JuegosCrudComponent } from './aplicacion/juegos/juegos-crud/juegos-crud.component';
import { JuegoCreateComponent } from './aplicacion/juegos/juegos-crud/juego-create/juego-create.component';
import { JuegoDeleteComponent } from './aplicacion/juegos/juegos-crud/juego-delete/juego-delete.component';
import { JuegoUpdateComponent } from './aplicacion/juegos/juegos-crud/juego-update/juego-update.component';
import { JuegoDetailDialogComponent } from './aplicacion/juegos/juegos-crud/juego-detail-dialog/juego-detail-dialog.component';
import { NotAuthorizedComponent } from './components/not-authorized/not-authorized.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { WishlistService } from './aplicacion/juegos/wishlist.service';
import { PersonalDetailsComponent } from './pages/personal-details/personal-details.component';
import { SoporteComponent } from './components/soporte/soporte.component';
import { UsuariosComponent } from './aplicacion/usuarios/usuarios.component';
import { UpdateRolComponent } from './aplicacion/usuarios/update-rol/update-rol.component';
import { SweItemMenuComponent } from './components/sweitemmenu/sweitemmenu.component';
import { SweItemMenuService } from './components/sweitemmenu/sweitemmenu.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu'
import { CartService } from './aplicacion/juegos/cart.service';
import { CartComponent } from './pages/cart/cart.component';
import { LibraryComponent } from './pages/library/library.component';
import { JuegosPorCategoriaComponent } from './aplicacion/juegos/juegos-por-categoria/juegos-por-categoria.component';
import { LoadingOverlayComponent } from './components/loading-overlay/loading-overlay.component';
import { CarouselModule } from './components/carousel/carousel.module';
import { HelpDialogComponent } from './components/help-dialog/help-dialog.component';
import { ThemeToggleComponent } from './components/theme-toggle/theme-toggle.component';
import { DropdownSelectComponent } from './components/dropdown-selector/dropdown-selector.component';
import { ResetPassComponent } from './auth/resetPass/resetPass.component';
import { ForgotPassComponent } from './auth/forgotPass/forgotPass.component';
import { registerLocaleData } from '@angular/common';
import localeEsAr from '@angular/common/locales/es-AR';

registerLocaleData(localeEsAr); // 👈 Esto registra el locale

@NgModule({
    declarations: [
        AppComponent,
        ErrorDialogComponent,
        DashboardComponent,
        FooterComponent,
        HeaderComponent,
        LoginComponent,
        NavComponent,
        PersonalDetailsComponent,
        ConfirmComponent,
        PublisherComponent,
        PublisherCreateComponent,
        PublisherUpdateComponent,
        PublisherDeleteComponent,
        PublisherDetailComponent,
        CategoriasComponent,
        CategoriaCreateComponent,
        CategoriaDeleteComponent,
        CategoriaDetailComponent,
        CategoriaUpdateComponent,
        DesarrolladoresComponent,
        DesarrolladoresCreateComponent,
        DesarrolladoresDetailComponent,
        DesarrolladoresUpdateComponent,
        DesarrolladoresDeleteComponent,
        HostingComponent,
        HostingCreateComponent,
        HostingDeleteComponent,
        HostingDetailComponent,
        HostingUpdateComponent,
        SupportTicketComponent,
        SupportTicketCreateComponent,
        SupportTicketDeleteComponent,
        SupportTicketDetailComponent,
        SupportTicketUpdateComponent,
        RegisterComponent,
        HomeComponent,
        JuegosComponent,
        JuegoDetailComponent,
        ResultadosBusquedaComponent,
        JuegoListComponent,
        JuegosCrudComponent,
        JuegoCreateComponent,
        JuegoDeleteComponent,
        JuegoUpdateComponent,
        JuegoDetailDialogComponent,
        NotAuthorizedComponent,
        WishlistComponent,
        SoporteComponent,
        UsuariosComponent,
        UpdateRolComponent,
        SweItemMenuComponent,
        CartComponent,
        LibraryComponent,
        JuegosPorCategoriaComponent,
        LoadingOverlayComponent,
        HelpDialogComponent,
        ThemeToggleComponent,
        DropdownSelectComponent,
        ResetPassComponent,
        ForgotPassComponent
    ],
    bootstrap: [AppComponent], imports: [CommonModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatDialogModule,
        MatToolbarModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatIconModule,
        MatCardModule,
        MatCardActions,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSelectModule,
        MatExpansionModule,
        MatDividerModule,
        MatSnackBarModule,
        MatListModule,
        MatSidenavModule,
        MatMenuModule,
        MatProgressSpinnerModule,
        CarouselModule,
        MatChipsModule,
        MatTooltipModule,
    ]
    , providers: [
        WishlistService,
        CartService,
        RegisterService,
        PublisherService,
        CategoriaService,
        AlertService,
        DesarrolladoresService,
        RegisterService,
        SweItemMenuService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptorService,
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorInterceptorService,
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: LoadingInterceptor,
            multi: true
        },
        provideHttpClient(withInterceptorsFromDi()),
        { provide: LOCALE_ID, useValue: 'es-AR' },
    ]
})
export class AppModule { }
