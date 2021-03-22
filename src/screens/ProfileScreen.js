import React from 'react'
import { useSelector } from 'react-redux';
import { selectPlan } from '../features/planSlice';
import { selectUser } from '../features/userSlice';
import { auth } from '../firebase';
import Nav from '../Nav';
import PlansScreen from './PlansScreen';
import "./ProfileScreen.css";

function ProfileScreen({planName}) {

    const user = useSelector(selectUser);

    const plan = useSelector(selectPlan)
  
    console.log("plan name: "+plan)
    return (
        <div className="profileScreen">
            <Nav />
            <div className="profileScreen__body">
                <h1>Edit Profile</h1>
                <div className="profileScreen_row">
                    <div className="profileScreen__info">
                        <img
                        src="https://i.pinimg.com/originals/96/20/08/962008bd0eb249e4d575363114cec835.jpg"
                        alt=""
                        />
                    </div>

                    <div className="profileScreen__details">
                        <h2>{user.email}</h2>
                        <div className="profileScreen__plans">
                            <h3>Plans</h3>
                            
                            <h4>Current Plan: {(plan?.plan)?(plan.plan):'No plans'}</h4>

                            <PlansScreen/>
                            {/* <div className="profileScreen_each_plan">
                                <h4>Netflix Standard<br>
                                </br>1080p</h4>
                                <button>Subscribe</button>
                            </div>
                                                    
                            <div className="profileScreen_each_plan">
                            <h4>Netflix Basic
                                <br></br>480p</h4>
                                <button>Subscribe</button>
                            </div>

                            <div className="profileScreen_each_plan">
                                <h4>Netflix Premium
                                    <br></br>4k+HDR</h4>
                                <button>Current Package</button>
                            </div> */}


                            <button onClick={()=>auth.signOut()}
                            className="profileScreen_signout">
                                Sign Out
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileScreen;
