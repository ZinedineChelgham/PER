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
        Gender: {
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
        const svg = d3.select(svgRef.current);
        // Clear svg content before adding new elements
        svg.selectAll('*').remove();

        // Set the dimensions and margins of the graph
        const margin = {top: 20, right: 20, bottom: 70, left: 40},
            width = 600 - margin.left - margin.right,
            height = 300 - margin.top - margin.bottom;

        // Set the ranges
        const x0 = d3.scaleBand()
            .rangeRound([0, width])
            .paddingInner(0.1);
        const x1 = d3.scaleBand()
            .padding(0.05);
        const y = d3.scaleLinear()
            .rangeRound([height, 0]);

        const g = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // Get the data for the current selected option
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

        // Add the x Axis
        g.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x0));

        // Add the y Axis
        g.append("g")
            .call(d3.axisLeft(y));

        // Add legend
        let legendKeys = selectedOption === 'Overall' ? ['Overall'] : keys;
        let legend = g.append("g")
            .attr("font-family", "sans-serif")
            .attr("font-size", 10)
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
    }, [selectedOption]);

    return (
        <div>
            <label>
                <input type="checkbox" value="Overall" checked={selectedOption === 'Overall'} onChange={() => setSelectedOption('Overall')} />
                Overall
            </label>
            <label>
                <input type="checkbox" value="Gender" checked={selectedOption === 'Gender'} onChange={() => setSelectedOption('Gender')} />
                Gender
            </label>
            <label>
                <input type="checkbox" value="Statut" checked={selectedOption === 'Statut'} onChange={() => setSelectedOption('Statut')} />
                Statut
            </label>
            <svg ref={svgRef} width="600" height="300"></svg>
        </div>
    );
};

export default BarPlot1;
