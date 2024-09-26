import React from 'react';
import { useTranslation } from 'react-i18next';
import { Carousel } from 'react-bootstrap';

export default function FeatsCarousel() {
    const { t } = useTranslation();
    const feats = t('feats', { returnObjects: true });

    return (
        <Carousel>
            {feats.map((feat, index) => (
                <Carousel.Item key={index}>
                    <div className="feats-container">
                        <div className={`w-100 feat-h component-color-${index + 1} d-flex flex-column flex-md-row rounded-5 py-2 px-4 mb-4`}>
                            <div>
                                <img src={feat.image} alt={feat.title} className="feat-img-h" />
                            </div>
                            <div className="mx-4 p-lg-5">
                                <h1>{feat.title}</h1>
                                <p>{feat.content}</p>
                            </div>
                        </div>
                    </div>
                </Carousel.Item>
            ))}
        </Carousel>
    );
}
