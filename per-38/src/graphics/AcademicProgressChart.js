import * as d3 from "d3";
import React, { useEffect, useRef, useState } from "react";

const LineGraphComponent = () => {
  const svgRef = useRef();
  const [selectedGraph, setSelectedGraph] = useState("pu");

  const graphData = {
    pu: {
      title: "PU Hommes et Femmes par année",
      data: [
        { gender: "Homme", values: [3, 6, 55, 81] },
        { gender: "Femme", values: [0, 0, 15, 42] },
      ],
      color: ["#1f77b4", "#ff7f0e"],
    },
    mcfHDR: {
      title: "MCF avec HDR Hommes et Femmes par année",
      data: [
        { gender: "Homme", values: [1, 10, 28, 18] },
        { gender: "Femme", values: [0, 2, 10, 11] },
      ],
      color: ["#2ca02c", "#d62728"],
    },
    mcfNoHDR: {
      title: "MCF sans HDR Hommes et Femmes par année",
      data: [
        { gender: "Homme", values: [5, 26, 58, 51] },
        { gender: "Femme", values: [7, 9, 22, 22] },
      ],
      color: ["#9467bd", "#8c564b"],
    },
  };

  const years = [5, 10, 15, 20];

  useEffect(() => {
    const margin = { top: 50, right: 300, bottom: 100, left: 40 }, // Increase right margin
      width = 1402 - margin.left - margin.right, // Decrease width to create space for checkboxes
      totalWidth = width + margin.left + margin.right,
      height = 500 - margin.top - margin.bottom;

    const svg = d3
      .select(svgRef.current)
      .html("")
      .attr(
        "viewBox",
        `0 0 ${totalWidth} ${height + margin.top + margin.bottom}`
      )
      .attr("width", totalWidth)
      .attr("height", height + margin.top + margin.bottom);

    const xScale = d3.scaleLinear().domain([4, 20]).range([0, width]);

    const yScale = d3.scaleLinear().domain([0, 100]).range([height, 0]);

    const chart = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    chart
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale));

    chart.append("g").call(d3.axisLeft(yScale));

    const line = d3
      .line()
      .x((d, i) => xScale(years[i]))
      .y((d) => yScale(d))
      .curve(d3.curveMonotoneX); // This will make the line smooth

    const currentData = graphData[selectedGraph];

    currentData.data.forEach((dataset, i) => {
      chart
        .append("path")
        .datum(dataset.values)
        .attr("class", "line") // Make sure this class is not styled with a fill in CSS
        .attr("fill", "none") // Explicitly set fill to none
        .attr("stroke", currentData.color[i])
        .attr("stroke-width", 4)
        .attr("d", line);
    });

    chart
      .append("text")
      .attr("x", width / 2)
      .attr("y", -margin.top / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "20px")
      .style("font-weight", "bold")
      .text(currentData.title);

    // Create the checkbox container
    const checkboxContainer = svg
      .append("foreignObject")
      .attr("x", 1120) // Position at the end of the graph
      .attr("y", 100)
      .attr("width", 250) // Width of the margin reserved for checkboxes
      .attr("height", 1000)
      .append("xhtml:div")
      .style("display", "flex")
      .style("flex-direction", "column")
      .style("font-size", "16px")
      .style("align-items", "start")
      .style("padding", "10px");

    // Create checkboxes
    Object.keys(graphData).forEach((key) => {
      let container = checkboxContainer
        .append("xhtml:div")
        .style("margin-bottom", "5px"); // Add margin between checkboxes
      container
        .append("xhtml:input")
        .attr("type", "radio")
        .attr("name", "graph-type")
        .attr("id", key)
        .attr("value", key)
        .property("checked", selectedGraph === key)
        .on("change", function () {
          setSelectedGraph(this.value);
          // Call function to update graph based on selection
        });
      container
        .append("xhtml:label")
        .attr("for", key)
        .text(graphData[key].title);
    });

    // Style the checkbox container
    checkboxContainer
      .style("border", "1px solid #ccc") // Add a border for separation
      .style("border-radius", "5px") // Add border-radius for rounded corners
      .style("padding", "10px")
      .style("margin-top", "10px");

    // Add the legend
    const legend = d3
      .select(svgRef.current)
      .selectAll(".legend")
      .data(currentData.data)
      .enter()
      .append("g")
      .attr("class", "legend")
      .attr(
        "transform",
        (d, i) => `translate(${width - margin.right + 20}, ${i * 20 + 30})`
      );

    legend
      .append("rect")
      .attr("x", 350)
      .attr("y", 293)

      .attr("width", 10)
      .attr("height", 10)
      .style("fill", (d, i) => currentData.color[i]);

    legend
      .append("text")
      .attr("x", 365)
      .attr("y", 300)
      .text((d) => d.gender)
      .style("text-anchor", "start")
      .style("alignment-baseline", "middle");

    // Function to update the graph when a new dataset is selected
    const updateGraph = (graphKey) => {
      const newData = graphData[graphKey];

      // Update the title
      svg.select(".chart-title").text(newData.title);

      // Bind the new data to the lines
      const lines = chart.selectAll(".line").data(newData.data);

      // Enter new paths
      lines
        .enter()
        .append("path")
        .attr("class", "line")
        .merge(lines)
        .transition()
        .duration(750)
        .attr("d", (d) => line(d.values))
        .attr("stroke", (d, i) => newData.color[i]);

      // Exit and remove old paths
      lines.exit().remove();

      // Update the legend
      const legendUpdate = chart.selectAll(".legend").data(newData.data);

      legendUpdate.select("rect").style("fill", (d, i) => newData.color[i]);

      legendUpdate.select("text").text((d) => d.gender);
    };

    // Initial call to set up the graph
    updateGraph(selectedGraph);
  }, [selectedGraph, graphData]);

  return (
    <div>
      <svg ref={svgRef} />
    </div>
  );
};

export default LineGraphComponent;
