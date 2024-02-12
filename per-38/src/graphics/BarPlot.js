import * as d3 from "d3";
import React, { useEffect, useRef } from "react";

const BarPlot = ({ data, title }) => {
  const ref = useRef();

  useEffect(() => {
    const width = 602; // Adjust width if needed
    const height = 418; // Adjust height if needed
    const margin = { top: 50, right: 50, bottom: 50, left: 50 }; // Adjust margins if needed

    const svg = d3
      .select(ref.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.category))
      .range([0, width - margin.left - margin.right])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.percentage)])
      .nice()
      .range([height - margin.top - margin.bottom, 0]);

    svg
      .append("g")
      .attr("transform", `translate(0, ${height - margin.top - margin.bottom})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("transform", "rotate(-45)");

    svg.append("g").call(d3.axisLeft(y));

    svg
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => x(d.category))
      .attr("y", (d) => y(d.percentage))
      .attr("width", x.bandwidth())
      .attr(
        "height",
        (d) => height - margin.top - margin.bottom - y(d.percentage)
      )
      .attr("fill", "#69b3a2") // Adjust bar color if needed
      .append("title") // Append title element for tooltip
      .text((d) => `${d.percentage}%`);

    svg
      .append("text")
      .attr("x", width / 2.4)
      .attr("y", 0 - margin.top / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .style("font-weight", "bold")
      .text(title);
  }, [data, title]);

  return <svg ref={ref}></svg>;
};

export default BarPlot;
