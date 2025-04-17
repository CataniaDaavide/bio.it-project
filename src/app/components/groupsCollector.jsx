"use client"
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import LoaderComponent from './loader';
import { Group, GroupPrivate } from './group';

export default function GroupsCollector() {
    const {user,setUser, isLoading} = useContext(UserContext)
    
    const deleteGroup = async (index) => {
        
        const newGruppi = [...user.gruppi];
        newGruppi.splice(index, 1); // rimuovi il gruppo in posizione `index`

        const url = `/api/update-user`;
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: user.email, gruppi:newGruppi }),
        };
        const res = await fetch(url, options)
        if (res.ok) {
            const data = await res.json()
            setUser(
                {...user, "gruppi":newGruppi}
            )            
        }
    }

    if(isLoading) return <LoaderComponent/>

    return (
        <>
            {user.gruppi.map((data, index) => {
                return <GroupPrivate data={data} key={index}
                    deleteFn={() => {deleteGroup(index)}}
                />
            })}
        </>
    );
}

