import react from 'react'
import React from "react";

type ProfileStatusProps = {
    status: string
}

class ProfileStatus extends React.Component<any, any> {
    state = {
        editMode: false,
        title: "Yo"
    }

    activatedEditMode = () => {
        this.setState({
            editMode: true
        })
    }
    deActivatedEditMode = () => {
        this.setState({
            editMode: false
        })
    }
    render() {
        return (
            <div>
                {!this.state.editMode &&
                <div>
                    <span onDoubleClick={this.activatedEditMode}>{this.props.status}</span>
                </div>}
                {this.state.editMode &&
                <div>
                    <input
                        autoFocus={true}
                        onBlur={this.deActivatedEditMode}
                        value={this.props.status}/>
                </div>
                }
            </div>
        )
    }
}

export default ProfileStatus;