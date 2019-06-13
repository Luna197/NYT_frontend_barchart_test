

var margin = {top: 20, right: 20, bottom: 30, left: 40},
width = 900 - margin.left - margin.right,
height = 400 - margin.top - margin.bottom;

// Scale 

// X scale
var x = d3.scaleBand()
           .range([0, width])
           .padding(0.1);

// Y Scale
var y = d3.scaleLinear()
          .range([height,0])
          .domain([0,0.5]);

/*

--------------------------------------Top Section Svg---------------------------------------------

*/

function addLegend(svgObject) {

    // //Legend
    var legend = svgObject.append("g")
                    .attr("transform", "translate(" + (width - 100) + ",-10)")
                    .attr("font-size", "17px")

        legend.append("rect")
        .attr("x", 48)
        .attr("width", 18)
        .attr("height", 18)
        .attr("fill", "steelblue")

        legend.append("text")
        .attr("x", 40)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text("Dimension CTR");

        legend.append("rect")
        .attr("x", 48)
        .attr("y", 30)
        .attr("width", 18)
        .attr("height", 18)
        .attr("fill", "orange")

        legend.append("text")
        .attr("x", 40)
        .attr("y", 40)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text("Industry CTR");

        legend.append("path")
        .attr("d", "M 48 70 L 68 70")
        .attr("stroke", "black")
        .attr("stroke-width", 2)

        legend.append("text")
        .attr("x", 40)
        .attr("y", 70)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text("Order CTR");

}

var topSectionId = "#top_section"
var bottomSectionId = "#bottom_section"
var pageSectionId = '#page_type_data'

// Creat Svg Element
function createSvg(sectionId){
    var svgSection = d3.select(sectionId).append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left+ "," + margin.top + ")");
    return svgSection;
}

var svgTopSection = createSvg(topSectionId)
var svgBottomSection = createSvg(bottomSectionId)
var svgPageType = createSvg(pageSectionId)


// var svgTopSection = d3.select('#top_section').append("svg")
//             .attr("width", width + margin.left + margin.right)
//             .attr("height", height + margin.top + margin.bottom)
//             .append("g")
//             .attr("transform", "translate(" + margin.left+ "," + margin.top + ")");

d3.json("data/top_sections.json").then( data => {

    // Clean data
    data.forEach(d => {
        // d.clicks = +d.clicks;
        // d.impressions = +d.impressions;
        // d.industry_clicks = +d.industry_clicks;
        // d.industry_impressions = +d.industry_impressions;
        d.Dimension_CTR = +d.Dimension_CTR;
        d.Industry_CTR = +d.Industry_CTR;

    });

    // set x Domain
    x.domain(data.map(d => d.dimension_details));

    // set X and Y Axis 
    var xAxis = d3.axisBottom(x).tickSize(0)
    var yAxis = d3.axisLeft(y)

    var bar = svgTopSection.append("g")
                 .attr("transform", "translate(50,10)")

        bar.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        // .attr("display", "none")
        .attr("font-size", "17px")
        .style("text-anchor", "end");

 
        bar.append("g")
            .attr("class", "y axis")
            .style('opacity',"1")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            // .attr("y", 50)
            // .attr("x", 10)
            // .attr("dy", ".99em")
            .style("text-anchor", "end")
            .style('font-weight','bold')

    var groupTopSection = bar.selectAll(".groups")
                    .data(data)
                    .enter()
                    .append("g")

    // rect for dimension_ctr
    groupTopSection.append("rect")
        .attr("fill", "steelblue")
        .attr("y", d =>  y((d.Dimension_CTR) * 100) )
        .attr("x", d => x(d.dimension_details))
        .attr("height", d => (height - y((d.Dimension_CTR) * 100 )))
        .attr("width", x.bandwidth() / 3-2)
        .attr("transform", "translate(30,0)")


    groupTopSection.append("text")
    .attr("y", d =>  y((d.Dimension_CTR) * 100) - 10)
    .attr("x", d => x(d.dimension_details) + 70)
    .attr("text-anchor", "middle")
    // .attr("y", d => (height - y((d.clicks/d.impressions) * 100 )) + 5)
    .text(d => ((d.Dimension_CTR) * 100).toFixed(2) + "%")
    .attr("font-family", "sans-serif")
    .attr("font-size", "17px")
 
    // rect for dimension_ctr
    groupTopSection.append("rect")
    .attr("fill", "orange")
    .attr("y", d =>  y((d.Industry_CTR) * 100) )
    .attr("x", d => x(d.dimension_details) + x.bandwidth() / 3 + 5)
    .attr("height", d => (height - y((d.Industry_CTR) * 100 )))
    .attr("width", x.bandwidth() / 3-2)
    .attr("transform", "translate(30,0)")


    groupTopSection.append("text")
    .attr("y", d =>  y((d.Industry_CTR) * 100) - 10)
    .attr("x", d => x(d.dimension_details) + x.bandwidth() / 2 + 40)
    .attr("text-anchor", "middle")
    // .attr("y", d => (height - y((d.clicks/d.impressions) * 100 )) + 5)
    .text(d => ((d.Industry_CTR) * 100).toFixed(2) + "%")
    .attr("font-family", "sans-serif")
    .attr("font-size", "17px")


    // title 
    var title = bar.append("g")
                   .attr("transform", "translate( 30, 20)")
                   .attr("font-size", "30px")
                   .append("text")
                   .text("Top Section")

    
    addLegend(svgTopSection);

}).catch(error =>  {
    console.log(error)
});



