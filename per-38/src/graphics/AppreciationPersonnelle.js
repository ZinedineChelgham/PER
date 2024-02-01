import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const AppreciationPersonnelle = () => {
    const ref = useRef();
    const title = "Appréciation personnelle sur l'enseignement";
    const data = [
        { category: "J'aime toujours enseigner : 51.43%", percentage: 51.43 },
        { category: "J'aime toujours enseigner mais un demi service me suffirait : 41.61%", percentage: 41.61 },
        { category: "S'il y a un moyen de ne plus en enseigner, ça m'intéresse : 6.82%", percentage: 6.82 },
        { category: "Je déconseille à quiconque de devenir enseignant : 0.14%", percentage: 0.14 }
    ];

    useEffect(() => {
        const width = 997; // Adjust the width as needed
        const height = 500; // Adjust the height as needed
        const margin = { top: 30, right: 150, bottom: 30, left: 0 }; // Margins around the SVG
        const radius = Math.min(width - margin.left - margin.right, height - margin.top - margin.bottom) / 2;

        const color = d3.scaleOrdinal([
            "#1f77b4", // Color for "J'aime toujours enseigner"
            "#ff7f0e", // Color for "J'aime toujours enseigner mais un demi service me suffirait"
            "#2ca02c", // Color for "S'il y a un moyen de ne plus en enseigner, ça m'intéresse"
            "#d62728", // Color for "Je déconseille à quiconque de devenir enseignant"
        ]);

        const svg = d3.select(ref.current)
            .attr("width", width + margin.right) // Increased width to fit legend
            .attr("height", height)
            .append("g")
            .attr("transform", `translate(${margin.left + radius}, ${margin.top + radius})`);

        svg.selectAll('*').remove(); // Clear svg content before adding new elements

        const pie = d3.pie().value(d => d.percentage)(data);
        const arc = d3.arc().outerRadius(radius).innerRadius(0);

        svg.selectAll('path')
            .data(pie)
            .enter()
            .append('path')
            .attr('d', arc)
            .attr('fill', (d, i) => color(i))
            .attr('stroke', 'white')
            .attr('stroke-width', '1px');

        // Add title to the chart
        svg.append("text")
            .attr("x", 0)
            .attr("y", -radius - margin.top / 2)
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .style("font-weight", "bold")
            .text(title);

        // Add legend
        const legend = svg.selectAll(".legend")
            .data(pie)
            .enter().append("g")
            .attr("class", "legend")
            .attr("transform", (d, i) => `translate(${radius + 40}, ${-radius + i * 20})`);

        legend.append("rect")
            .attr("width", 18)
            .attr("height", 18)
            .attr("fill", (d, i) => color(i));

        legend.append("text")
            .attr("x", 24)
            .attr("y", 9)
            .attr("dy", ".35em")
            .text((d) => d.data.category);

    }, []); // The empty array ensures this effect runs only once on mount

    return <svg ref={ref}></svg>;
};

export default AppreciationPersonnelle;
