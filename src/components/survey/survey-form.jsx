import { delay } from "framer-motion";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { AddStudentTopic, GetStudentTopics } from "../../api";
import ErrorAlert from "../../functions/Alert/ErrorAlert";
import ButtonLoadingMedium from "../../functions/Loading/ButtonLoadingMedium";
import { useRouter } from "next/router";

const Surveyform = () => {
  const [profession, setProfession] = useState("");
  const [suggestions, setSuggestions] = useState();
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [selectedSuggestions, setSelectedSuggestions] = useState([]);
  const [loading, setloading] = useState(false)
  const router = useRouter();
  

  useEffect(() => {
    GetStudentTopics(setSuggestions,setFilteredSuggestions)
   
  }, []);



  const handleInputChange = (e) => {
    const userInput = e.target.value;
    setProfession(e.target.value);

    const filtered = suggestions
      .filter((suggest) =>
        suggest.topic.toLowerCase().includes(userInput.toLowerCase())
      )
      .sort((a, b) => {
        const aIndex = a.topic.toLowerCase().indexOf(userInput.toLowerCase());
        const bIndex = b.topic.toLowerCase().indexOf(userInput.toLowerCase());
        return aIndex - bIndex;

      });

    setFilteredSuggestions(filtered);

    console.log(filtered)
  };

  const handleSuggestionClick = (suggest) => {

    if (selectedSuggestions.length < 5) {
      setSelectedSuggestions([...selectedSuggestions, suggest]);
      const updatedSuggestions = suggestions.filter((item) => item.id != suggest.id);
      setSuggestions(updatedSuggestions);
      setFilteredSuggestions(updatedSuggestions);
      setProfession("")

    }else{
      ErrorAlert("Limit Exceeded!","You can only select up to 5 Topics.")
      return
    }



    console.log(suggest)
    console.log(selectedSuggestions)
  };

  const removeTag = (removedSuggestion) => {
    const updatedSuggestions = selectedSuggestions.filter(
      (suggest) => suggest.id != removedSuggestion.id
    );
    
    setSelectedSuggestions(updatedSuggestions);

    setSuggestions([...suggestions, removedSuggestion]);
    setFilteredSuggestions([...suggestions, removedSuggestion]);
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


  const handleStudentInterestedTopics = (e) =>{
    e.preventDefault()

    setloading(true)

    if(selectedSuggestions.length != 5){
      console.log(selectedSuggestions)
      ErrorAlert("Error","Please Select 5 Topics")
      setloading(false)
      return
    }
    AddStudentTopic(selectedSuggestions,setloading,router)
    // console.log(selectedSuggestions)

  }

  return (
    <div>
      <form onSubmit={handleStudentInterestedTopics}>
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
                  {suggest.topic}
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
                    <i className="fa-solid fa-xmark"></i>
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
                Popular Topics <i className="icon-2 mx-1"></i>
              </h6>
              {filteredSuggestions != null && filteredSuggestions.map((suggest, index) => (
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
                  {suggest.topic}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="form-group">
          {loading ? <ButtonLoadingMedium /> : (
            <button type="submit" className="edu-btn btn-medium">
              Submit <i className="icon-4"></i>
            </button>
          )}
            
        </div>
      </form>
    </div>
  );
};

export default Surveyform;
