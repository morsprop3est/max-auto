export default function Services({ component }) {
    if (!component) {
      return <div>No services available</div>;
    }
  
    const { services } = component;
  
    if (!services || !Array.isArray(services)) {
      return <div>No services available</div>;
    }
  
    return (
      <div>
        {services.map((service, index) => (
          <div key={index}>
            <h2>{service.title}</h2>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    );
  }