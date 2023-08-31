import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../../App';

const Login = () => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm()
    const [loggedInUser, setLoggedInUser] = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const navigate = useNavigate();

    const apiUrl = process.env.REACT_APP_API_ROOT;

    const onSubmit = data => {
        setIsLoading(true)

        fetch(`${apiUrl}/auth/login`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    const { email, name } = data.user
                    const newLoggedInInfo = { email, name }
                    setLoggedInUser(newLoggedInInfo)
                    localStorage.setItem('auth-token', data.token)
                    navigate("/")
                } else {
                    setError(data.msg)
                    setIsLoading(false)
                }
                
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <div className='col-md-6 mx-auto'>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <h6 className='text-secondary mt-3'>Your Email <span className='text-danger'>*</span></h6>
                            <input
                                type="email"
                                placeholder='Email'
                                className='form-control'
                                {...register("email", { required: true })}
                            />
                            {errors.email && <span className="text-danger">"Email" is not allowed to be empty</span>}
                            <h6 className='text-secondary mt-3'>Password <span className='text-danger'>*</span></h6>
                            <input
                                type="password"
                                placeholder='Password'
                                className='form-control'
                                {...register("password", { required: true })}
                            />
                            {errors.password && <span className="text-danger">"Password" is not allowed to be empty</span>}
                        </form>
                        {
                            isLoading ? <div className="spinner-border spinner-border-sm my-3" role="status"></div>
                            : <button className='custom-large-btn mt-3 mx-auto'>Login</button>
                        }
                        <p className='my-3 text-danger'>{error}</p>
                        <p className='mt-2'>Didn't register yet? Please <Link to="/signup" style={{ textDecoration: 'none', color: 'black' }}>register</Link></p>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Login;