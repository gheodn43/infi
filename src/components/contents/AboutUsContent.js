import React from 'react';
import { useTranslation } from 'react-i18next';
import './AboutUs.css';
import AboutRoute from '../buttons/AboutRoute';
const AboutUsContent = () => {
  const { t } = useTranslation();
  const contentabout = t('content-about', { returnObjects: true });
  const introduceteam = t('introduce-team', { returnObjects: true });
  return (
    <div className="layout">
      <AboutRoute />
      <header className="header">
        <h1>{t('about.title')}</h1>
      </header>
      <main className="content">
        {contentabout.map((item, index) => {
          return (
            <section key={index} >
              <h2>{item.title}</h2>
              <p> {item.content.map((text, idx) => (
                <p key={idx}>{text}</p> // Tạo một <p> cho mỗi nội dung
              ))}</p>
            </section>
          );
        })}
      </main>
      <section className="team-section">
        <h1>{t('title-team.descriptions')}</h1>
        <div className="team-members" style={{ paddingTop: '30px' }}>
          {introduceteam.map((item, index) => {
            return ( // Thêm return để hiển thị thành viên
              <div className="team-member" key={index}>
                <img src={item.images} alt={`Member ${index + 1}`} className="avatar" />
                <h3>{item.name}</h3>
                <p>{item.role}</p>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
};

export default AboutUsContent;