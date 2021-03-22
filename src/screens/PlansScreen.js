import React, { useEffect, useState } from 'react'
import { selectUser } from '../features/userSlice';
import { useSelector} from "react-redux"
import {useDispatch} from "react-redux"
import db from '../firebase';
import "./PlansScreen.css";
import { loadStripe } from '@stripe/stripe-js';
import { buy } from '../features/planSlice';

function PlansScreen({planName}) {

    const [products, setProducts] =useState([]);

    const user = useSelector(selectUser);

    const [subscription, setSubscription] = useState(null);

    const dispatch = useDispatch();

    useEffect(()=>{
        db.collection("customers")
        .doc(user.uid)
        .collection("subscriptions")
        .get()
        .then(querySnapshot =>{
            querySnapshot.forEach(async subscription =>{
                setSubscription({
                    role: subscription.data().role,
                    current_period_end: subscription.data().current_period_end.seconds,
                    current_period_start: subscription.data().current_period_start.seconds,
                    
                })
            })
        })

    },[user.uid])

    useEffect(()=>{
        db.collection('products')
        .where('active','==',true)
        .get().then((querySnapshot)=>{
        const products = {};
        querySnapshot.forEach(async productDoc =>{
            products[productDoc.id]=productDoc.data();
            const priceSnap = await productDoc.ref.collection
            ("prices").get();
            priceSnap.docs.forEach(price=>{
                products[productDoc.id].prices ={
                    priceId: price.id,
                    priceData: price.data()
                };
            });
        });
        setProducts(products);
        });

        console.log(`subscription ${subscription?.role} `)
        dispatch(buy({
            plan: subscription?.role
        }))

    }, [dispatch, subscription?.role])

    console.log(products);
    console.log(subscription)

    const loadCheckout = async (priceId, plan) =>{
        
        console.log(`priceId: ${priceId} `)
        console.log(`user id ${user.uid}`)
        console.log(`user email ${user.email}`)
        console.log(`user ${user}`)

        const docRef = await db
            .collection("customers")
            .doc(user.uid)
            .collection("checkout_sessions")
            .add({
                price: priceId,
                success_url: window.location.origin,
                cancel_url: window.location.origin,    
            });
            //The above adds sessionId automatically(because of extension)

            docRef.onSnapshot(async (snap)=>{

                //fetch the added sessionId
                const {error, sessionId} = snap.data();

                if(error){
                    alert(`An error occurred : ${error.message}`);
                }

                if(sessionId){
                    console.log(`session Id ${sessionId}`)
                    const stripe = await loadStripe(
                        "pk_test_51IWxbcSGdA2SwDhWxIamgfiq7it16gxk0WoEkzF8MHedMUHI7gi81Kaod4QkE2O2cu0lZ0agYGmGkSg8hIvSADIm00aXvJVMdf");
                    stripe.redirectToCheckout({sessionId});
                }
            })
  
            console.log(`plan: ${plan}`)

            
    };

    return (
        <div className="planScreen">

            <br></br>
            {subscription && <p>Renewal Date: {new Date(subscription?.
                current_period_end*1000).toLocaleDateString()}</p> }
            
            {
                Object.entries(products).map(([productId, productData]) => {
                    
                    const isCurrentPackage = productData.name?.toLowerCase()
                    .includes(subscription?.role);

                    return (
                        <div key={productId} 
                        className={`${
                            isCurrentPackage && "plansScreen__plan--disabled"
                        } plansScreen__plan`}
                        >
                            <div className="plansScreen__info">
                                <h5>{productData.name}</h5>
                                <h6>{productData.description}</h6>
                            </div>

                            <button onClick={()=> !isCurrentPackage && loadCheckout(productData.prices.priceId, productData.name)}>
                                {isCurrentPackage ? 'Current Package':'Subscribe'}
                            </button>
                        </div>
                    );
                })
            }

        </div>
    )
}

export default PlansScreen;
