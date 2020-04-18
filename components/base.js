import React, { useEffect, useState } from 'react';
import Cookies from "universal-cookie";
import ReactLoading from 'react-loading';
import { useRouter } from 'next/router';
import moment from 'moment';

import Sidebar from '../components/sidebar';
import dataFetch from "../utils/dataFetch";
import Header from "./header";

const cookies = new Cookies();

const Base = ({ children, title }) => {
    const router = useRouter();
    const [loaded, setLoaded] = useState(false);
    const [isAdmin, setAdmin] = useState(false);

    const query = `
      mutation verifyToken($token: String!){
      verifyToken(token:$token){
        payload
      }
    }
    `;
    const fetchData = async variables => dataFetch({ query, variables });
    const fetchAdminStatus = async () => dataFetch({ query: `{ isAdmin }` });


    useEffect(() => {
        if(!loaded){
            const token = cookies.get('token');
            if(token){
                const variables = { token };
                fetchData(variables).then(r => {
                    if (!Object.prototype.hasOwnProperty.call(r, 'errors')) {
                        if(moment().unix() > r.data.verifyToken.payload.exp){
                            router.push('/logout');
                        }
                    }
                    else {
                        router.push('/logout');
                    }
                });
                fetchAdminStatus().then(r => {
                    setAdmin(r.data.isAdmin);
                    setLoaded(true);
                })
            }else {
                router.push('/login');
            }
        }
    });

    return loaded ? (
        <React.Fragment>
            <Header title={title}/>
            <Sidebar isAdmin={isAdmin} selected={router.pathname}>
                <div style={{minHeight: '100vh'}}>
                    {children}
                </div>
            </Sidebar>
        </React.Fragment>
    ):
    <div className="loading">
        <ReactLoading type={"bars"} color={"#001529"} height={'10%'} width={'10%'} />
    </div>
};

export default Base;