/*

--------------------------------------Bottom Section Svg---------------------------------------------

*/


// var svgBottomSection = d3.select('#bottom_section').append("svg")
//             .attr("width", width + margin.left + margin.right)
//             .attr("height", height + margin.top + margin.bottom)
//             .append("g")
//             .attr("transform", "translate(" + margin.left+ "," + margin.top + ")");


d3.json("data/bottom_sections.json").then( data => {

    // Clean data
    data.forEach(d => {
        d.clicks = +d.clicks;
        d.impressions = +d.impressions;
        d.industry_clicks = +d.industry_clicks;
        d.industry_impressions = +d.industry_impressions;

    });

    x.domain(data.map(d => d.dimension_details));


    var xAxis = d3.axisBottom(x).tickSize(0)
    var yAxis = d3.axisLeft(y)

    var bar = svgBottomSection.append("g")
                 .attr("transform", "translate(50,10)")

    // xAxis and yAxis
    bar.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(50," + height + ")")
    .call(xAxis)
    .attr("font-size", "17px")
    .style("text-anchor", "end");

 
    bar.append("g")
        .attr("class", "y axis")
        .style('opacity',"1")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 10)
        // .attr("x", -4)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .style('font-weight','bold')
    // .text("Value");

    var groupBottomSection = bar.selectAll(".groups")
                    .data(data)
                    .enter()
                    .append("g")

    // rect for dimension_ctr
    groupBottomSection.append("rect")
        .attr("fill", "steelblue")
        .attr("y", d =>  y((d.Dimension_CTR) * 100) )
        .attr("x", d => x(d.dimension_details))
        .attr("height", d => (height - y((d.Dimension_CTR) * 100 )))
        .attr("width", x.bandwidth() / 3-2)
        .attr("transform", "translate(5,0)")
        .attr("transform", "translate(30,0)")


    groupBottomSection.append("text")
    .attr("y", d =>  y((d.Dimension_CTR) * 100) - 10)
    .attr("x", d => x(d.dimension_details) + 70)
    .attr("text-anchor", "middle")
    // .attr("y", d => (height - y((d.clicks/d.impressions) * 100 )) + 5)
    .text(d => ((d.Dimension_CTR) * 100).toFixed(2) + "%")
    .attr("font-family", "sans-serif")
    .attr("font-size", "17px")
 
    // rect for dimension_ctr
    groupBottomSection.append("rect")
    .attr("fill", "orange")
    .attr("y", d =>  y((d.Industry_CTR) * 100) )
    .attr("x", d => x(d.dimension_details) + x.bandwidth() / 3 + 5)
    .attr("height", d => (height - y((d.Industry_CTR) * 100 )))
    .attr("width", x.bandwidth() / 3-2)
    .attr("transform", "translate(30,0)")


    groupBottomSection.append("text")
    .attr("y", d =>  y((d.Industry_CTR) * 100) - 10)
    .attr("x", d => x(d.dimension_details) + x.bandwidth() / 2 + 40)
    .attr("text-anchor", "middle")
    // .attr("y", d => (height - y((d.clicks/d.impressions) * 100 )) + 5)
    .text(d => ((d.Industry_CTR) * 100).toFixed(2) + "%")
    .attr("font-family", "sans-serif")
    .attr("font-size", "17px")


    // title 
    var title = bar.append("g")
                   .attr("transform", "translate( 70, 20)")
                   .attr("font-size", "30px")
                   .append("text")
                   .text("Bottom Section")

    // //Legend
    addLegend(svgBottomSection)

}).catch(error =>  {
    console.log(error)
});


/*

--------------------------------------All Section Data Table---------------------------------------------

*/


