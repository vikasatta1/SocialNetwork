import React from 'react';
import styles from './FormControls.module.css'
import {Field} from "redux-form";




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

export type GetStringKeys<T> = Extract<keyof T, string>


export default TextArea;