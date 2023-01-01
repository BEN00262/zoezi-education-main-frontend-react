import { useZoeziMainTrackedState } from "../../../../../context";

const GreetingsComp = () => {
    const { lastname } = useZoeziMainTrackedState();

    return (
        <div className="row" id="welcome-message">
            <div className="col s12">
                <div className="card z-depth-0 darken-1">
                    <div style={{ padding:13 }}>
                        <span className="card-title teal-text welcome-font" style={{ fontSize:30 }}><b>Karibu {lastname}</b></span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GreetingsComp;