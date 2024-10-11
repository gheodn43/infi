import HomeLink from "./HomeLink";
import AboutLink from "./AboutLink";

export default function AboutRoute() {

    return (
        <div className="px-lg-3 d-wrapper gap-3 bg-primary-cus rounded-1">
            <HomeLink />
            <span>/</span>
            <AboutLink />
        </div>
    );
}
