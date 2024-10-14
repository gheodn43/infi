import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faGoogle, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

export default function Footer() {
    const { t } = useTranslation();
    return (
        <footer className="d-flex flex-column justify-content-between position-relative p-md-2 bg-dark" style={{ padding: '20px 0' }}>
            <div className="container p-4 pb-0">
                <section>
                    <div className="row justify-content-between">
                        <div className="col-lg-3 col-xl-3 mx-auto mt-3">
                            <p className="text-secondary text-center text-lg-start">{t('feet.des')}</p>
                        </div>

                        <hr className="w-100 clearfix d-lg-none" />

                        <div className="col-lg-1 col-xl-2 mx-auto mt-3">
                            <h6 className="text-uppercase mb-4 fw-bold text-center text-lg-start">{t('feet.usefulLinks')}</h6>
                            <div className="d-flex flex-row flex-lg-column justify-content-center gap-5 gap-lg-0">
                                <div>
                                    <p><Link to="/" className="text-white text-decoration-none">Home</Link></p>
                                    <p><Link to="/deck/my-decks" className="text-white text-decoration-none">{t('feet.deck')}</Link></p>
                                </div>
                                <div>
                                    <p><Link to="/deck/share-with-me" className="text-white text-decoration-none">{t('feet.share')}</Link></p>
                                    <p><Link to="/guide" className="text-white text-decoration-none">{t('feet.guide')}</Link></p>
                                </div>
                            </div>
                        </div>

                        <hr className="w-100 clearfix d-lg-none" />

                        <div className="col-lg-3 col-xl-2 mx-auto mt-3">
                            <h6 className="text-uppercase mb-4 fw-bold text-center text-lg-start">{t('feet.contact')}</h6>
                            <div className="d-flex flex-column flex-md-row flex-lg-column justify-content-center gap-0 gap-md-5 gap-lg-0">
                            <p className="text-center text-lg-start"><i className="fas fa-envelope mr-3"></i> infiSRL2024@gmail.com</p>
                            <p className="text-center text-lg-start"><i className="fas fa-phone mr-3"></i> +84 79 498 2254</p>
                            </div>
                            <h6 className="text-uppercase mb-4 fw-bold text-center text-lg-start">{t('feet.company')}</h6>
                            <div className="d-flex flex-column flex-md-row flex-lg-column justify-content-center gap-0 gap-md-5 gap-lg-0">
                            <p className="text-center text-lg-start"><Link to="/" className="text-white text-decoration-none">{t('feet.termsAndConditions')}</Link></p>
                            <p className="text-center text-lg-start"><Link to="/" className="text-white text-decoration-none">{t('feet.privacyPolicy')}</Link></p>
                            </div>

                        </div>

                        <hr className="w-100 clearfix d-lg-none" />

                        <div className="col-lg-3 col-xl-3 mx-auto mt-3">
                            <h6 className="text-uppercase mb-4 fw-bold text-center text-lg-start">{t('feet.followUs')}</h6>
                            <div className="d-flex flex-column align-items-center">
                                <div className="d-flex justify-content-center mb-3">
                                    <a className="btn btn-outline-light btn-floating m-1" role="button" href="https://facebook.com">
                                        <FontAwesomeIcon icon={faFacebook} />
                                    </a>
                                    <a className="btn btn-outline-light btn-floating m-1" role="button" href="https://twitter.com">
                                        <FontAwesomeIcon icon={faTwitter} />
                                    </a>
                                    <a className="btn btn-outline-light btn-floating m-1" role="button" href="https://google.com">
                                        <FontAwesomeIcon icon={faGoogle} />
                                    </a>
                                    <a className="btn btn-outline-light btn-floating m-1" role="button" href="https://instagram.com">
                                        <FontAwesomeIcon icon={faInstagram} />
                                    </a>
                                </div>
                                <div className="position-relative w-100 mb-4">
                                    <label
                                        htmlFor="fb_email"
                                        className="position-absolute bg-dark label-cus"
                                    >
                                        Email
                                    </label>
                                    <input
                                        id="fb_email"
                                        type="text"
                                        placeholder={`Enter your email`}
                                        className="rounded-3 input-cus w-100"
                                    />
                                </div>

                                <div className="position-relative w-100 mb-4">
                                    <label
                                        htmlFor="fb_email"
                                        className="position-absolute bg-dark label-cus"
                                    >
                                        Feadback
                                    </label>
                                    <textarea
                                        id="fb_email"
                                        rows="4"
                                        placeholder={`Enter your Feedback`}
                                        className="rounded-3 input-cus w-100"
                                    />
                                </div>
                                <Button variant="contained" color="secondary" style={{ width: '100%', marginBottom: '20px' }}>
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