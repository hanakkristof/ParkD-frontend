const FREE_IMAGE = "https://res.cloudinary.com/recipes2026/image/upload/q_auto/f_auto/v1776324722/N%C3%A9vtelen_ue7du4.png";
const TAKEN_IMAGE = "https://res.cloudinary.com/recipes2026/image/upload/q_auto/f_auto/v1776324722/N%C3%A9vtelen_ue7du4.png";

export const ParkingFloor = ({ rows, columns, spots, isAdmin }) => {
  if (!spots) return null;

  const handleUserClick = (spot) => {
    if (spot.free) {
    } else {
    }
  };

  return (
    <table>
      <tbody>
        {Array.from({ length: rows }, (_, rowIndex) => (
          <tr key={rowIndex}>
            {Array.from({ length: columns }, (_, colIndex) => {
              const spot = spots[rowIndex * columns + colIndex];
              return (
                <td key={colIndex}>
                  {spot ? (
                    <button onClick={() => isAdmin ? handleAdminClick(spot) : handleUserClick(spot)}>
                      <img
                        src={spot.free ? FREE_IMAGE : TAKEN_IMAGE}
                        alt={spot.id}
                        width={50}
                        height={50}
                      />
                    </button>
                  ) : null}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};