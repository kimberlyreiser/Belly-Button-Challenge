
const url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json";


function init(){ 

 
    d3.json(url).then((data) => {   
        console.log(data);

    
    let Drop_Down_Menu = d3.select("#selDataset");
     
    
    let Subject_ID_Numbers = data.names;
         
    
    Subject_ID_Numbers.forEach((ID_Number) => {               
        });
      let First_ID = Subject_ID_Numbers[0];    
    ID_Demographics(First_ID)
    Bar_Chart(First_ID)
    Bubble_Chart(First_ID)
    });
};



function ID_Demographics(ID_Value) {

   
    d3.json(url).then((data) => {   
        console.log(data);
       
   
        
        let MetaData = data.metadata;
        let Selected_MetaData = MetaData.filter((Data) => Data.id == ID_Value);
        let Selected_Item = Selected_MetaData[0]
        d3.select("#sample-metadata").html("");
        let MetaData_Info = Object.entries(Selected_Item);
        MetaData_Info.forEach(([id,info]) => {                     
           d3.select("#sample-metadata").append("h5").text(`${id}: ${info}`);
           });
    });
}
  
function Bar_Chart(ID_Value) {

    
    d3.json(url).then((data) => {
        console.log(data);

        let samples = data.samples;

        
        let Selected_ID = samples.filter((sample) => sample.id === ID_Value);

       
        let Selected_Item = Selected_ID[0];
         let trace = {
            
            x: Selected_Item.sample_values.slice(0,10).reverse(),
            y: Selected_Item.otu_ids.slice(0,10).map((otu_id) => `OTU ${otu_id}`).reverse(),
            text: Selected_Item.otu_labels.slice(0,10).reverse(),
            type: "bar",
            orientation: "h"
        };

        
        let Bar_Data = [trace];
        
        
        Plotly.newPlot("bar", Bar_Data)
     });
}




function Bubble_Chart(ID_Value) {

    
    d3.json(url).then((data) => {
        console.log(data);

        
        let samples = data.samples;
    
      
        let Selected_ID = samples.filter((sample) => sample.id === ID_Value);
    
     
        let Selected_Item = Selected_ID[0];
        
        let trace = {
            x: Selected_Item.otu_ids,
            y: Selected_Item.sample_values,
            mode: "markers",
            marker: {
                size: Selected_Item.sample_values,
                color: Selected_Item.otu_ids,
                colorscale: "Earth"
            
            },
            text: Selected_Item.otu_labels
        };
    let Bubble_Data = [trace];
    let layout = {
            xaxis: {title: "OTU ID"}
        };
    
        
        Plotly.newPlot("bubble", Bubble_Data, layout)
    
    });
}

function optionChanged(New_ID){

    ID_Demographics(New_ID);
    Bar_Chart(New_ID);
    Bubble_Chart(New_ID)
    
};


init();