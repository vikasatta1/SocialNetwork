import React, {useState} from "react";

type PropsType = {
    updateStatus: (status: string) => void
    status: string
}

const ProfileStatusWithHooks = (props: PropsType) => {

    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)
    const activateMode = () => {
        setEditMode(true)
    }
    const deActivatedEditMode = () => {
       setEditMode(false)
        props.updateStatus(status)
    }
   const onStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
       setStatus( e.currentTarget.value);
    }
    return (
        <div>
            {!editMode &&
            <div>
                <span onDoubleClick={activateMode}>{props.status || "Hello Vika"}</span>
            </div>}
            {editMode &&
            <div>
                <input autoFocus={true}
                       onBlur={deActivatedEditMode}
                       onChange={onStatusChange}
                       value={status}
                />

            </div>
            }
        </div>
    )
}


export default ProfileStatusWithHooks;