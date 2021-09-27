import React from "react";


type ProfileStatusProps = {
    status: string
}

class ProfileStatus extends React.Component<any, any> {

    state = {
        editMode: false,
        status: this.props.status
    }

    activatedEditMode = () => {
        this.setState({
            editMode: true
        })
    }
    deActivatedEditMode = () => {
        this.setState({
            editMode: false
        });
        this.props.updateStatus(this.state.status)
    }
    onStatusChange = (e:React.ChangeEvent<HTMLInputElement>) => {
     this.setState({
         status: e.currentTarget.value
     }) ;

    }
    render() {
        return (
            <div>
                {!this.state.editMode &&
                <div>
                    <span onDoubleClick={this.activatedEditMode}>{this.props.status || "Hello Vika" }</span>
                </div>}
                {this.state.editMode &&
                <div>
                    <input
                        onChange={this.onStatusChange}
                        autoFocus={true}
                        onBlur={this.deActivatedEditMode}
                        value={this.state.status}/>
                </div>
                }
            </div>
        )
    }
}

export default ProfileStatus;