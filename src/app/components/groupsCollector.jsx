"use client"
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import LoaderComponent from './loader';
import { Group, GroupPrivate } from './group';
import updateUser from '../utils/updateUser';

export default function GroupsCollector({ openModalFn }) {
    const { user, setUser, isLoading } = useContext(UserContext)

    const deleteGroup = async (index) => {

        const newGruppi = [...user.gruppi];
        newGruppi.splice(index, 1); // rimuovi il gruppo in posizione `index`

        const res = await updateUser({ email: user.email, gruppi: newGruppi })
        if (res.ok) {
            const data = await res.json()
            setUser({ ...data.user })
        }
    }

    if (isLoading) return <LoaderComponent />

    return (
        <>
            {user.gruppi.map((data, index) => {
                return (
                    <GroupPrivate
                        key={index}
                        data={data}
                        deleteFn={() => { deleteGroup(index) }}
                        openModalFn={openModalFn}
                    />
                )
            })}
        </>
    );
}

