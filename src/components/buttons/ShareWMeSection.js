import { useTranslation } from 'react-i18next';
import { Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function ShareWithMe() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/deck/share-with-me');
  };
  return (
    <div className='bg-dark p-4 rounded-3 w-100 w-lg-50 w-xl-25'>
      <Row className="d-flex flex-column">
        <Col className="d-flex align-items-start mb-2">
          <p className='h5'>{t('shareWithMe.title')}</p>
        </Col>
        <Col className="d-flex justify-content-end">
          <div 
          className='btn py-2 px-4 text-white border-2 border-light button-cus-1 rounded-3'
          onClick={handleButtonClick}
          >
            {t('shareWithMe.button')}
            </div>
        </Col>
      </Row>
    </div>
  );
}
