export default function Stats({ component }) {
    const stats = component?.stats;
  
    if (!stats || !Array.isArray(stats)) return null;
  
    return (
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        {stats.slice(0, 4).map((stat, index) => (
          <div key={index}>
            <h3>{stat.value}</h3>
            <p>{stat.name}</p>
          </div>
        ))}
      </div>
    );
  }
  