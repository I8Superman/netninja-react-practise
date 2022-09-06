import { useState } from "react"
import { useFetch } from './hooks/useFetch'

export default function TripList() {
    // const [trips, setTrips] = useState([])
    const [url, setUrl] = useState('http://localhost:3000/trips') // Change the initial endpoint to something random to get an error
    const { data: trips, isPending, error } = useFetch(url) // We destructure the object from the useFetch hook and call the value something else (trips)

    // Fetch func as a const to make it reusable (instead of putting it directly in the useEffect hook)
    // Basically, is using a func as a dependency (in the useEffect hook), we must wrap it in a useCallback hook
    // useCallback makes sure that only 1 reference is created, instead of a new reference on every re-render
    // (even when the function hasn't changed)  

    // const fetchTrips = useCallback(async () => {
    //     const res = await fetch(url)
    //     const json = await res.json()
    //     setTrips(json)
    // }, [url]) // useCallback has its own dependency that tells it when to create a new version of itself

    // useEffect(() => {
    //     fetchTrips()
    //     return () => {
    //     }
    // }, [fetchTrips]) 
    // console.log(trips)

    return (
        <div>
            Trips here:
            {isPending && <h1>LOADING TRIPS ...</h1>}
            {error && <h1>{error}</h1>}
            {trips && trips.map((trip, index) => (
                <li key={index}>
                    <h3>{trip.title}</h3>
                    <p>{trip.price}</p>
                </li>
            ))}
            <button onClick={() => setUrl('http://localhost:3000/trips?loc=us')}>US trips</button>
            <button onClick={() => setUrl('http://localhost:3000/trips?loc=europe')}>European trips</button>
        </div>
    )
}
