import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { increment } from 'src/app/reducers/actions/company.actions';
import { CompaniesService } from 'src/app/services/companies/companies.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

  constructor(
    private companiesService: CompaniesService,
    private store: Store<{ company: any }>
  ) { }

  ngOnInit() {
    this.getCompany();
  }
  getCompany() {
    this.companiesService.getCompany().subscribe(res => {
      this.store.dispatch(increment(res[0]))
    })
  }


}
