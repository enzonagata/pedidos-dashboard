import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages-originals/dashboard/dashboard.component';
import { IconsComponent } from '../../pages-originals/icons/icons.component';
import { CheckInsComponent } from 'src/app/pages/checkins/checkins.component';
import { CompanyProfileComponent } from 'src/app/pages/company-profile/company-profile.component';
import { NotificationsComponent } from 'src/app/pages/notifications/notifications.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'check-ins', component: CheckInsComponent },
    { path: 'company-profile', component: CompanyProfileComponent },
    { path: 'messages', component: NotificationsComponent },
    // { path: 'tables', component: TablesComponent },
    { path: 'icons', component: IconsComponent },
    // { path: 'maps', component: MapsComponent }
];
