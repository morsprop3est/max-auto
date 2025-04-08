export default function Main({ component }) {
    const mainData = Array.isArray(component)
      ? {
          title: component.find((item) => item.slug === 'main_h1')?.text || '',
          subtitle: component.find((item) => item.slug === 'main_h2')?.text || '',
          description: component.find((item) => item.slug === 'main_p1')?.text || '',
          buttonText: component.find((item) => item.slug === 'main_button')?.text || '',
        }
      : {};
  
    return (
      <div>
        <h1>{mainData.title}</h1>
        <h2>{mainData.subtitle}</h2>
        <p>{mainData.description}</p>
        <button>{mainData.buttonText}</button>
      </div>
    );
  }