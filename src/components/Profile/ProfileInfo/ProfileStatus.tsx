import React from "react";

type PropsType = {
    updateStatus: (status: string) => void
    status: string
}

class ProfileStatus extends React.Component<PropsType> {

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
    onStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value
        });
    }

    componentDidUpdate(prevProps: Readonly<PropsType>, prevState: Readonly<{}>, snapshot?: any) {
      if(prevProps.status !== this.props.status){
        this.setState({
            status: this.props.status
        })}
        let a = this.state
        let b = this.props
    }

    render() {
        return (
            <div>
                {!this.state.editMode &&
                <div>
                    <span onDoubleClick={this.activatedEditMode}>{this.props.status || "Hello Vika"}</span>
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