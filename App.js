import Main from "./components/Main";
import ScreenContext from "./context/screenContext";
import React, { useRef, useState } from 'react';

const App = () => {

  const sliderRef = useRef();
  const mapRef = useRef();
  const camera = useRef();

  const [trees, setTrees] = useState({
    type: "FeatureCollection",
    features: [],
  });
  const [tempTreeForm, setTempTreeForm] = useState({});
  const [sites, setSites] = useState(null);
  const [location, setLocation] = useState(null);
  const [errMsg, setErrMsg] = useState("");
  const [sliderTitle, setSliderTitle] = useState("");
  const [showSplash, setShowSplash] = useState(true);
  const [selectedTrees, setSelectedTrees] = useState(null);
  const [selectedSite, setSelectedSite] = useState(null);
  const [showAddSite, setShowAddSite] = useState(false);
  const [showAddTree, setShowAddTree] = useState(false);
  const [customMark, setCustomMark] = useState([0, 0]);
  const [showCustomMark, setShowCustomMark] = useState(false);
  const [showCustomTree, setShowCustomTree] = useState(false);
  const [showSelectedSite, setShowSelectedSite] = useState(false);
  const [currentScreen, setCurrentScreen] = useState("siteList");
  const [showList, setShowList] = useState(false);

  return (
    <ScreenContext.Provider value={{
      sliderRef,
      mapRef,
      camera,
      trees,
      setTrees,
      tempTreeForm,
      setTempTreeForm,
      sites,
      setSites,
      location,
      setLocation,
      errMsg,
      setErrMsg,
      sliderTitle,
      setSliderTitle,
      showSplash,
      setShowSplash,
      selectedTrees,
      setSelectedTrees,
      selectedSite,
      setSelectedSite,
      showAddSite,
      setShowAddSite,
      showAddTree,
      setShowAddTree,
      customMark,
      setCustomMark,
      showCustomMark,
      setShowCustomMark,
      showCustomTree,
      setShowCustomTree,
      showSelectedSite,
      setShowSelectedSite,
      currentScreen,
      setCurrentScreen,
      showList,
      setShowList,
    }}>
      <Main />
    </ScreenContext.Provider>
  );
};

export default App;

