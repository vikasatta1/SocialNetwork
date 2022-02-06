import React from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {createField, Input} from "../common/FormsControl/FormsControl";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {loginThunkCreator} from "../../Redux/auth-reducer";
import {Redirect} from "react-router-dom";
import {AppStateType} from "../../Redux/reduxe-store";
import styles from "../common/FormsControl/FormControls.module.css"

type FormDataType = {
    login: string
    password: string
    rememberMe: boolean
    email: string
    captcha:string
}

const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props:any) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field
                    placeholder={'Email'}
                    name={'email'}
                    component={Input}
                    validate={[required]}
                />
            </div>
            <div>
                <Field
                    placeholder={'Password'}
                    name={'password'}
                    type={'password'}
                    component={Input}
                    validate={[required]}
                />
            </div>

            <div>
                <Field
                    component={Input}
                    name={'rememberMe'}
                    type={'checkbox'}
                    validate={[required]}
                /> remember me
            </div>
            {props.captchaUrl && <img src={props.captchaUrl}/>}
            {props.captchaUrl && createField("Symbols from image",'captcha',[required],Input,{})}
            {props.error && <div className={styles.formSummaryError}>
                {props.error}
            </div>}
            <div>
                <button>
                    Login
                </button>
            </div>
        </form>
    );
};

const LoginReduxForm = reduxForm<FormDataType>({form: 'login'})(LoginForm)

const Login = (props: any) => {
    const onSubmit = (formData: FormDataType) => {
        props.loginThunkCreator(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }
    if (props.isAuth) {
        return <Redirect to={'profile'}/>
    }


    return (
        <div>
            <h1>Login</h1>

            <LoginReduxForm onSubmit={onSubmit}
                // @ts-ignore
                            captchaUrl={props.captchaUrl}/>
        </div>
    );
};
const mapStateToProps = (state: AppStateType) => ({
        isAuth: state.auth.isAuth,
        captchaUrl:state.auth.captchaUrl
})
export default connect(mapStateToProps, {loginThunkCreator})(Login);