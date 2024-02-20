import Map from 'react-map-gl'
import './index.css'

function App() {

  return (
    <>
      <div className="w-full h-full">
        <Map mapboxAccessToken="pk.eyJ1IjoidGlpcm5ha28iLCJhIjoiY2xzb2JiZXI4MGRiODJrb3c5NnlmZnRjYyJ9.Fv2ex2k4_1efbXdhZjMl1Q"
          style={{height: "100vh", overflow: 'hidden'}}
        initialViewState={{
          longitude: -95.992775,
          latitude:  36.153980,
          zoom: 12}}
          mapStyle={"mapbox://styles/tiirnako/clsoeendf04ev01nlbuki52pf"}>
          </Map>
      </div>
    </>
  )
}

export default App
