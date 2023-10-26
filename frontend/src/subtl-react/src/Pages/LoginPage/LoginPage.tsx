import React, { useEffect, useState } from 'react';
import { getAllCompanies, getCompanies, getCompanyRegisterResponse, getLoginResponse, getRegisterResponse, getUserDetails, GoogleSSO } from '../../utils/APIUtils.ts';
import { Button, TextField, Snackbar, FormControl, Select, InputLabel, MenuItem, Alert } from '@mui/material';
import { PersonOutline, VpnKeyOutlined, VisibilityOutlined, VisibilityOffOutlined, AbcOutlined, Opacity } from '@mui/icons-material';
import RenderImage from '../../Components/RenderImage.tsx';
import LoginPageImage from '../../Assets/Subtl_Login_Header.svg';
import SubtlLogo from '../../Assets/subtl_logo.png'
import { rootStyle, leftStyle, rightStyle, inputDiv, LoginBtn, RegisterBtn, ButtonsDiv, LoginPageLeftInputIcon,LoginPageRightInputIcon, InputSpan } from './styles.ts'
import './customStyles.css'
import { checkStrEmpty } from '../../utils/utils.ts';
import { SelectChangeEvent } from '@mui/material/Select';
import { GoogleLogin } from '@react-oauth/google';


export default function LoginPage() {

    const [email, setEmail] = useState<string | null>(null)
    const [name, setName] = useState<string | null>(null)
    const [lastname, setLastName] = useState<string | null>(null)
    const [password, setPassword] = useState<string | null>(null)
    const [rePassword, setRePassword] = useState<string | null>(null)
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [alert, setAlert] = useState(false)
    const [register, setRegister] = useState(false)
    const [alertText, setAlertText] = useState('')
    const [instance, setInstance] = useState('')
    const [customInstance, setCustomInstance] = useState('')
    const [showcustom, setshowcustom] = useState(false)
    const [registerWithGoogle, setRegisterWithGoogle] = useState(false)
    const [userisregistered, setuserisregistered] = useState(false)


    const handleInstanceChange = (event: SelectChangeEvent) => {
        setInstance(event.target.value);
        if (event.target.value === 'Empty') {
            setshowcustom(true);

        } else {
            setshowcustom(false)
        }
    };

    function LoginFunction() {
        return new Promise((resolve, reject) => {
            if (!email || !password) {
                reject(true)
            }
            if(email&&password){
                getLoginResponse(email, password).then((res: any) => {
                    if (res.detail) {
                        setAlert(true)
                        setAlertText(res.detail)
                        return
                    }
                    console.log("LOGGED IN!", res);
                    sessionStorage.setItem('access_token', res.access_token);
                    getCompanies(res.access_token).then((res: any) => {
                        sessionStorage.setItem('company_group', res[0]);
                        sessionStorage.setItem('company_id', res[1]);
                        sessionStorage.setItem('company_name', res[2]);
                    })
                    getUserDetails(res.access_token).then((res) => {
                        console.log(res);;
                        sessionStorage.setItem('LoggedIn', "true")
                        sessionStorage.setItem('user_info', JSON.stringify(res));
                        // window.open('http://ec2-15-207-71-215.ap-south-1.compute.amazonaws.com:8080/home', '_self')
                        resolve(true)
                    })
                    // window.open('http://ec2-15-207-71-215.ap-south-1.compute.amazonaws.com:3000/home', '_self')
                })
            }
        })
    }

    function RegisterFunction() {
        if (!email || !password) return
        if (!checkStrEmpty(password)
            && !checkStrEmpty(rePassword)
            && !checkStrEmpty(email)
        ) {
            if (instance && name && lastname && instance !== 'Empty') {
                getRegisterResponse(email, password, name, instance, lastname).then((res: any) => {
                    console.log('Registered!', res)
                    if (res['status'] === 201) {
                        LoginFunction().then((res)=>{
                            if(res){
                                setuserisregistered(true)
                            }
                        })
                    }
                })
                    .catch((err) => {
                        if (typeof err.response.data.detail === 'string') {
                            setAlert(true)
                            setAlertText(err.response.data.detail)
                        } else {
                            setAlert(true)
                            setAlertText(err.response.data.detail[0].msg)
                        }
                        console.log(err.response.data.detail);

                    })
            } else if (instance === 'Empty' && name && lastname && customInstance) {
                getCompanyRegisterResponse(email, password, name, customInstance, lastname).then((res) => {
                    console.log('Company Registered!', res);
                    LoginFunction().then((res)=>{
                        if(res){
                            setuserisregistered(true)
                        }
                    })
                })
            }
        }
    }

    function GoogleRegister(credential:string){
        if(instance==='Empty'){//if custom instance
            if(customInstance!==''){
                GoogleSSO(credential).then((res)=>{
                    console.log(res)
                })
            }else{
                setAlert(true)
                setAlertText('please choose an instance')
            }
        }else if(instance && instance!==''){
            GoogleSSO(credential).then((res)=>{
                console.log(res)
            })
        }else{
            setAlert(true)
            setAlertText('please choose an instance')
        }
    }

    function SyntheticLoginButtonclick(e: React.KeyboardEvent) {
        let btn = document.getElementById('loginbtn');
        if(btn){
            if (e.key === 'Enter' && email !== null && email !== '' && password !== null && password !== '') {
                btn.style.background = '#00000080'
                LoginFunction().then((success) => {
                    if (success) {
                        window.open('/#/home', '_self')
                    }
                })
            }
        }
    }

    return (
        
            <div 
            className='LoginPage' style={rootStyle}>
                <div className='LoginLeft' style={leftStyle}>
                    <RenderImage width={'85%'} src={LoginPageImage} />
                </div>
                <div className='LoginRight' style={rightStyle}>
                    <RenderImage width={'70%'} src={SubtlLogo} styles={{ marginTop: '10px' }} />
                    <div style={inputDiv}>
                        {register ?
                            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                                <InputLabel id="demo-select-small">Instance</InputLabel>
                                <Select
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    value={instance}
                                    label="Instance"
                                    onChange={handleInstanceChange}
                                >
                                    <MenuItem value=''>
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={"ee50849c-cd75-4510-a84d-0fd4791a40a8"}>Youtube Videos</MenuItem>
                                    <MenuItem value={"2d9ca734-b475-49f7-ad9e-55b5f4158b24"}>RBI Regulations</MenuItem>
                                    <MenuItem value={"Empty"}>Create an Empty Instance</MenuItem>
                                </Select>
                            </FormControl>
                            : null
                        }
                        <span className='LoginInputs'>

                            {/* Instance Name Input Field */}
                            {showcustom && register ? <span style={InputSpan}>
                                <span style={LoginPageLeftInputIcon}><AbcOutlined /></span>
                                <TextField style={{ width: '100%' }} onChange={(e) => {
                                    setCustomInstance(e.target.value)
                                }}
                                    label="Company Name" variant="filled" />
                            </span> : null
                            }

                            {/* Name Input Field */}
                            {register &&!registerWithGoogle ? <span style={InputSpan}>
                                <span style={LoginPageLeftInputIcon}><AbcOutlined /></span>
                                <TextField style={{ width: '100%' }} onChange={(e) => {
                                    setName(e.target.value)
                                }}
                                    label="First Name" variant="filled" />
                            </span> : null
                            }

                            {/* Last Name Input Field */}
                            {register&&!registerWithGoogle ? <span style={InputSpan}>
                                <span style={LoginPageLeftInputIcon}><AbcOutlined /></span>
                                <TextField style={{ width: '100%' }} onChange={(e) => {
                                    setLastName(e.target.value)
                                }}
                                    label="Last Name" variant="filled" />
                            </span> : null
                            }

                            {/* Enterprise Email Input Field */}
                            {!registerWithGoogle&&<span style={InputSpan}>
                                <span style={LoginPageLeftInputIcon}><PersonOutline /></span>
                                <TextField 
                                onKeyDown={(e)=>{
                                    if(register)return
                                    SyntheticLoginButtonclick(e)
                                }}
                                style={{ width: '100%' }} onChange={(e) => {
                                    setEmail(e.target.value)
                                }} label="Enterprise Email" variant="filled" />
                            </span>}

                            {/* Password Input Field */}
                            {!registerWithGoogle&&<span style={InputSpan}>
                                <span style={LoginPageLeftInputIcon}><VpnKeyOutlined /></span>
                                <TextField 
                                onKeyDown={(e)=>{
                                    if(register)return
                                    SyntheticLoginButtonclick(e)
                                }}
                                style={{ width: '100%' }} type={passwordVisible ? 'string' : 'password'} onChange={(e) => {
                                    setPassword(e.target.value)
                                }}
                                    label="Password" variant="filled" />
                                <span
                                    onClick={() => setPasswordVisible(!passwordVisible)}
                                    style={LoginPageRightInputIcon}>
                                    {passwordVisible ? <VisibilityOutlined /> : <VisibilityOffOutlined />}
                                </span>
                            </span>}

                            {/* Re-Type Password Input Field */}
                            {register&&!registerWithGoogle ? <span style={InputSpan}>
                                <span style={LoginPageLeftInputIcon}><VpnKeyOutlined /></span>
                                <TextField style={{ width: '100%' }} type={passwordVisible ? 'string' : 'password'} onChange={(e) => {
                                    setRePassword(e.target.value)
                                }}
                                    label="Re-Type Password" variant="filled" />
                            </span> : null
                            }

                        </span>
                    </div>
                    <div style={ButtonsDiv}>

                        {/* Register with google button */}
                        {/* {register&&!registerWithGoogle && <Button
                            variant={'contained'} style={LoginBtn}
                            onClick={() => {
                                setRegisterWithGoogle(true)
                            }}>
                            {"Register with Google?"}
                        </Button>} */}



                        {/* Register button */}
                        {register&&!registerWithGoogle && <Button
                            disabled={
                                email === null || email === '' || password === null ||
                                    password === '' || name === null || rePassword === null || rePassword === '' || lastname === null
                                    || instance === null || instance === ''
                                    ? true : false
                            }
                            variant={'contained'} style={LoginBtn}
                            onClick={() => {
                                RegisterFunction()
                            }}>
                            {"Register"}
                        </Button>}


                        {/* Google Login Button */}
                        {!register && <div style={{width:'100%',margin:'5px', display:'none'}}><GoogleLogin
                            size='large'
                            // @ts-ingore
                            width={ `${document.getElementById('loginBtns')?.clientWidth}px`}
                            onSuccess={credentialResponse => {
                                if(credentialResponse.credential===undefined)return
                                console.log(credentialResponse);
                                GoogleSSO(credentialResponse.credential).then((res)=>{
                                    console.log(res)
                                })
                            }}
                            onError={() => {
                                console.log('Login Failed');
                            }}
                        /></div>}


                        {/* Google Register Button */}
                        {registerWithGoogle && 
                        <div style={{
                            width:'100%',
                            margin:'5px', 
                            display:'none',
                            pointerEvents:instance!=='Empty'&&instance!=='' ? 'auto':customInstance?'auto':'none',
                            opacity:instance!=='Empty'&&instance!=='' ? '1':customInstance?'1':'0.4'
                        }}>
                            <GoogleLogin
                            text={'signup_with'}
                                size='large'
                                width={ `${document.getElementById('loginBtns')?.clientWidth}px`}
                                onSuccess={credentialResponse => {
                                    if(credentialResponse.credential===undefined)return
                                    GoogleRegister(credentialResponse.credential)
                                }}
                                onError={() => {
                                    console.log('Login Failed');
                                }}
                            />
                        </div>}
                        


                            {/* Login Button */}
                            {!register && 
                            <Button
                                id='loginbtn'
                                disabled={
                                    email === null || email === '' || password === null ||
                                        password === ''
                                        ? true : false
                                }
                                variant={'contained'} style={LoginBtn}
                                onClick={() => {
                                    LoginFunction().then((res)=>{
                                        if(res){
                                            window.open('/#/home', '_self')
                                        }
                                    })
                                }}>
                                {"Login"}
                            </Button>}


                            {/* Register or Back button */}
                            {!registerWithGoogle?
                            <Button id='loginBtns' onClick={() => setRegister(!register)} variant={'outlined'} style={RegisterBtn}>
                                {register ? "Back" : "Register"}
                            </Button>:
                            <Button id='loginBtns' onClick={() => setRegisterWithGoogle(!registerWithGoogle)} variant={'outlined'} style={RegisterBtn}>
                                {"Back"}
                            </Button>
                        }


                    </div>
                </div>
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    open={alert}
                    autoHideDuration={4000}
                    message={alertText}
                    onClose={() => setAlert(false)}
                />
            {userisregistered&&<Alert
            className='successregister'
                action={
                    <Button 
                    onClick={()=>{
                        window.open('/#/home', '_self')
                    }}
                    color="inherit" size="small">
                        Go To The App
                    </Button>
                }
            >
                You have successfully Registered!
            </Alert>}
                
            </div>
    )
}