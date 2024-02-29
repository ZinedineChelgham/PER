import * as d3 from "d3";
import React, { useEffect, useRef, useState } from "react";
const BarPlot1 = ({ data, title, x_axis, info }) => {
  console.log("🚀 ~ BarPlot1 ~ info:", info);
  const [selectedOption, setSelectedOption] = useState("Overall");
  const svgRef = useRef();
  const color = d3.scaleOrdinal(d3.schemeCategory10); // Set color scale
  const categories = Object.keys(data["Overall"]);

  useEffect(() => {
    const margin = { top: 70, right: 300, bottom: 150, left: 70 }, // Increase right margin
      width = 1500 - margin.left - margin.right, // Decrease width to create space for checkboxes
      totalWidth = width + margin.left + margin.right,
      height = 600 - margin.top - margin.bottom;
    const svg = d3
      .select(svgRef.current)
      .html("")
      .attr(
        "viewBox",
        `0 0 ${totalWidth} ${height + margin.top + margin.bottom}`
      )
      .attr("width", totalWidth)
      .attr("height", height + margin.top + margin.bottom);
    const x0 = d3.scaleBand().rangeRound([0, width]).paddingInner(0.1);
    const x1 = d3.scaleBand().padding(0.05);
    const x2 = d3.scaleBand().padding(0.05);
    const y = d3.scaleLinear().rangeRound([height, 0]);
    const g = svg
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg
      .append("text") // Add x-axis title
      .attr("x", width / 2 + margin.left) // Adjust the x position based on your preference
      .attr("y", height + margin.top + 100) // Adjust the y position based on your preference
      .style("text-anchor", "middle")
      .style("font-size", "16px")

      .text(x_axis);
    svg
      .append("text") // Add y-axis title
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2 - 60)
      .attr("y", -margin.left + 100)
      .style("text-anchor", "middle")
      .style("font-size", "16px")
      .text("Nombre de réponses");
    g.append("text") // Adding title above the chart
      .attr("x", width / 2)
      .attr("y", -30)
      .style("text-anchor", "middle")
      .style("font-size", "24px")
      .style("font-weight", "bold")
      .text(title);

    const tooltip = svg
        .append("g")
        .attr("class", "tooltip")
        .style("display", "none");

    tooltip
        .append("rect")
        .attr("width", 60)
        .attr("height", 20)
        .attr("fill", "white")
        .style("opacity", 0.8);

    tooltip
        .append("text")
        .attr("x", 30)
        .attr("dy", "1.2em")
        .style("text-anchor", "middle")
        .attr("font-size", "12px")
        .attr("font-weight", "bold");

    if (selectedOption === "Sexe_Statut") {
      let plotData_homme_femme = data["Sexe_Statut"];
      let statuts = Object.keys(plotData_homme_femme);

      let sexes = ["Un homme", "Une femme"];

      x0.domain(statuts);
      x1.domain(categories).rangeRound([0, x0.bandwidth()]);
      x2.domain(sexes).rangeRound([0, x1.bandwidth()]);
      y.domain([
        0,
        d3.max(statuts, function (statut) {
          return d3.max(categories, function (category) {
            return d3.max(sexes, function (sex) {
              return plotData_homme_femme[statut][sex][category];
            });
          });
        }),
      ]).nice();

      let statutBar = g
        .append("g")
        .selectAll("g")
        .data(statuts)
        .enter()
        .append("g")
        .attr("transform", function (d) {
          return "translate(" + x0(d) + ",0)";
        });

      let categoryBar = statutBar
        .selectAll("g")
        .data(function (d) {
          return categories.map(function (category) {
            return {
              category: category,
              values: sexes.map(function (sex) {
                return {
                  sex: sex,
                  value: plotData_homme_femme[d][sex][category],
                };
              }),
            };
          });
        })
        .enter()
        .append("g")
        .attr("transform", function (d) {
          return "translate(" + x1(d.category) + ",0)";
        });

      categoryBar
          .selectAll("rect")
          .data(function (d) {
            return d.values;
          })
          .enter()
          .append("rect")
          .attr("x", function (d) {
            return x2(d.sex);
          })
          .attr("y", function (d) {
            return y(d.value);
          })
          .attr("width", x2.bandwidth())
          .attr("height", function (d) {
            return height - y(d.value);
          })
          .attr("fill", function (d) {
            return color(d.sex);
          })
          .on("mouseover", function (event, d) {
            // Show the text when hovering
            d3.select(this.parentNode)
                .append("text")
                .attr("x", x2(d.sex) + x2.bandwidth() / 2)
                .attr("y", y(d.value) - 5)
                .attr("text-anchor", "middle")
                .style("font-size", "12px")
                .style("font-weight", "bold")
                .text(`${d.value} réponses`)
                .attr("class", "hover-text");
          })
          .on("mouseout", function () {
            // Remove the text when not hovering
            d3.selectAll(".hover-text").remove();
          });


      // Append X and Y axes for Sexe_Statut
      let xAxis = g
        .append("g") // this is the one reposnsible
        .attr("transform", "translate(0," + (height + 20) + ")")
        .call(d3.axisBottom(x0));

      // Append categories to x-axis labels
      let categoryAxis1 = g
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x1).tickSizeOuter(0));

      categoryAxis1
        .selectAll("text")
        .style("text-anchor", "middle")
        .style("font-weight", "bold")
        .style("font-size", "12px"); // Add this line for bold text

      let categoryAxis2 = g
        .append("g")
        .attr(
          "transform",
          "translate(" + 1.1 * x0.bandwidth() + "," + height + ")"
        )
        .call(d3.axisBottom(x1).tickSizeOuter(0));

      categoryAxis2
        .selectAll("text")
        .style("text-anchor", "middle")
        .style("font-weight", "bold")
        .style("font-size", "12px"); // Add this line for bold text

      let categoryAxis3 = g
        .append("g")
        .attr(
          "transform",
          "translate(" + 2.22 * x0.bandwidth() + "," + height + ")"
        )
        .call(d3.axisBottom(x1).tickSizeOuter(0));

      categoryAxis3
        .selectAll("text")
        .style("text-anchor", "middle")
        .style("font-weight", "bold")
        .style("font-size", "12px"); // Add this line for bold text

      g.append("g").call(d3.axisLeft(y));
      let color1 = d3
        .scaleOrdinal()
        .domain([
          "Professeur des Universités",
          "Maître de Conférences (sans HDR)",
          "Maître de Conférences (avec HDR)",
          "Un homme",
          "Une femme",
        ])
        .range(["#d62728", "#9467bd"]); // Add your desired colors here

      let legendKeys = ["Un homme", "Une femme"];

      let legend = g
        .append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("text-anchor", "end")
        .selectAll("g")
        .data(legendKeys.slice().reverse())
        .enter()
        .append("g")
        .attr("transform", function (d, i) {
          return "translate(0," + i * 20 + ")";
        });

      legend
        .append("rect")
        .attr("x", width - 18)
        .attr("width", 18)
        .attr("height", 18)
        .attr("fill", color);

      legend
        .append("text")
        .attr("x", width - 24)
        .attr("y", 9)
        .attr("dy", "0.35em")
        .text(function (d) {
          return d;
        });
    } else {
      let plotData = data[selectedOption];
      let keys = Object.keys(plotData);
      if (selectedOption === "Overall") {
        x0.domain(categories);
        y.domain([0, d3.max(Object.values(plotData))]).nice();
        g.selectAll(".bar")
            .data(Object.entries(plotData))
            .enter()
            .append("g")
            .attr("class", "bar-group")
            .append("rect")
            .attr("class", "bar")
            .attr("x", function (d) {
              return x0(d[0]) + x0.bandwidth() / 4;
            })
            .attr("width", x0.bandwidth() / 2)
            .attr("y", function (d) {
              return y(d[1]);
            })
            .attr("height", function (d) {
              return height - y(d[1]);
            })
            .attr("fill", color(0))
            .on("mouseover", function (event, d) {
              // Show the text when hovering
              d3.select(this.parentNode)
                  .append("text")
                  .attr("x", x0(d[0]) + x0.bandwidth() / 2)
                  .attr("y", y(d[1]) - 5)
                  .attr("text-anchor", "middle")
                  .style("font-size", "12px")
                  .style("font-weight", "bold")
                  .text(`${d[1]} réponses`)
                  .attr("class", "hover-text");
            })
            .on("mouseout", function () {
              // Remove the text when not hovering
              d3.selectAll(".hover-text").remove();
            });


      } else {
        x0.domain(categories);
        x1.domain(keys).rangeRound([0, x0.bandwidth()]);
        y.domain([
          0,
          d3.max(keys, function (key) {
            return d3.max(Object.values(plotData[key]));
          }),
        ]).nice();
        let bar = g
            .append("g")
            .selectAll("g")
            .data(categories)
            .enter()
            .append("g")
            .attr("transform", function (d) {
              return "translate(" + x0(d) + ",0)";
            });

        bar
            .selectAll("rect")
            .data(function (d) {
              return keys.map(function (key) {
                return { key: key, value: plotData[key][d] };
              });
            })
            .enter()
            .append("rect")
            .attr("x", function (d) {
              return x1(d.key);
            })
            .attr("y", function (d) {
              return y(d.value);
            })
            .attr("width", x1.bandwidth())
            .attr("height", function (d) {
              return height - y(d.value);
            })
            .attr("fill", function (d) {
              return color(d.key);
            })
            .on("mouseover", function (event, d) {
              // Show the text when hovering
              d3.select(this.parentNode)
                  .append("text")
                  .attr("x", x1(d.key) + x1.bandwidth() / 2)
                  .attr("y", y(d.value) - 5)
                  .attr("text-anchor", "middle")
                  .style("font-size", "12px")
                  .style("font-weight", "bold")
                  .text(`${d.value} réponses`)
                  .attr("class", "hover-text");
            })
            .on("mouseout", function () {
              // Remove the text when not hovering
              d3.selectAll(".hover-text").remove();
            });
      }

      g.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x0));
      g.append("g").call(d3.axisLeft(y));
      let legendKeys = selectedOption === "Overall" ? ["Overall"] : keys;
      if (selectedOption !== "Overall") {
        let legend = g
          .append("g")
          .attr("font-family", "sans-serif")
          .attr("font-size", 15)
          .attr("text-anchor", "end")
          .selectAll("g")
          .data(legendKeys)
          .enter()
          .append("g")
          .attr("transform", function (d, i) {
            return "translate(0," + i * 20 + ")";
          });

        legend
          .append("rect")
          .attr("x", width - 19)
          .attr("width", 19)
          .attr("height", 19)
          .attr("fill", color);

        legend
          .append("text")
          .attr("x", width - 24)
          .attr("y", 9.5)
          .attr("dy", "0.32em")
          .text(function (d) {
            return d;
          });
      }
    }

    const checkboxGroup = svg
      .append("foreignObject")
      .attr("x", width + margin.left)
      .attr("y", margin.top)
      .attr("width", 200)
      .attr("height", 100)
      .append("xhtml:div");

    ["Overall", "Sexe", "Statut", "Sexe_Statut"].forEach((option) => {
      const id = `checkbox-${option}`;
      const checkboxGroup = svg
        .append("foreignObject")
        .attr("x", width + margin.left + 100)
        .attr("y", margin.top + 120)
        .attr("width", 200)
        .attr("height", 100)
        .append("xhtml:div");

      ["Overall", "Sexe", "Statut", "Sexe_Statut"].forEach((option) => {
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

    const infoIcon = svg
      .append("g")
      .attr("transform", `translate(${width + 300}, ${margin.top - 50})`);

    infoIcon
      .append("foreignObject")
      .attr("width", 20)
      .attr("height", 20)
      .html(
        `<div style="width: 20px; height: 20px; display: flex; justify-content: center; align-items: center;"><div title="${info}">&#x1F6C8;</div></div>`
      ); // Adjust the font-size and other styles as needed
  }, [selectedOption]);

  return <svg ref={svgRef}></svg>;
};

export default BarPlot1;
