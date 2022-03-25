import "./app.css";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { useEffect, useState } from "react";
import { Room, Star, StarBorder } from "@material-ui/icons";




function App() {

  const [viewport, setViewport] = useState({
    latitude: 23.6850,
    longitude: 90.3563,
    zoom: 4,
  });

  const [auto, setAuto] = useState([]);
  const [filteredData, setFilteredData] = useState([])


 
  useEffect(()=>{


    fetch("https://barikoi.xyz/v1/api/search/autocomplete/MzEzNjpDTkM4OU1CMDQ1/place?q=barikoi&city=dhaka")
    .then(response => response.json())
    .catch(error => console.error('Error:', error))
    .then(response => setAuto(response.places))
  
  }, [])

  console.log(auto)




  const newArr  =  filteredData.map((a)=>{

    return (<><p style={{cursor:"pointer"}}>{a.address},{a.area},{a.city},{a.postCode}</p></>
    )
  })


  // const handleId = ()=>{
  //   console.log("clicked")
  // }

  const handleFilter = (event) => {
    const searchWord = event.target.value;

    const newFilter = auto.filter((value) => {
      return value.address.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };


  






  return (
    <div className="container" >
      <div className="search-bar"> 
      <input type="text" placeholder="Search"
      onChange={handleFilter} />
    
      {filteredData.length !== 0 &&(
        <div className="dataResult">
        {newArr}
          </div>
      )}
      
      </div>
      <ReactMapGL className="map" 
        {...viewport}
        mapboxApiAccessToken="pk.eyJ1IjoiaXN0aWFrMjQyNiIsImEiOiJjbDEzdzVyZTcwM2swM2lvMHpiNWgxdTA0In0.NR-gWnnfv62bwnLt3tLsRA"
        width="100%"
        height="100%"
        transitionDuration="200"
        mapStyle="mapbox://styles/safak/cknndpyfq268f17p53nmpwira"
        onViewportChange={(viewport) => setViewport(viewport)}
  
      >
   

            <Marker
              latitude={23.777176}
              longitude={90.399452}
              offsetLeft={-3.5 * viewport.zoom}
              offsetTop={-7 * viewport.zoom}
            >
            <Room style={{
                  fontSize: 7 * viewport.zoom
                  }}/>
              
            </Marker>

      
      </ReactMapGL>
    </div>
  );
}

export default App;
