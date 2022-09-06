import { useState, useEffect } from "react"
// We usually dont export as default with custum hooks as 
// we want to be able to name them freely in other components
export const useFetch = (url) => { // Best practise: functions like this should be exported normally (not default)
    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => { // THIS func cannot be async ...
        const controller = new AbortController() // create controller to check if the fetch is aborted

        const fetchData = async () => { // But we can create an async func INSIDE the useEffect func
            setIsPending(true)

            try {
                const res = await fetch(url, { signal: controller.signal }) // fetch settings obj - connect fetch to the controller we created
                if (!res.ok) { // Request will return a response obj with different properties, ok, status, statusText etc.
                    throw new Error(res.statusText) // If ok: false we create an error here that will be passed to the 
                    // catch down below. If the response is not ok, it will not throw an error automatically, it will just
                    // break the component. We must manually create the error and pass it to the catch(err)
                }
                const json = await res.json()

                setIsPending(false) // Getting to this point means we got data
                setData(json)
                setError(null) // remove any err state if fetch successful
            } catch (err) {
                if (err.name === "AbortError") { // catches the special abort case error
                    console.log('Fetch was aborted')
                } else {
                    setIsPending(false) // No longer pending - not trying to load the data anymore
                    setError('Unable to fetch data') // What WE choose to call/describe the error
                    console.log(err.message) // built-in method .error - will reference the .statusText property above
                }
            }
        }

        fetchData() // We need to invoke the func we created - so it actually runs!

        return () => {
            controller.abort() // special method that cleans up and aborts the fetch if the component that uses it is unmounted
        }
    }, [url]) // Need the dependency to tell when the hoos should run

    return { data, isPending, error } // The hook has to return somehting. data is the same as data: data (key and value in one)
}                               // We also return the isPendiing state