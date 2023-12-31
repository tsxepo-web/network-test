import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ChartConfiguration, ChartType } from 'chart.js/auto';
import { BackendService } from 'src/app/services/Backend/backend.service';
import { UserInfoService } from 'src/app/services/user/user-info.service';


@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {
  ispResults: any[] = [];
  chart: any;
  isps: any[] = [];

  ngOnInit(): void {
    this.getResults();
    this.createChart();
  }
  constructor(
    private backendService: BackendService,
    private userInfoService: UserInfoService) { }

  getResults() {
    const userInfo = this.userInfoService.getUserInfoFromSessionStorage();
    const location = userInfo?.city || 'Unknown City';
    this.backendService.getIspResult(location!).subscribe(
      (data: any) => {
        this.ispResults = data.isPs;
        //console.log(this.ispResults);
        console.log(this.ispResults.map(d => d.isp));
      }
    );
  }

  createChart() {
    this.chart = new Chart('bar-chart', {
      type: 'bar',
      data: {
        labels: ['blue', 'black', 'green', 'red'], //this.ispResults.map(d => d.isp)
        datasets: [{
          label: 'download speed',
          data: [1, 2, 3, 4],//this.ispResults.map(d => d.downloadSpeed),
          backgroundColor: '#c5d5cb'
        },
        {
          label: "upload speed",
          data: [4, 3, 2, 1],//this.ispResults.map(d => d.uploadSpeed),
          backgroundColor: '#e3e0cf'
        }]
      },
      options: {
        aspectRatio: 2.5
      }
    });
  }
}