var tableAllSection = d3.select('#all_section_data').append("table")
            .attr("width", 1200)
            .attr("height", height + margin.top + margin.bottom)
            // .attr("width", width - margin.left)
            // .attr("height", height)
            .style("margin","auto")
            .append("g")
           
            // .attr("transform", "translate(" + margin.left+ "," + margin.top + ")");


Promise.all([
    d3.json("data/all_sections.json"),
    d3.json("data/order_overall.json")
]).then(files =>{

    // console.log(files[0])
    // for orderOverallCTR is the dimension level? or Industry Level?
    files[1].Dimension_CTR = +files[1].Dimension_CTR

    var orderOverAll = files[1].Dimension_CTR * 100
    
    var res = []
    files[0].forEach(d => {
        d.Dimension_CTR = (+d.Dimension_CTR * 100).toFixed(2);
        d.Industry_CTR = (+d.Industry_CTR * 100).toFixed(2);
        var versOrderOverAll = ((d.Dimension_CTR - orderOverAll) / orderOverAll).toFixed(2)
        var versIndustryCTR = ((d.Dimension_CTR - d.Industry_CTR) / d.Industry_CTR).toFixed(2)
        res.push([d.dimension_details, d.Dimension_CTR + "%", orderOverAll.toFixed(2) + "%", versOrderOverAll + "%", d.Industry_CTR + "%", versIndustryCTR + "%"])
    })


    // Table 

    var table = tableAllSection.append("g")     

    // Table Header                     
    var theader = table.append("thead").append("tr")
    theader.selectAll("th")
            .data(["Section", "Section Order CTR", "Order Overall CTR", "% Versus Order Overall CTR", "Industry CTR", "% Versus Industry CTR"])
            .enter()
            .append("th")
            .text(d => d)
            .attr("font-size", "20px")

    
    // Table Body
    var tbody = table.append("tbody");

    // Rows and Cells in Table Body
    rows = tbody.selectAll("tr")
                .data(res)
                .enter()
                .append("tr");

    cells = rows.selectAll("td")
                .data(d => d)
                .enter()
                .append("td")
                .text(d => d)
                .style("font-size", "18px")
                .style("color", (d,i) => {
                    if (i == 3 || i == 5){
                    return d[0] == "-" ? "red" : "green"; 
                    }
                })
                .each((d, i, nodes) => {
                    if (i == 3 || i == 5){
                        
                        var svg = d3.select(nodes[i]).append("svg").attr("width", 10).attr("height", 10)
                        // .append('h1').text(i)
                        svg.append("path")
                            .attr("d", d => d[0] == "-" ? "M 0 0 L 10 0 L 5 10 L 0 0" : "M 0 10 L 10 10 L 5 0 L 0 10")
                            .attr("stroke", d => d[0] == "-" ? "red" : "green")
                            .attr("fill", d => d[0] == "-" ? "red" : "green")
                    }
                })

    
})



/*

---------------------------Order Overall Line Attach to Top Section and Bottom Section---------------------------------------

*/


d3.json("data/order_overall.json").then(data => {

    data.Dimension_CTR = +data.Dimension_CTR;
    data.Industry_CTR = +data.Industry_CTR;

    var overAllTop = svgTopSection.append("g")
                                  .attr("id", "overAllTop")

        overAllTop.append("line")
                .attr("stroke", "black")
                .attr("stroke-width", 2)
                .attr("x1", margin.left + 20)
                .attr("y1", y((data.Dimension_CTR) * 100))
                .attr("x2", width)
                .attr("y2", y((data.Dimension_CTR) * 100)) 

        overAllTop.append("text")
               .attr("x", margin.left + 15)
               .attr("y", y((data.Dimension_CTR) * 100) - 10)
               .text((data.Dimension_CTR * 100).toFixed(2) + "%")
               .attr("font-size", "17px")
               .attr("fill", "black")

    var overAllBottom = svgBottomSection.append("g")
                                        .attr("id", "overAllBottom")

    overAllBottom.append("line")
            .style("stroke", "black")
            .attr("stroke-width", 2)
            .attr("x1", margin.left + 20)
            .attr("y1", y((data.Dimension_CTR) * 100))
            .attr("x2", width)
            .attr("y2", y((data.Dimension_CTR) * 100))

    overAllBottom.append("text")
            .attr("x", margin.left + 20)
            .attr("y", y((data.Dimension_CTR) * 100) - 10)
            .text((data.Dimension_CTR * 100).toFixed(2) + "%")
            .attr("font-size", "17px")


    d3.select("#overAllTop").lower()
    d3.select("#overAllBottom").lower()   

}).catch(error => console.log(error))




