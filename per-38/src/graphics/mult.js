import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
const BarPlot1 = () => {
    const [selectedOption, setSelectedOption] = useState('Overall');
    const svgRef = useRef();
    const data = {
        Overall: {
            '<50': 177,
            '51-80': 131,
            '81-120': 122,
            '121-150': 73,
            'bcp plus !': 67
        },
        Genre: {
            'Un homme': {
                '<50': 125,
                '51-80': 97,
                '81-120': 97,
                '121-150': 55,
                'bcp plus !': 48
            },
            'Une femme': {
                '<50': 52,
                '51-80': 34,
                '81-120': 25,
                '121-150': 18,
                'bcp plus !': 19
            }
        },
        Statut: {
            'Professeur des Universités': {
                '<50': 74,
                '51-80': 55,
                '81-120': 40,
                '121-150': 20,
                'bcp plus !': 13
            },
            'Maître de Conférences (sans HDR)': {
                '<50': 69,
                '51-80': 60,
                '81-120': 62,
                '121-150': 43,
                'bcp plus !': 35
            },
            'Maître de Conférences (avec HDR)': {
                '<50': 33,
                '51-80': 15,
                '81-120': 18,
                '121-150': 8,
                'bcp plus !': 19
            }
        }
    };
    const color = d3.scaleOrdinal(d3.schemeCategory10); // Set color scale

    useEffect(() => {
        const margin = { top: 50, right: 300, bottom: 70, left: 40 }, // Increase right margin
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
        const x0 = d3.scaleBand()
            .rangeRound([0, width])
            .paddingInner(0.1);
        const x1 = d3.scaleBand()
            .padding(0.05);
        const y = d3.scaleLinear()
            .rangeRound([height, 0]);
        const g = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        g.append("text") // Adding title above the chart
            .attr("x", width / 2)
            .attr("y", -30)
            .style("text-anchor", "middle")
            .style("font-size", "24px")
            .style("font-weight", "bold")
            .text(`Nombre d'heures complémentaires en moyenne ces deux dernières années`);
        let plotData = data[selectedOption];
        let keys = Object.keys(plotData);
        if (selectedOption === 'Overall') {
            x0.domain(['<50', '51-80', '81-120', '121-150', 'bcp plus !']);
            y.domain([0, d3.max(Object.values(plotData))]).nice();
            g.selectAll(".bar")
                .data(Object.entries(plotData))
                .enter().append("rect")
                .attr("class", "bar")
                .attr("x", function(d) { return x0(d[0]); })
                .attr("width", x0.bandwidth())
                .attr("y", function(d) { return y(d[1]); })
                .attr("height", function(d) { return height - y(d[1]); })
                .attr("fill", color(0));
        } else {
            x0.domain(['<50', '51-80', '81-120', '121-150', 'bcp plus !']);
            x1.domain(keys).rangeRound([0, x0.bandwidth()]);
            y.domain([0, d3.max(keys, function(key) { return d3.max(Object.values(plotData[key])); })]).nice();
            let bar = g.append("g")
                .selectAll("g")
                .data(['<50', '51-80', '81-120', '121-150', 'bcp plus !'])
                .enter().append("g")
                .attr("transform", function(d) { return "translate(" + x0(d) + ",0)"; });
            bar.selectAll("rect")
                .data(function(d) { return keys.map(function(key) { return {key: key, value: plotData[key][d]}; }); })
                .enter().append("rect")
                .attr("x", function(d) { return x1(d.key); })
                .attr("y", function(d) { return y(d.value); })
                .attr("width", x1.bandwidth())
                .attr("height", function(d) { return height - y(d.value); })
                .attr("fill", function(d) { return color(d.key); });
        }
        g.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x0));
        g.append("g")
            .call(d3.axisLeft(y));
        let legendKeys = selectedOption === 'Overall' ? ['Overall'] : keys;
        if (selectedOption !== 'Overall') {
            let legend = g.append("g")
                .attr("font-family", "sans-serif")
                .attr("font-size", 15)
                .attr("text-anchor", "end")
                .selectAll("g")
                .data(legendKeys)
                .enter().append("g")
                .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

            legend.append("rect")
                .attr("x", width - 19)
                .attr("width", 19)
                .attr("height", 19)
                .attr("fill", color);

            legend.append("text")
                .attr("x", width - 24)
                .attr("y", 9.5)
                .attr("dy", "0.32em")
                .text(function(d) { return d; });
        }
        const checkboxGroup = svg.append('foreignObject')
            .attr('x', width + margin.left)
            .attr('y', margin.top)
            .attr('width', 200)
            .attr('height', 100)
            .append('xhtml:div');

        ['Overall', 'Genre', 'Statut'].forEach((option, i) => {
            const id = `checkbox-${option}`;
            const checkboxGroup = svg.append('foreignObject')
                .attr('x', width + margin.left + 100)
                .attr('y', margin.top+120)
                .attr('width', 200)
                .attr('height', 100)
                .append('xhtml:div');

            ['Overall', 'Genre', 'Statut'].forEach((option, i) => {
                const id = `checkbox-${option}`;
                checkboxGroup.append('xhtml:input')
                    .attr('type', 'radio')
                    .attr('id', id)
                    .attr('name', 'option')
                    .attr('value', option)
                    .property('checked', selectedOption === option)
                    .on('change', () => setSelectedOption(option))
                    .style('margin-right', '5px');
                checkboxGroup.append('xhtml:label')
                    .attr('for', id)
                    .text(option)
                    .style('font-size', '16px')
                    .style('font-weight', 'bold');
                checkboxGroup.append('xhtml:br');
            });
        });


    }, [selectedOption]);

    return (

            <svg ref={svgRef} ></svg>

    );
};

export default BarPlot1;
