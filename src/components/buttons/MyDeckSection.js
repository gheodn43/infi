import { useTranslation } from 'react-i18next';
import { Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function MyDecks() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/deck/my-decks');
  };

  return (
    <div className='infi-bg-dark infi-border p-4 rounded-3 w-100 w-lg-50 w-xl-25'>
      <Row className="d-flex flex-column">
        <Col className="d-flex align-items-start mb-2">
          <p className='h5'>{t('mydecks.title')}</p>
        </Col>
        <Col className="d-flex justify-content-end">
          <div 
            className='py-2 px-4 text-white infi-border infi-bg-gray rounded-3 cursor-pointer' 
            onClick={handleButtonClick}
          >
            {t('mydecks.button')}
          </div>
        </Col>
      </Row>
    </div>
  );
}
