import {
  React, 
  Component,
} from 'react';
import './Login.css'
import { GooglePlusOutlined,FacebookOutlined,TwitterOutlined } from '@ant-design/icons';

class Login extends Component {

  render(){
    return(
      <div className='lg_bg'>
        <p className='lg_tit'><br/>New System</p>
        <div className='lg_cb'>
          <p className='lg_bg_tit'>Login</p>
          <p className='lg_bg_sbtit'>Please Enter Your Username and Password</p>
          <input className='lg_bg_email' placeholder='Username'></input>
          <input className='lg_bg_pw' placeholder='Password' type="password"></input> 
          <p className='lg_bg_fp'>Forget Password</p>
          <p className='lg_bg_su'>Sign up</p>
          <button className='lg_bg_btn_lg'>Login</button>
          <br/><br/>
          <GooglePlusOutlined className='lg_bg_g'/>
          <FacebookOutlined className='lg_bg_fb'/>
          <TwitterOutlined className='lg_bg_tt'/>
        </div>
      </div>
    )
  }
}

export default Login;
  
