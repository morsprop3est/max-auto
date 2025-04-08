export default function AboutUs({ component }) {
    const aboutUsData = Array.isArray(component)
      ? {
          title: component.find((item) => item.slug === 'about_us_h1')?.text || '',
          description: component.find((item) => item.slug === 'about_us_p1')?.text || '',
          image: component.find((item) => item.slug === 'about_us_h1')?.photoUrl || '',
        }
      : {};
  
    return (
      <div>
        <h1>{aboutUsData.title}</h1>
        <p>{aboutUsData.description}</p>
        {aboutUsData.image && <img src={aboutUsData.image} alt="About Us" />}
      </div>
    );
  }