/*

--------------------------------------Page Type Section-------------------------------------------------

*/

// // exectute here as fucntion to pass html element
// var svgPageType = d3.select('#page_type_data').append("svg")
//             .attr("width", width + margin.left + margin.right)
//             .attr("height", height + margin.top + margin.bottom)
//             .append("g")
//             .attr("transform", "translate(" + margin.left*2+ "," + margin.top + ")");


// here can be a function for load json data
d3.json("data/page_type.json").then( data => {
    // Clean data
    data.forEach(d => {
        d.clicks = +d.clicks;
        d.impressions = +d.impressions;
        d.industry_clicks = +d.industry_clicks;
        d.industry_impressions = +d.industry_impressions;

    });

    x.domain(data.map(d => d.dimension_details));

    var xAxis = d3.axisBottom(x).tickSize(0)
    var yAxis = d3.axisLeft(y)

    var bar = svgPageType.append("g")
                 .attr("transform", "translate(0,10)")

    // xAxis and yAxis
    bar.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .attr("font-size", "12px")
    .style("text-anchor", "end");

 
    bar.append("g")
        .attr("class", "y axis")
        .style('opacity',"1")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 10)
        // .attr("x", -4)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .style('font-weight','bold')
    // .text("Value");

    var groupPageType = bar.selectAll(".groups")
                    .data(data)
                    .enter()
                    .append("g")

    // rect for dimension_ctr
    groupPageType.append("rect")
        .attr("fill", "steelblue")
        .attr("y", d =>  y((d.Dimension_CTR) * 100) )
        .attr("x", d => x(d.dimension_details))
        .attr("height", d => (height - y((d.Dimension_CTR) * 100 )))
        .attr("width", x.bandwidth() / 3-2)
        .attr("transform", "translate(-5,0)")



    groupPageType.append("text")
    .attr("y", d =>  y((d.Dimension_CTR) * 100) - 10)
    .attr("x", d => x(d.dimension_details) +10)
    .attr("text-anchor", "middle")
    // .attr("y", d => (height - y((d.clicks/d.impressions) * 100 )) + 5)
    .text(d => ((d.Dimension_CTR) * 100).toFixed(2) + "%")
    .attr("font-family", "sans-serif")
    .attr("font-size", "13px")
 
    // rect for dimension_ctr
    groupPageType.append("rect")
    .attr("fill", "orange")
    .attr("y", d =>  y((d.Industry_CTR) * 100) )
    .attr("x", d => x(d.dimension_details) + x.bandwidth() / 3 + 5)
    .attr("height", d => (height - y((d.Industry_CTR) * 100 )))
    .attr("width", x.bandwidth() / 3-2)
    .attr("transform", "translate(-5,0)")


    groupPageType.append("text")
    .attr("y", d =>  y((d.Industry_CTR) * 100) - 10)
    .attr("x", d => x(d.dimension_details) + x.bandwidth() / 2 + 5)
    .attr("text-anchor", "middle")
    // .attr("y", d => (height - y((d.clicks/d.impressions) * 100 )) + 5)
    .text(d => ((d.Industry_CTR) * 100).toFixed(2) + "%")
    .attr("font-family", "sans-serif")
    .attr("font-size", "13px")


    // title 
    var title = bar.append("g")
                   .attr("transform", "translate( 30, 20)")
                   .attr("font-size", "30px")
                   .append("text")
                   .text("Page Type Data")

    // //Legend
    addLegend(svgPageType)

}).catch(error =>  {
    console.log(error)
});




/*

--------------------------------------Order Orverall For Page Type Section---------------------------------------------

*/

d3.json("data/page_type_order_overall.json").then(data => {

    data.Dimension_CTR = +data.Dimension_CTR;
    data.Industry_CTR = +data.Industry_CTR;

    var overAllTop = svgPageType.append("g")
                                .attr("id", "overAllTopPage")
                                

        overAllTop.append("line")
                .attr("stroke", "black")
                .attr("stroke-width", 2)
                .attr("x1", -70)
                .attr("y1", y((data.Dimension_CTR) * 100))
                .attr("x2", width)
                .attr("y2", y((data.Dimension_CTR) * 100))
                

        overAllTop.append("text")
               .attr("x", -70)
               .attr("y", y((data.Dimension_CTR) * 100) - 10)
               .text((data.Dimension_CTR * 100).toFixed(2) + "%")
               .attr("font-size", "17px")

    d3.select("#overAllTopPage").lower()


}).catch(error => console.log(error))
