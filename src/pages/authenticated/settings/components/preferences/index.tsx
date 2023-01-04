import { IStudent } from "../../types";

const PreferenceComp: React.FC<IStudent> = ({ preferences }) => {
    return (
        <div className="card aos-init aos-animate z-depth-0" style={{
            border: "1px solid #dcdee2",
        }} data-aos="zoom-in">
            <div className="card-content">
                <span className="card-title center"><b><small>PREFERENCES</small></b></span>

                <form /*onsubmit="setPreferences(event,'<%= csrftoken %>');"*/>
                    <div className="row center">
                    <p className="range-field">
                        <span className="light sub-modal-texts">Number of questions per paper</span>
                        <input type="range" id="test5" value={preferences?.numberOfQuestions || 5} name="ques_per_paper" min="5" max="10" />
                    </p>
                    </div>
                    <button className="waves-effect waves-light btn-small z-depth-0 sub-modal-texts" type="submit" style={{ width: "100%" }}><b>Update Preferences</b></button>
                </form>

            </div>
        </div>

    );
}

export default PreferenceComp;