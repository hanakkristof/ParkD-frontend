import React from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router'

export const Garage = () => {
	const [parkoloHaz, setParkolohaz] = useState(null)
	const [loading, setLoading] = useState(false)
	const {id} = useParams()
	const navigate = useNavigate()
  return (
	<div className='floorPlan'>
	  Floor {id}
	  <div>
      <div className='recipesBase' style={{ minHeight: '100vh', padding: "20px", paddingTop:"40px", display: "flex", flexDirection: "column", justifySelf: "center" }}>
        <div className='recipesTitle'>
          {loading && <p>loading...</p>}
          {parkoloHaz && parkoloHaz.length > 0 && parkoloHaz.map(obj => <RecipeCard key={obj.id} {...obj} />)}
          {parkoloHaz && parkoloHaz.length == 0 && <h4>Nincsenek receptek feltöltve</h4>}
        </div>
        <button onClick={() => navigate("/addnew")} style={{ position: "fixed", bottom: "5px", right: "5px", }}>Új receptek feltöltése</button>
      </div>
    </div>
	</div>
  )
}

