import { Component } from '@angular/core';
import * as d3 from "d3";
import { LoadDataService } from './../loaddata.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-visualise-data',
  imports: [],
  templateUrl: './visualise-data.html',
})
export class VisualiseData {
  A = 5;
  genomeData: Observable<number[]>;

  constructor(private service: LoadDataService) {
    // Initialise the object with the http request service
    // Collect the genome data - By calling the service's method
    this.genomeData = this.service.loadData()
  }

  
  collectData () {

    // Access the Genome Data - asynchronously
    this.genomeData.subscribe(data => {

      // Ensure data exists and that it has at least one element
      if (data && data.length > 0) {

        // Plot the data
        this.plotDataBarChart([8]); // careful with this

      } else {
        console.log("No genome data received");
      }
    });

  }
  

  // Use d3.js to plot the results
  // plot reference allele or alternative allele
  // Will Make bar chart for reference allele, bar chart for alternative allele and a grouped diagram with x and y axis for different groups (may just use numbers instead here)
  // Bar Chart:
  plotDataBarChart (data: any) {
    // Set the dimensions and margins of the graph
    let margin = {top: 30, right: 30, bottom: 70, left: 60},
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;
    
    // Append the svg object to the body of the page
    let svg = d3.select("#my_dataviz")
      .append("svg")
       .attr("width", width + margin.left + margin.right)
       .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");
    
    // X axis
    let x = d3.scaleBand()
      .range([ 0, width ])
      .domain(data.map(function(d: any) { return d.REF; }))
      .padding(0.2);
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");
    
    // Add Y axis
    let y = d3.scaleLinear()
      .domain([0, 500])
      .range([height, 0]);
    svg.append("g")
      .call(d3.axisLeft(y));

    // Plot the Bars using the data for the reference allele
    svg.selectAll("mybar")
      .data(data)
      .enter()
      .append("rect")
        .attr("x", function(d:any) { return d.REF !== undefined ? d.REF : null; })
        .attr("y", function(d) { return y(200); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(200); })
        .attr("fill", "#69b3a2")
    


  }
  // const await fetch get json then show in d3.js file to doNEXT 
  // NEXT TIME SOON ASAP
}


