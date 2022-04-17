import React from "react";
import './Frame.css'

class Frame extends React.Component {
    render() {
        return(
            <div className="frame">
                {this.props.text}
            </div>
        );
    }
}

export default(Frame);