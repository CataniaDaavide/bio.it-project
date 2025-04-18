"use client"
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import LoaderComponent from './loader';
import { GroupPrivate } from './group';
import updateUser from '../utils/updateUser';

export default function GroupsCollector({ openModalFn }) {
    const { user, setUser, isLoading } = useContext(UserContext)

    if(!user) return <LoaderComponent/>

    const deleteGroup = async (index) => {

        const newGruppi = [...user.gruppi];
        newGruppi.splice(index, 1); // rimuovi il gruppo in posizione `index`

        const res = await updateUser({ email: user.email, gruppi: newGruppi })
        if (res.ok) {
            const data = await res.json()
            setUser({ ...data.user})
        }
    }

    if (isLoading) return <LoaderComponent />

    return (
        <>
            {user.gruppi.map((gruppo, index) => {
                return (
                    <GroupPrivate
                        key={gruppo.id}
                        idGruppo={gruppo.id}
                        deleteFn={() => { deleteGroup(index) }}
                        openModalFn={openModalFn}
                    />
                )
            })}
        </>
    );
}

