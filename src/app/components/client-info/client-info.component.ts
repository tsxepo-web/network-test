import { Component, OnInit } from '@angular/core';
import { UserInfoService } from 'src/app/services/user/user-info.service';

@Component({
  selector: 'app-client-info',
  templateUrl: './client-info.component.html',
  styleUrls: ['./client-info.component.css']
})
export class ClientInfoComponent implements OnInit {
  clientInfoService: any;

  constructor(private userInfoService: UserInfoService) { }
  clientInfo: any = {};
  userId: string = '';

  ngOnInit(): void {
    this.fetchClientInfo();
    this.userId = this.userInfoService.getUserId();
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