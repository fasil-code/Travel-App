

import React ,{useState,useEffect} from 'react';
import Header from "./componenet/Header"
import List from "./componenet/List"
import Map from "./componenet/Map"
import {CssBaseline,Grid, Hidden} from "@material-ui/core"
import {getPlacesData} from "./api/index"


function App() {
  const [places,setPlaces]=useState([]);
  const [filteredPlace,setfilteredPlaces]=useState([]);
  const [coordinates,setCoordinates]=useState({});
  const [bounds,setBounds]=useState({});
  const [isLoading,setLoading]=useState(false)
  const [childClicked, setChildClicked] = useState(null);
  const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState('');
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoordinates({ lat: latitude, lng: longitude });
    });
  }, []);

useEffect(()=>{
const filteredPlace=places.filter((place)=>place.rating>rating);
setfilteredPlaces(filteredPlace);
},[rating]);

  useEffect(()=>{
    setLoading(true)
 //   console.log(coordinates,bounds);
getPlacesData(type,bounds.sw,bounds.ne)
.then((data)=>{
  //console.log(data);
setPlaces(data);
setfilteredPlaces([])
setLoading(false)
})
  },[type,coordinates,bounds]);



  return (
    <div className="App" >
     <>
<CssBaseline />
<Header setCoordinates={setCoordinates} />
<Grid container spacing={3} styles={{width:'100%'}} >
<Grid item xs={12} md={4}>
<List
places={filteredPlace.length ?filteredPlace:places}
childClicked={childClicked}
isLoading={isLoading}
type={type}
setType={setType}
rating={rating}
setRating={setRating}
 />

</Grid>


<Grid item xs={12} md={8}>
<Map
 setCoordinates={setCoordinates} 
   setBounds={setBounds}
coordinates={coordinates}
places={filteredPlace.length ?filteredPlace:places}
setChildClicked={setChildClicked}
 />
</Grid>

</Grid>
     </>
   
    </div>
  );
}

export default App;

