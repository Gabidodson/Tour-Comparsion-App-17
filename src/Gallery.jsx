import {useState, useEffect} from 'react'
import './Gallery.css'

const Gallery = () => {
    const [tours, setTours] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState (null)
    const [expandedTours, setExpandedTours]= useState({})

    useEffect(() => {
        fetchTours()
    }, [])

    const fetchTours = async () => {
        try {
            const response = await fetch('https://course-api.com/react-tours-project')
            if (!response.ok) {
                throw new Error ('Failed to grab tours')
            }
            const data = await response.json()
            setTours(data)
            setIsLoading(false)
        } catch (error) {
        setError(error.message)
        setIsLoading(false)
    }
}
const removeTour =(tourId)=> {
    setTours(tours.filter(tour => tour.id !== tourId))
}
const toggleDescription = (tourId) => {
    setExpandedTours(prev => ({
        ...prev,
        [tourId]: !prev[tourId]
    }))
}
if (isLoading) {
    return <div className="loading">Loading tours...</div>
}
if (error) {
    return <div className="error">Error: {error}</div>
}
if (tours.length === 0) {
    return(
        <div className="no-tours">
            <h2>No Tours Left</h2>
            <button className="refresh-button" onClick={fetchTours}>Refresh Tours</button>
        </div>
    )
}
return(
    <div className="tours-container">
        {tours.map((tour)=> (
            <div key = {tour.id} className="tour-card">
                <img src={tour.image} alt={tour.name}className="tour-image"/>
                <div className="tour-content">
                    <div className="tour-header">
                        <h3>{tour.name}</h3>
                        <p className="tour-price">${tour.price}</p>
                    </div>
                    <p className= "tour-description">
                        {expandedTours[tour.id]? tour.info :`${tour.info.substring(0,200)}...`}
                        <button
                        className="toggle-button"
                        onClick={()=> toggleDescription(tour.id)}
                        >
                            {expandedTours[tour.id]?'ShowLess':'Read more'}
                        </button>
                    </p>
                    <button
                    className="remove-button"
                    onClick={()=>removeTour(tour.id)}
                    >
                        Not Interested
                    </button>
                </div>
    </div>
        ))}
</div>
)
}
export default Gallery