import React, { useContext } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MyUserContext } from '../context/MyUserProvider'
import { readParkolohazak } from '../myBackend'
import { useEffect } from 'react'
import MyCarousel from '../components/Carousel'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
	iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
	iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
	shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

const MapInvalidator = () => {
	const map = useMap()
	useEffect(() => {
		setTimeout(() => {
			map.invalidateSize()
		}, 100)
	}, [map])
	return null
}

export const HomePage = () => {
	const [hazak, setHazak] = useState([])
	const [loading, setLoading] = useState(false)
	const { user, authLoading, selectedHaz, setSelectedHaz } = useContext(MyUserContext)
	const navigate = useNavigate()
	const [value, setValue] = useState(0)
	const [pendingNavigate, setPendingNavigate] = useState(null)

	useEffect(() => {
		readParkolohazak(setHazak)
	}, [])

	
	const handleImageClick = (realId) => {
		const haz = hazak.find(h => h.id === realId)
		if (haz) setSelectedHaz(haz)
	}

	
	const handleNavigate = () => {
		const target = !user ? "/signin" : "/garage/" + selectedHaz.id
		setPendingNavigate(target)
		setSelectedHaz(null)  
	}

	useEffect(() => {
		if (pendingNavigate && !selectedHaz) {
			navigate(pendingNavigate)
			setPendingNavigate(null)
		}
	}, [selectedHaz, pendingNavigate])

	return (
		<div className='homeContainer'>
			<div className='banner'>
				<h1 className='homeh1'>Get ParkD</h1>
				<MyCarousel hazak={hazak} onImageClick={handleImageClick} />
			</div>

			
			{selectedHaz && (
				<div className="mapModalOverlay" onClick={() => setSelectedHaz(null)}>
					<div className="mapModalBox" onClick={e => e.stopPropagation()}>
						<button className="mapModalClose" onClick={() => setSelectedHaz(null)}>✕</button>
						<h3>{selectedHaz.name}</h3>
						<p>{selectedHaz.hely}</p>


						{selectedHaz.lat && selectedHaz.lng && (
							<MapContainer
								key={selectedHaz.id}
								center={[selectedHaz.lat, selectedHaz.lng]}
								zoom={15}
								style={{ height: "300px", width: "100%", borderRadius: "8px" }}
							>
								<TileLayer
									url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
									attribution='© OpenStreetMap contributors'
								/>
								<MapInvalidator />   
								<Marker position={[selectedHaz.lat, selectedHaz.lng]}>
									<Popup>{selectedHaz.name}</Popup>
								</Marker>
							</MapContainer>
						)}

						<div className="mapModalButtons">
							<button className="mapModalViewBtn" onClick={handleNavigate}>
								Megtekintés
							</button>
							<button className="mapModalCancelBtn" onClick={() => setSelectedHaz(null)}>
								Bezárás
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}