import * as d3 from "d3";
import React, { useEffect, useRef } from "react";

const BarPlot = ({ data, title, info }) => {
  const ref = useRef();

  useEffect(() => {
    const width = 602;
    const height = 418;
    const margin = { top: 50, right: 50, bottom: 50, left: 50 };

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

    svg.append("g").call(d3.axisLeft(y).tickFormat((d) => `${d}%`));

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
      .attr("fill", "#69b3a2")
      .append("title")
      .text((d) => `${d.percentage}%`);

    svg
      .append("text")
      .attr("x", width / 2.4)
      .attr("y", 0 - margin.top / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .style("font-weight", "bold")
      .text(title);

    const infoIcon = svg
      .append("g")
      .attr(
        "transform",
        `translate(${width - margin.right - 25}, ${margin.top - 75})`
      );

    infoIcon
      .append("foreignObject")
      .attr("width", 20)
      .attr("height", 20)
      .html(
        `<div style="width: 20px; height: 20px; display: flex; justify-content: center; align-items: center;"><div title="${info}">&#x1F6C8;</div></div>`
      ); // Adjust the font-size and other styles as needed
  }, [data, title, info]);

  return <svg ref={ref}></svg>;
};

export default BarPlot;
