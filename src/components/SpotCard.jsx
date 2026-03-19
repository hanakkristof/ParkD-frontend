import React, { useState } from 'react'

export const ParkingFloor=({ rows, columns, spots })=> {
  const [loading, setLoading] = useState(false)
    console.log(rows, columns, spots)
    return (
      <table>
        <tbody>
          {Array.from({ length: rows }, (_, rowIndex) => (
            <tr key={rowIndex}>
              {Array.from({ length: columns }, (_, colIndex) => {
                const spot = spots[rowIndex * columns + colIndex];
                return (
                  <td key={colIndex}>
                    {spot ? <button onClick={() => handleSpot(spot)}>{spot.id}</button> : null}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

