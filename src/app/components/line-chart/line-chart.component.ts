import { Component, OnInit, Type } from '@angular/core';
import { BackendService } from 'src/app/services/Backend/backend.service';
import { ChartConfiguration, ChartType } from 'chart.js/auto';
import 'chartjs-adapter-moment';
import { Chart } from 'chart.js';
@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {
  historicalData: any[] = [];
  date: any[] = [];
  uploadSpeed: number[] = [];
  downloadSpeed: number[] = [];
  chart: any;

  constructor(private backendService: BackendService) { }

  ngOnInit(): void {
    const userId = localStorage.getItem('user_id');
    this.backendService.getHistoricalData(userId).subscribe(
      data => {
        this.historicalData = data;
        console.log(this.historicalData.map(d => d.date));
      }
    );
    this.createChart();
  }

  createChart() {
    this.chart = new Chart('line-chart', {
      type: 'line',
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
          backgroundColor: '#9fa88a3'
        }]
      },
      options: {
        aspectRatio: 2.5
      }
    });
  }

}