import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";

export default function Footer() {
    const { t } = useTranslation(); // Nếu bạn muốn sử dụng i18next cho đa ngôn ngữ
    return (
        <footer className="d-flex flex-column justify-content-between position-relative p-md-2 bg-dark" style={{ padding: '20px 0' }}>
            <div className="container p-4 pb-0">
                <section>
                    <div className="row justify-content-between">
                        <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3 d-none d-md-block">
                            <p>{t('feet.des')}</p>
                        </div>

                        <hr className="w-100 clearfix d-md-none" />

                        <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
                            <h6 className="text-uppercase mb-4 font-weight-bold">{t('feet.usefulLinks')}</h6>
                            <p><Link to="/" className="text-white text-decoration-none">Home</Link></p>
                            <p><Link to="/deck/my-decks" className="text-white text-decoration-none">{t('feet.deck')}</Link></p>
                            <p><Link to="/deck/share-with-me" className="text-white text-decoration-none">{t('feet.share')}</Link></p>
                            <p><Link to="/guide" className="text-white text-decoration-none">{t('feet.guide')}</Link></p>
                        </div>

                        <hr className="w-100 clearfix d-md-none" />

                        <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
                            <h6 className="text-uppercase mb-4 font-weight-bold">{t('feet.contact')}</h6>
                            <p><i className="fas fa-envelope mr-3"></i> info@gmail.com</p>
                            <p><i className="fas fa-phone mr-3"></i> +01 234 567 88</p>
                            <h6 className="text-uppercase mb-4 font-weight-bold">{t('feet.company')}</h6>
                            <p><Link to="/" className="text-white text-decoration-none">{t('feet.termsAndConditions')}</Link></p>
                            <p><Link to="/" className="text-white text-decoration-none">{t('feet.privacyPolicy')}</Link></p>

                        </div>

                        <hr className="w-100 clearfix d-md-none" />

                        <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
                            <h6 className="text-uppercase mb-4 font-weight-bold">{t('feet.followUs')}</h6>
                            <div className="d-flex flex-column align-items-center">
                                <div className="d-flex justify-content-center mb-3">
                                    <a className="btn btn-outline-light btn-floating m-1" role="button" href="https://facebook.com">
                                        <i className="fab fa-facebook-f"></i>
                                    </a>
                                    <a className="btn btn-outline-light btn-floating m-1" role="button" href="https://twitter.com">
                                        <i className="fab fa-twitter"></i>
                                    </a>
                                    <a className="btn btn-outline-light btn-floating m-1" role="button" href="https://google.com">
                                        <i className="fab fa-google"></i>
                                    </a>
                                    <a className="btn btn-outline-light btn-floating m-1" role="button" href="https://instagram.com">
                                        <i className="fab fa-instagram"></i>
                                    </a>
                                </div>

                                <TextField
                                    label="Email"
                                    color="primary"
                                    placeholder="Email"
                                    focused
                                    InputProps={{
                                        style: { color: 'white' },
                                    }}
                                    style={{ marginBottom: '5px', width: '100%' }}
                                />
                                 <TextField
                                    label="Feedback"
                                    color="primary"
                                    placeholder="Feedback"
                                    focused
                                    InputProps={{
                                        style: { color: 'white' },
                                    }}
                                    style={{ marginBottom: '5px', width: '100%' }}
                                />
                                <Button variant="contained" color="primary" style={{ width: '100%', marginBottom: '20px' }}>
                                    {t('feet.submit')}
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                <hr className="my-3" />

                <section className="p-3 pt-0">
                    <div className="text-center">
                        <div className="p-3">
                            © {new Date().getFullYear()} Copyright:
                            <a className="text-white" href="https://infi-navy.vercel.app/"> infi-navy.vercel.app</a>
                        </div>
                    </div>
                </section>
            </div>

            <div>
                <img src='/images/img-for-footer-1.svg' alt='footer of Infi' className="footer-img-1 position-absolute d-none d-lg-block" />
            </div>
        </footer>
    );
}