import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ClipboardModule } from 'ngx-clipboard';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskModule } from 'ngx-mask';
import { CheckInsComponent } from 'src/app/pages/checkins/checkins.component';
import { CompanyProfileComponent } from 'src/app/pages/company-profile/company-profile.component';
import { NotificationsComponent } from 'src/app/pages/notifications/notifications.component';
import { CompaniesService } from 'src/app/services/companies/companies.service';
import { DashboardComponent } from '../../pages-originals/dashboard/dashboard.component';
import { IconsComponent } from '../../pages-originals/icons/icons.component';
import { MapsComponent } from '../../pages-originals/maps/maps.component';
import { TablesComponent } from '../../pages-originals/tables/tables.component';
import { UserProfileComponent } from '../../pages-originals/user-profile/user-profile.component';
import { AdminLayoutRoutes } from './admin-layout.routing';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    NgxMaskModule.forRoot(),
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TablesComponent,
    IconsComponent,
    MapsComponent,
    CheckInsComponent,
    CompanyProfileComponent,
    NotificationsComponent
  ],
  providers:[
    CompaniesService,
  ],
  exports:[
    RouterModule
  ]
})

export class AdminLayoutModule {}
