import { Link, useLocation, useNavigate } from 'react-router-dom';
import img from '../assets/images/login/login.svg'
import { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import axios from 'axios';

const Login = () => {
    const {signIn}=useContext(AuthContext)
    const location=useLocation()
    const navigate=useNavigate()

    const handleLogin=e=>{

        e.preventDefault()
        const form=e.target
        const email=form.email.value
        const password=form.password.value
        console.log(email,password);

        signIn(email,password)
        .then(result=>{
            const loggedInUser=result.user
            console.log(loggedInUser);
            const user={email}
           
            // get access token
            axios.post('http://localhost:5000/jwt',user,{withCredentials:true})
            .then(res=>{
                console.log(res.data);
                if(res.data.success){
                     navigate(location?.state?location?.state : '/')
                }
            })
        })
        .catch(error=>{
            console.log(error);
        })
    }

    return (
        <div className="hero min-h-screen bg-base-200 mt-20">
            <div className="hero-content flex-col lg:flex-row">
                <div className="lg:w-1/2 mr-12">
               <img src={img} alt="" />
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleLogin} className="card-body">
                    <h1 className="text-3xl text-center font-bold">Login</h1>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="email"
                            name='email' 
                            className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" placeholder="password"
                            name='password' className="input input-bordered" required />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <input className="btn btn-primary" type="submit" value="login" />
                        </div>
                    </form>
                   <Link to='/signup'>
                   <p className='text-orange-500 mb-4 text-center'>Sign Up</p>
                   </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;