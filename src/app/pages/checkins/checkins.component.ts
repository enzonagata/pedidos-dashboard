import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { CheckinService } from 'src/app/services/checkin/checkin.service';

@Component({
  selector: 'app-checkins',
  templateUrl: './checkins.component.html',
  styleUrls: ['./checkins.component.scss']
})
export class CheckInsComponent implements OnInit {
  public checkins: any = []
  public recentCheckin: any = [];
  public recentDataCheckin: any;
  constructor(
    private checkinService: CheckinService
  ) { }

  ngOnInit() {
    this.getCheckins();
  }

  getCheckins() {
    this.checkinService.getCheckins().subscribe(
      {
        next: (res) => {
          const realDateNow = new Date(Date.now());
          const recentDate = moment(realDateNow).format('YYYY-MM-DD');
          const lastCheckInFilter = res.filter((x: any) => x.date === recentDate.toString());
          this.checkins = res;
          this.recentCheckin = (lastCheckInFilter.length > 0) ? lastCheckInFilter[0] : res[0];
        }
      }
    );
  }
}
