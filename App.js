import { Dimensions } from "react-native";
import Main from "./components/Main";
import { AuthProvider } from "./context/AuthContext";
import ScreenContext from "./context/screenContext";
import React, { useRef, useState } from "react";

const App = () => {
  const sliderRef = useRef();
  const mapRef = useRef();
  const camera = useRef();

  const [trees, setTrees] = useState({
    type: "FeatureCollection",
    features: [],
  });
  const [tempTreeForm, setTempTreeForm] = useState({
    treeID: 0,
    treeSpecies: "Oak",
    treeFamily: "Fagaceae",
    status: "Alive",
    condition: "Good",
    leafCondition: "Good",
    lastModifiedDate: "N/A",
    lastModifiedBy: "N/A",
    lastWorkDate: "N/A",
    lastWorkedBy: "N/A",
    needsWork: false,
    needsWorkComment: [],
    dbh: 0,
    dateCreated: "N/A",
    createdBy: "N/A",
    isPlanted: false,
    plantedBy: "N/A",
    datePlanted: "N/A",
    photos: [],
    siteID: "0",
  });
  const [sites, setSites] = useState(null);
  const [location, setLocation] = useState(null);
  const [errMsg, setErrMsg] = useState("");
  const [sliderTitle, setSliderTitle] = useState("");
  const [showSplash, setShowSplash] = useState(true);
  const [selectedTrees, setSelectedTrees] = useState(null);
  const [selectedSite, setSelectedSite] = useState(null);
  const [customMark, setCustomMark] = useState([0, 0]);
  const [showCustomMark, setShowCustomMark] = useState(false);
  const [showCustomTree, setShowCustomTree] = useState(false);
  const [currentScreen, setCurrentScreen] = useState("siteList");
  const [showList, setShowList] = useState(false);
  const [workingTree, setWorkingTree] = useState(null);
  const { width, height } = Dimensions.get("window");
  const [treeLength, setTreeLength] = useState(0);

  return (
    <AuthProvider>
      <ScreenContext.Provider
        value={{
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
          customMark,
          setCustomMark,
          showCustomMark,
          setShowCustomMark,
          showCustomTree,
          setShowCustomTree,
          currentScreen,
          setCurrentScreen,
          showList,
          setShowList,
          workingTree,
          setWorkingTree,
          width,
          height,
          treeLength,
          setTreeLength,
        }}
      >
        <Main />
      </ScreenContext.Provider>
    </AuthProvider>
  );
};

export default App;
