import { Component, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { SpeedDataService } from 'src/app/services/speed-data/speed-data.service';
import { UserInfoService } from 'src/app/services/user/user-info.service';

@Component({
  selector: 'app-client-info',
  templateUrl: './client-info.component.html',
  styleUrls: ['./client-info.component.css']
})
export class ClientInfoComponent implements OnInit {
  downloadSpeed: number = 0;
  uploadSpeed: number = 0;

  constructor(
    private userInfoService: UserInfoService,
    private speedDataService: SpeedDataService) { }

  clientInfo: any = {};
  userId: string = '';

  ngOnInit(): void {
    this.speedDataService.downloadSpeed$.subscribe(speed => {
      this.downloadSpeed = speed;
    });

    this.speedDataService.uploadSpeed$.subscribe(speed => {
      this.uploadSpeed = speed;
    });
    this.fetchClientInfo();
    this.userId = this.userInfoService.getUserId();
  }
  ngOnChanges(changes: SimpleChanges): void {

  }
  fetchClientInfo() {
    this.userInfoService.getUserInfo().subscribe(
      (data) => {
        this.clientInfo = data;
        this.userInfoService.storeUserInfoInSessionStorage(data.ip_address, data.connection.organization_name, data.city);
      },
      (error) => {
        console.error('Error fetching client info', error);

      }
    );
  }
}