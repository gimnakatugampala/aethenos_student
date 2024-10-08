import React from "react";
import Surveyform from "../../components/survey/survey-form";

const SurveyArea = () => {
  return (
    <section className="account-page-area section-gap-equal">
      <div className="container position-relative">
        <div className="row g-5 justify-content-center">
          <div className="col-lg-10">
            <div className="login-form-box">
              <h1 className="title">Interested Topics</h1>
                <h3>Please answer this question for personalized recommendations</h3>
              <Surveyform />
            </div>
          </div>
        </div>
     
      </div>
    </section>
  );
};

export default SurveyArea;
