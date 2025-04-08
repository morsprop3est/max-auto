export default function ReviewCard({ name, rating, comment, photo }) {
    return (
      <div style={{ border: '1px solid #ccc', padding: '10px', width: '30%' }}>
        <img src={photo} alt={name} style={{ width: '100%' }} />
        <h3>{name}</h3>
        <p>Rating: {rating}</p>
        <p>{comment}</p>
      </div>
    );
  }