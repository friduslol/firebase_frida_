import { useEffect, useState } from "react"
import { fireStore } from "../firebase"
import { doc, onSnapshot } from "firebase/firestore"

export const useStreamDocument = (col, id) => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState()

    useEffect (() => {
		setLoading(true)
		setData(false)
        const unsubscribe = onSnapshot(doc(fireStore, col, id), (snapshot) => {
            if(snapshot.exists()) {
				setData(snapshot.data())
            	setLoading(false)
                return
            }

        },
        (error) => {
            console.log("e", error)
        })

        return () => unsubscribe()
        // eslint-disable-next-line
    }, [id])



    return {
        loading,
        data
    }
}

export default useStreamDocument
