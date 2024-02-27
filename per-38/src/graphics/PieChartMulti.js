import * as d3 from "d3";
import React, { useEffect, useRef, useState } from "react";

const PieChartMulti = ({ data, title, x_axis, info }) => {
  const [selectedOption, setSelectedOption] = useState("Overall");
  const svgRef = useRef();
  const color = d3.scaleOrdinal(d3.schemeCategory10);

  useEffect(() => {
    const margin = { top: 70, right: 300, bottom: 150, left: 70 },
      width = 1500 - margin.left - margin.right,
      totalWidth = width + margin.left + margin.right,
      height = 600 - margin.top - margin.bottom;

    let svg = d3
      .select(svgRef.current)
      .html("")
      .attr(
        "viewBox",
        `0 0 ${totalWidth} ${height + margin.top + margin.bottom}`
      )
      .attr("width", totalWidth)
      .attr("height", height + margin.top + margin.bottom);

    const radius = Math.min(width, height) / 2;
    const arc = d3.arc().outerRadius(radius).innerRadius(0);

    const pie = d3
      .pie()
      .sort(null)
      .value((d) => d.value);

    let g = svg
      .append("g")
      .attr(
        "transform",
        `translate(${width / 2 + margin.left},${height / 2 + margin.top})`
      );

    g.append("text")
      .attr("x", 0)
      .attr("y", -height / 2 - 30)
      .style("text-anchor", "middle")
      .style("font-size", "24px")
      .style("font-weight", "bold")
      .text(title);

    let isSubcategoryChart = false;
    let originalChartData = null;
    let arcGroup = null;

    // Function to create checkbox groups
    const createCheckboxGroups = () => {
      ["Overall", "Sexe", "Statut"].forEach((option) => {
        const id = `checkbox-${option}`;
        const checkboxGroup = svg
          .append("foreignObject")
          .attr("x", width + margin.left + 100)
          .attr("y", margin.top + 120)
          .attr("width", 200)
          .attr("height", 100)
          .append("xhtml:div");

        ["Overall", "Sexe", "Statut"].forEach((option) => {
          const id = `checkbox-${option}`;
          checkboxGroup
            .append("xhtml:input")
            .attr("type", "radio")
            .attr("id", id)
            .attr("name", "option")
            .attr("value", option)
            .property("checked", selectedOption === option)
            .on("change", () => setSelectedOption(option))
            .style("margin-right", "5px");
          checkboxGroup
            .append("xhtml:label")
            .attr("for", id)
            .text(option)
            .style("font-size", "16px")
            .style("font-weight", "bold");
          checkboxGroup.append("xhtml:br");
        });
      });
    };

    const drawOriginalChart = (chartData) => {
      originalChartData = chartData; // Store the original chart data

      let keys = Object.keys(chartData);

      let flattenedData = keys.flatMap((key) =>
        Object.entries(chartData[key]).map(([category, value]) => ({
          key,
          category,
          value,
        }))
      );

      let arcs = pie(flattenedData);

      arcGroup = g
        .selectAll(".arc")
        .data(arcs)
        .enter()
        .append("g")
        .attr("class", "arc");

      arcGroup
        .append("path")
        .attr("d", arc)
        .attr("fill", (d) => color(d.data.key))
        .on("click", (event, d) => {
          console.log(d);
          isSubcategoryChart = true;

          let subcategories = Object.entries(chartData[d.data.key]);

          svg.html("");
          drawSubcategoryChart(subcategories, d.data.key);
        })
        .append("title") // Append a title element to the path
        .text((d) => {
          console.log(d);
          // Get the total value for this key across all categories
          let total = Object.values(chartData[d.data.key]).reduce(
            (a, b) => a + b,
            0
          );
          return `${d.data.key}: ${total}`;
        }); // Set the text of the title to the key and value

      let legend = g
        .selectAll(".legend")
        .data(keys)
        .enter()
        .append("g")
        .attr("class", "legend")
        .attr("transform", (d, i) => `translate(-${width / 2}, ${i * 20})`);

      legend
        .append("rect")
        .attr("width", 18)
        .attr("height", 18)
        .attr("fill", (d) => color(d));

      legend
        .append("text")
        .attr("x", 24)
        .attr("y", 8)
        .attr("dy", "0.35em")
        .text((d) => {
          // Get the total value for this key
          let total = Object.values(chartData[d]).reduce((a, b) => a + b, 0);
          return `${d}: ${total}`;
        });

      createCheckboxGroups();

      return arcGroup;
    };

    const drawSubcategoryChart = (subcategories, key) => {
      let subArcs = pie(
        subcategories.map(([subcategory, value]) => ({
          key: subcategory,
          value,
        }))
      );

      let subArcGroup = svg
        .append("g")
        .attr(
          "transform",
          `translate(${width / 2 + margin.left},${height / 2 + margin.top})`
        )
        .selectAll(".arc")
        .data(subArcs)
        .enter()
        .append("g")
        .attr("class", "arc");
      let total = subcategories.reduce(
        (acc, [subcategory, value]) => acc + value,
        0
      );

      subArcGroup
        .append("path")
        .attr("d", arc)
        .attr("fill", (d) => color(d.data.key))
        .append("title") //
        .text((d) => {
          console.log(d);
          // Get the total value for this key across all categories
          return `${d.data.key}: ${((d.value / total) * 100).toFixed(2)}%`;
        });

      let legend = svg
        .selectAll(".legend")
        .data(
          subcategories.map(([subcategory, value]) => ({ subcategory, value }))
        )
        .enter()
        .append("g")
        .attr("class", "legend")
        .attr("transform", (d, i) => `translate(1200, ${i * 25 + 200})`);

      legend
        .append("rect")
        .attr("width", 18)
        .attr("height", 18)
        .attr("fill", (d) => color(d.subcategory));

      legend
        .append("text")
        .attr("x", 24)
        .attr("y", 9)
        .attr("dy", "0.35em")
        .text((d) => `[${d.subcategory}] :  ${d.value} réponses`);

      svg
        .append("text")
        .attr("x", 750)
        .attr("y", height / 2 - 150)
        .style("text-anchor", "middle")
        .style("font-size", "22px")
        .style("font-weight", "bold")
        .text(title + `( ${key} )`);

      svg
        .append("text")
        .attr("x", 10)
        .attr("y", 30)
        .style("font-size", "16px")
        .style("cursor", "pointer")
        .style("background-color", "#3498db")
        .text("Back")
        .on("click", () => {
          if (!isSubcategoryChart) {
            return;
          }

          isSubcategoryChart = false;
          svg.html("");
          g = svg
            .append("g")
            .attr(
              "transform",
              `translate(${width / 2 + margin.left},${height / 2 + margin.top})`
            );

          g.append("text")
            .attr("x", 0)
            .attr("y", -height / 2 - 30)
            .style("text-anchor", "middle")
            .style("font-size", "24px")
            .style("font-weight", "bold")
            .text(title);
          arcGroup = drawOriginalChart(originalChartData);
        });
    };

    if (selectedOption !== "Overall") {
      drawOriginalChart(data[selectedOption]);
    } else {
      const plotData = data[selectedOption];
      const keys = Object.keys(plotData);

      const arcs = pie(
        keys.map((key) => ({
          key,
          value: plotData[key],
        }))
      );

      const arcGroup = g
        .selectAll(".arc")
        .data(arcs)
        .enter()
        .append("g")
        .attr("class", "arc");
      const totalResponses = keys.reduce(
        (total, key) => total + plotData[key],
        0
      );

      arcGroup
        .append("path")
        .attr("d", arc)
        .attr("fill", (d) => color(d.data.key))
        .append("title")
        .text((d) => {
          const percentage = ((d.data.value / totalResponses) * 100).toFixed(2);
          return `${d.data.key}: ${d.data.value} réponses (${percentage}%)`;
        });

      // Add legend for Overall, Sexe, and Statut
      const legend = g
        .selectAll(".legend")
        .data(keys)
        .enter()
        .append("g")
        .attr("class", "legend")
        .attr("transform", (d, i) => `translate(-${width / 2}, ${i * 20})`);

      legend
        .append("rect")
        .attr("width", 18)
        .attr("height", 18)
        .attr("fill", (d) => color(d));

      legend
        .append("text")
        .attr("x", 24)
        .attr("y", 9)
        .attr("dy", "0.35em")
        .text((d) => `[${d}] :  ${plotData[d]} réponses`);
    }

    const infoIcon = svg
      .append("g")
      .attr("transform", `translate(${width + 300}, ${margin.top - 50})`);

    infoIcon
      .append("foreignObject")
      .attr("width", 50)
      .attr("height", 50)
      .html(
        `<div style="width: 20px; height: 20px; display: flex; justify-content: center; align-items: center;"><div title="${info}">&#x1F6C8;</div></div>`
      ); // Adjust the font-size and other styles as needed
    // Create checkbox groups

    // Create checkbox groups initially
    createCheckboxGroups();
  }, [selectedOption]);

  return <svg ref={svgRef}></svg>;
};

export default PieChartMulti;
