import React, { useState } from "react";
import allColors from "../../utils/colors.js";
import JerseyCustomisableData from "../../utils/jerseyCustomisableData.js";

// onColorSelect is for passing the selected color and selectedNeckId is for getting the selectedNeck from neck options 
export default function Color({ onColorSelect, selectedNeckId ,shapeColor}) {

  // getting the selected Jersey from the localstorage
  const selectedJersy = localStorage.getItem("selectedJersy");

  // now getting all data associated to a particular jersey
  const jerseyData = JerseyCustomisableData[selectedJersy];

  // state for showing and hiding color palette
  const [showColor, setShowColor] = useState("");

  // state for recent colors
  const [recentColors, setRecentColors] =  useState(['#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff','#fff']);

  // state for the currently selected color for each area
  const [selectedColors, setSelectedColors] = useState({});

  const handleShowColor = (palette) => {
    setShowColor(showColor === palette ? "" : palette);
  };

  // state and function for showing and hiding color tabs
  const [showAnswer, setShowAnswer] = useState(false);

  const handleTab = (event) => {
    if (event === "color-uniform-layer") {
      setShowAnswer(!showAnswer);
    }
  };

  // passing the selected color to parent as a callback function and updating recent colors
  const handleColor = (color, area) => {
    onColorSelect(color, area);

    // Update the recent colors
    setRecentColors((prevColors) => {
      const newColors = [color, ...prevColors.filter((c) => c !== color)];
      return newColors.slice(0, 10);
    });

    // Update the selected color for the specific area
    setSelectedColors((prevColors) => ({
      ...prevColors,
      [area]: color
    }));
  };

  // function is called here , with area as shirt, neck, shoulder . buttonText for label . Layer for number of color buttons
  // and selectedNeckId for selected neck
  const renderColorSelection = (area, buttonText, layers, selectedNeckId) => {
    const colorAreas = [];

    // created variable that store layers of neck
    let neckLayers = layers;

    // if neck is selected and it is from 2,4,12 . The parseInt function is used because the selectedNeckId might be a string, and you want to compare it with the numeric values in the array
    if (selectedNeckId && [2, 4, 12].includes(parseInt(selectedNeckId))) {
      neckLayers = 2;
    } else {
      neckLayers = 1;
    }

    // start a loop if area is neck then use neckLayers else use layers for shoulder and shirt
    for (let i = 1; i <= (area === "neck" ? neckLayers : layers); i++) {
      const colorKey = area + i;

      // then push all these buttons inside the colorAreas array
      colorAreas.push(
        <div style={{ display: "flex", flexDirection: "column" }} key={i}>
          {/* this is the label let say shirt1, shirt2, neck1, neck3 */}
          <span>{buttonText} {i}</span>
          {/* this is the button for handling to show or hide color palette */}
          <input
            type="button"
            style={{
              backgroundColor: selectedColors[colorKey] || shapeColor[colorKey] || "#fff",
              height: "30px",
              width: "30px",
              marginRight: "250px",
            }}
            onClick={() => handleShowColor(colorKey)}
          />
          {/* Show recent colors */}
          {showColor === colorKey && (
            <>
              <div style={{ display: "flex", marginBottom: "10px" }}>
                {recentColors.map((color, index) => (
                  <input
                    key={index}
                    type="button"
                    style={{
                      backgroundColor: color,
                      height: "15px",
                      width: "15px",
                      marginRight: "5px",
                    }}
                    onClick={() => handleColor(color, colorKey)}
                  />
                ))}
              </div>
              <div className="color-row">
                {allColors.map((color, index) => (
                  <input
                    key={index}
                    type="button"
                    style={{
                      backgroundColor: color,
                      height: "15px",
                      width: "15px",
                      marginRight: "5px",
                    }}
                    onClick={() => handleColor(color, colorKey)}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      );
    }
    return colorAreas;
  };

  return (
    <>
      <li className={`color-uniform ${showAnswer ? "active" : ""}`}>
        <h3 onClick={() => handleTab("color-uniform-layer")}>Color Uniform</h3>
        {/* if showAnswer is true means tab is open then */}
        {showAnswer && (
          <div className="answer-wrap">
            <div className="answer">
              <div className="customize-prod-list scrollbar">
                {/* run this function for 3 times because we have section for shirt, neck, and shoulder */}
                {/* 3rd parameter is for getting the layers to decide the number of color button to show */}
                {/* but for neck we also have selectedNeckId */}
                <div className="wrapper">
                  <h4 className="customize-heading">Uniform Colors</h4>
                  <div className="color-row">
                    <div className="color-col">
                      <div className="color-info">
                        {renderColorSelection("shirt", "Color", jerseyData.uniform_layers)}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="wrapper">
                  <h4 className="customize-heading">Neck Colors</h4>
                  <div className="color-row">
                    <div className="color-col">
                      <div className="color-info">
                        {renderColorSelection("neck", "Color", jerseyData.neck_style, selectedNeckId)}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="wrapper">
                  <h4 className="customize-heading">Shoulders Colors</h4>
                  <div className="color-row">
                    <div className="color-col">
                      <div className="color-info">
                        {renderColorSelection("shoulder", "Color", jerseyData.shoulder_layers)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </li>
    </>
  );
}
