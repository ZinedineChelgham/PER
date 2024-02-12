import * as d3 from "d3";
import React, { useEffect, useRef } from "react";

const PieChart = ({ data, title }) => {
  const ref = useRef();

  useEffect(() => {
    const width = 602; // Ajustez la largeur si nécessaire
    const height = 418; // Ajustez la hauteur si nécessaire
    const margin = 50; // Marge autour du camembert pour le titre et la légende
    const radius = Math.min(width, height) / 2 - margin;

    const color = d3.scaleOrdinal([
      "#1a9850", // Vert foncé
      "#91cf60", // Vert
      "#d9ef8b", // Vert pâle
      "#fee08b", // Jaune pâle
      "#fc8d59", // Orange rouge
      "#d73027", // Rouge
    ]);

    const pie = d3
      .pie()
      .value((d) => d.percentage)
      .sort(null);
    const arc = d3.arc().outerRadius(radius).innerRadius(0);

    const svg = d3
      .select(ref.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2 + margin / 4})`);

    svg.selectAll("*").remove(); // Clear svg content before adding new elements

    svg
      .selectAll("path")
      .data(pie(data))
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill", (d, i) => color(i))
      .attr("stroke", "white")
      .attr("stroke-width", "2px");

    // Add title to the chart
    svg
      .append("text")
      .attr("x", 0)
      .attr("y", -height / 2 + margin / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .style("font-weight", "bold")
      .text(title);

    // Legend
    const legend = svg
      .selectAll(".legend")
      .data(color.domain())
      .enter()
      .append("g")
      .attr("class", "legend")
      .attr(
        "transform",
        (d, i) =>
          `translate(-${width / 2 - margin}, ${-height / 2 + margin + i * 20})`
      );

    legend
      .append("rect")
      .attr("width", 18)
      .attr("height", 18)
      .attr("fill", color);

    legend
      .append("text")
      .attr("x", 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .text((d, i) => data[i].category);
  }, [data, title]);

  return <svg ref={ref}></svg>;
};

export default PieChart;
