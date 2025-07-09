'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './FloatingSocial.module.scss';
import { socialLinks } from '@/data/socialLinks';

export default function FloatingSocial() {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleContactClick = () => {
    const contactSection = document.getElementById('contact-us');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const allLinks = [
    ...socialLinks,
    {
      name: "Contact",
      href: "#contact-us",
      icon: "mail.svg",
      alt: "Зв'язатися з нами",
      isContact: true
    }
  ];

  return (
    <div 
      className={`${styles.floatingContainer} ${isExpanded ? styles.expanded : ''}`}
    >
      <div className={`${styles.socialBlock} ${isExpanded ? styles.visible : ''}`}>
        {allLinks.map((item, index) => (
          <div
            key={index}
            className={styles.socialItem}
            style={{ 
              transitionDelay: isExpanded ? `${index * 100}ms` : `${(allLinks.length - index - 1) * 50}ms`
            }}
          >
            {item.isContact ? (
              <button 
                className={styles.iconWrapper}
                onClick={handleContactClick}
              >
                <Image
                  src={`/socialNetworkIcons/${item.icon}`}
                  alt={item.alt}
                  width={24}
                  height={24}
                />
              </button>
            ) : (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.iconWrapper}
              >
                <Image
                  src={`/socialNetworkIcons/${item.icon}`}
                  alt={item.alt}
                  width={24}
                  height={24}
                />
              </a>
            )}
          </div>
        ))}
      </div>

      <div className={styles.triggerButton} onClick={toggleExpanded}>
        <Image
          src="/scrollTop.svg"
          alt="Toggle menu"
          width={24}
          height={24}
          className={`${styles.triggerIcon} ${isExpanded ? styles.rotated : ''}`}
        />
      </div>
    </div>
  );
}
