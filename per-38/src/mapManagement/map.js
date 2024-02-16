import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import franceGeoJson from './france_geoData.json';
import franceDepartments from './france_departements.json';
import './map.css';

const FranceMap = ({ data }) => {
  // Paris  :  palaiseau orsay versailles nanterre villetaneuse cergy courbevoie saclay gif sur yvette
  const svgRef = useRef();
  const tooltipRef = useRef();
  const barGraphRef = useRef(); // Ref for the bar graph container

  const width = 675;
  const height = 675;

  // Function to handle click event on circles
  const handleCircleClick = (event, d) => {

    // Create a container for the bar graph
    const barGraph = d3.select(svgRef.current)
      .append('g')
      .attr('class', 'bar-graph')
      .attr('transform', `translate(${event.offsetX}, ${event.offsetY})`)
      .attr("z-index", 1000);

    // Container for the rectangle enclosing the bar graph
    const rectWidth = 150;
    const rectHeight = 120;
    const rectMargin = 10;

    const rectContainer = barGraph.append('g')
      .attr('class', 'rect-container')
      .attr('transform', `translate(10, -10)`);

    // Draw the rectangle with white background
    rectContainer.append('rect')
      .attr('width', rectWidth)
      .attr('height', rectHeight)
      .attr('fill', 'white')
      .attr('stroke', 'black');

    // Close icon
    rectContainer.append('text')
      .attr('class', 'close-icon')
      .attr('x', rectWidth - 10)
      .attr('y', 10)
      .attr('text-anchor', 'end')
      .attr('cursor', 'pointer')
      .text('✖️')
      .on('click', () => barGraph.remove()); // Remove the bar graph when close icon is clicked

    // Data for the bar graph (you need to adjust this based on your data structure)
    const barData = [
      { label: 'Homme', count: d.maleCount, color: 'blue' },
      { label: 'Femme', count: d.femaleCount, color: 'pink' },
      { label: 'Autre', count: d.otherCount, color: 'gray' }
    ];

    // Scales for the bar graph
    const xScale = d3.scaleBand()
      .domain(barData.map(d => d.label))
      .range([rectMargin, rectWidth - rectMargin])
      .padding(0.1);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(barData, d => d.count)])
      .range([rectHeight - rectMargin, rectMargin]);

    // Draw bars
    rectContainer.selectAll('.bar')
      .data(barData)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => xScale(d.label))
      .attr('y', d => yScale(d.count))
      .attr('width', xScale.bandwidth() -20 )
      .attr('height', d => rectHeight - rectMargin - yScale(d.count))
      .attr('fill', d => d.color)
      .on('mouseover', (event, d) => {
        //show tooltip of respondent count
        const tooltipDiv = tooltipRef.current;
        if (tooltipDiv) {
          d3.select(tooltipDiv).transition().duration(200).style("opacity", 0.9);
          d3.select(tooltipDiv)
            .html(d.count + " respondents")
            .style("left", event.pageX + "px")
            .style("top", event.pageY - 28 + "px");
        }
      
      })
             .on("mouseout", () => { 
        const tooltipDiv = tooltipRef.current;
        if (tooltipDiv) {
          d3.select(tooltipDiv).transition().duration(500).style("opacity", 0);
        }
      });

    // Draw labels
    rectContainer.selectAll('.label')
      .data(barData)
      .enter()
      .append('text')
      .attr('class', 'label')
      .attr('x', d => xScale(d.label) + xScale.bandwidth() / 2)
      .attr('y', rectHeight - 5)
      .attr('text-anchor', 'middle')
      .attr('font-size', '10px') // Set font size to 10 pixels
      .attr('font-weight', 'bold') // Set font weight to bold
      .text(d => d.label)
      .attr('transform', `translate(-10, 3)`);
  };

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const projection = d3.geoMercator().fitSize([width, height], franceGeoJson)
                         .center([2.2137, 46.2276]) // Geographic center of France
                         .scale(2600);
    const pathGenerator = d3.geoPath().projection(projection);
    const g = svg.select('g.map-container');

    if (g.empty()) {
      svg.append('g')
         .attr('class', 'map-container')
         .append('g'); 
    }

    const mapContainer = svg.select('g.map-container');

    const zoom = d3.zoom()
    .scaleExtent([1, 10]) // Set the scale limits
    .translateExtent([[0, 0], [width, height]]) // Set the translation limits
    .on('zoom', (event) => {
      mapContainer.attr('transform', event.transform);
    });

  svg.call(zoom);

    // Draw the map
    mapContainer.selectAll(".region")
       .data(franceDepartments.features)
       .enter()
       .append("path")
       .attr("class", "region")
       .attr("d", pathGenerator)
       .attr("fill", "#cccccc")
       .attr("stroke", "black")
       .attr("stroke-width", 1.5)
       .on("click", (event, d) => {
         d3.select(event.target).attr("fill", "#ff0000");
         console.log("department", d.properties.nom);
       });

    // Draw circles for each city with respondent count
    mapContainer.selectAll(".city-circle")
       .data(data) 
       .enter()
       .append("circle")
       .attr("class", "city-circle")
       .attr("cx", d => projection([d.longitude, d.latitude])[0])
       .attr("cy", d => projection([d.longitude, d.latitude])[1])
       .attr("r", d => (d.respondantCount != null && d.respondantCount) ? Math.sqrt(d.respondantCount) * 3 : 0)
       .attr("fill", "blue")
       .attr("fill-opacity", "0.5")
       .attr("stroke", "#fff")
       .attr("stroke-width", "1")
       .on("mouseover", (event, d) => {
        const tooltipDiv = tooltipRef.current;
        if (tooltipDiv) {
          d3.select(tooltipDiv).transition().duration(200).style("opacity", 0.9);
          d3.select(tooltipDiv)
            .html(d.label.charAt(0).toUpperCase() + d.label.slice(1) + "<br/>" + d.respondantCount + " respondents")
            .style("left", event.pageX + "px")
            .style("top", event.pageY - 28 + "px");
        }
        
         console.log("city", d.label);
       })
       .on("click", handleCircleClick)
       .on("mouseout", () => { 
        const tooltipDiv = tooltipRef.current;
        if (tooltipDiv) {
          d3.select(tooltipDiv).transition().duration(500).style("opacity", 0);
        }
      });

   

  }, [data]);

  return (
    <div className="map-container">
      <div className="tooltip" ref={tooltipRef} />

      <svg ref={svgRef} width={width} height={height}>
      </svg>
    </div>
  );
};

export default FranceMap;
