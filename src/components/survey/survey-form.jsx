import { delay } from "framer-motion";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

const Surveyform = () => {
  const [profession, setProfession] = useState("");
  const [suggestions, setSuggestions] = useState([
    "Web Developer",
    "Software Engineer",
    "Graphic Designer",
    "Data Analyst",
    "UX Designer",
    "Data Scientists",
    "UX Designer",
    "Data Scientists",
  ]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [selectedSuggestions, setSelectedSuggestions] = useState([]);

  useEffect(() => {
    setFilteredSuggestions(suggestions);
  }, [suggestions]);

  const handleInputChange = (e) => {
    const userInput = e.target.value;
    setProfession(userInput);

    const filtered = suggestions
      .filter((suggest) =>
        suggest.toLowerCase().includes(userInput.toLowerCase())
      )
      .sort((a, b) => {
        const aIndex = a.toLowerCase().indexOf(userInput.toLowerCase());
        const bIndex = b.toLowerCase().indexOf(userInput.toLowerCase());
        return aIndex - bIndex;
      });

    setFilteredSuggestions(filtered);
  };
  const handleSuggestionClick = (suggest) => {
    if (selectedSuggestions.length < 5) {
      setProfession("");
      setSelectedSuggestions([...selectedSuggestions, suggest]);

      const updatedSuggestions = suggestions.filter((item) => item !== suggest);
      setSuggestions(updatedSuggestions);
      setFilteredSuggestions(updatedSuggestions);
    } else {
      Swal.fire({
        title: "Limit Exceeded!",
        text: "You can only select up to five professions.",
        icon: "warning",
      });
    }
  };

  const removeTag = (removedSuggestion) => {
    const updatedSuggestions = selectedSuggestions.filter(
      (suggest) => suggest !== removedSuggestion
    );
    setSelectedSuggestions(updatedSuggestions);

    setSuggestions([...suggestions, removedSuggestion]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedSuggestions.length === 0) {
      Swal.fire({
        title: "Empty Field!",
        text: "Please Fill in Your Interest",
        icon: "error",
      });
    } else if (selectedSuggestions.length < 5) {
      Swal.fire({
        title: "Insufficient Interest!",
        text: "Please select five Interest",
        icon: "error",
      });
    } else {
      Swal.fire({
        title: "Thanks for the Information !",
        text: "Proffesions added successfully",
        icon: "success",
      });
      
      window.location.href = "/?login=success";
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="current-log-profession">
            <h4>
             What are Your Favorite Topics ? (Please Select 5 Topics.)
            </h4>
          </label>

          {selectedSuggestions.length > 0 && (
            <div className="tags">
              {selectedSuggestions.map((suggest, index) => (
                <span
                  key={index}
                  className="tag mx-1"
                  style={{
                    display: "inline-block",
                    borderRadius: "4px",
                    backgroundColor: "#f2f2f2",
                    margin: "5px",
                    color: "inherit",
                    padding: "5px",
                  }}
                >
                  {suggest}
                  <button
                    key={index}
                    className="tag mx-1"
                    type="button"
                    style={{
                      border: "none",
                      display: "inline-block",
                      color: "red",
                      borderRadius: "4px",

                      backgroundColor: "transparent",
                      padding: "1px",
                      cursor: "pointer",
                    }}
                    onClick={() => removeTag(suggest)}
                  >
                    x
                  </button>
                </span>
              ))}
            </div>
          )}

          <div className="custom-dropdown">
            <input
              className="input-field mt-3"
              type="text"
              onChange={handleInputChange}
              value={profession}
              placeholder="Enter your Topics (e.g., Web Developer)"
              disabled={selectedSuggestions.length >= 5}
              style={{ display: "inline-block", padding: "15px" }}
            />
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                maxWidth: "100%",
                marginTop: "5px",
              }}
            >
              <h6 className="mt-3" style={{ width: "100%" }}>
                Popular professions <i class="icon-2 mx-1"></i>
              </h6>
              {filteredSuggestions.map((suggest, index) => (
                <span
                  key={index}
                  onClick={() => handleSuggestionClick(suggest)}
                  style={{
                    backgroundColor: "#f2f2f2",
                    padding: "5px 10px",
                    margin: "5px",
                    borderRadius: "4px",
                    cursor: "pointer",
                    display: "inline-block",
                  }}
                >
                  {suggest}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="form-group">
          <button type="submit" className="edu-btn btn-medium">
            Submit <i className="icon-4"></i>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Surveyform;
