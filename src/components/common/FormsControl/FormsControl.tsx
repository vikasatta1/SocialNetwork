import React, {ReactElement} from 'react';
import styles from './FormControls.module.css'
import {Field} from "redux-form";
import {required} from "../../../utils/validators/validators";


 const FormControl = ({input,meta, child,...props}:any) => {
     const hasError = meta.touched && meta.error;
     return (
         <div className={styles.formControl + " " + ( hasError ? styles.error : '')}>
             <div>
                 {props.child}
             </div>
             {hasError && <span>{meta.error}</span>}
         </div>

     )
}


 const TextArea = ({input,meta,...props}:any) => {
    const hasError = meta.touched && meta.error;
    return (
       <div className={styles.formControl + " " + ( hasError ? styles.error : '')}>
           <div>
           <textarea {...input} {...props}/>
           </div>
           {hasError && <span>{meta.error}</span>}
       </div>

    )
};


export const Input = ({input,meta,...props}:any) => {
    const hasError = meta.touched && meta.error;
    return (
        <div className={styles.formControl + " " + ( hasError ? styles.error : '')}>
            <div>
                <input {...input} {...props}/>
            </div>
            {hasError && <span>{meta.error}</span>}
        </div>

    )
};
export function createField<FormKeysType extends string>(placeholder: string | undefined,
                                                         name: FormKeysType,
                                                         validators: Array<any>,
                                                         component: React.FC<any>,
                                                         props = {}, text = "") {
    return <div>
        <Field placeholder={placeholder} name={name}
               validate={validators}
               component={component}
               {...props}
        /> {text}
    </div>
}




export default TextArea;