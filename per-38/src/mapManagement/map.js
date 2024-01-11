import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import franceGeoJson from './france_geoData.json';
import franceDepartments from './france_departements.json';
import './map.css';

const FranceMap = ({ data }) => {
  const svgRef = useRef();
  const tooltipRef = useRef();

  const width = 600;
  const height = 600;
  
  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const projection = d3.geoMercator().fitSize([width, height], franceGeoJson)
                         .center([2.2137, 46.2276]) // Geographic center of France
                         .scale(2100);
    const pathGenerator = d3.geoPath().projection(projection);

              

    // Draw the map
    svg.selectAll(".region")
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
    svg.selectAll(".city-circle")
       .data(data) // 'data' should be an array of city objects including latitude, longitude, and respondentCount
       .enter()
       .append("circle")
       .attr("class", "city-circle")
       .attr("cx", d => projection([d.longitude, d.latitude])[0])
       .attr("cy", d => projection([d.longitude, d.latitude])[1])
       .attr("r", d => (d.respondantCount !=null && d.respondantCount ) ? Math.sqrt(d.respondantCount) * 2 : 0  ) // Adjust the 0.5 scaling factor as needed
       .attr("fill", "blue")
       .attr("fill-opacity", "0.5")
       .attr("stroke", "#fff")
       .attr("stroke-width", "1")
       .on("mouseover", (event, d) => {
        const tooltipDiv = tooltipRef.current;
        if (tooltipDiv) {
          d3.select(tooltipDiv).transition().duration(200).style("opacity", 0.9);
          d3.select(tooltipDiv)
            .html(d.label + "<br/>" + d.respondantCount + " respondents")
            .style("left", event.pageX + "px")
            .style("top", event.pageY - 28 + "px");
        }

        
        
         console.log("city", d.label);
       }).
       on("mouseout", () => { 
        const tooltipDiv = tooltipRef.current;
        if (tooltipDiv) {
          d3.select(tooltipDiv).transition().duration(500).style("opacity", 0);
        }
        });

  }, [data]);

  return (
    <div className="map-container">
      <div className="tooltip" ref={tooltipRef} />
      <svg ref={svgRef} width={width} height={height} />
    </div>
  );
};

export default FranceMap;
