import Navbar from "./includes/Navbar";
import Sidemenubar from "./includes/Sidemenubar";
import Footer from "./includes/Footer";
import "./scss/style.scss";
import ProvinceCreate from "./pages/Province/ProvinceCreate";

function ProaddLayouts() {
    return (
        <div className="container-scroller">
            <Navbar />
            <div className="container-fluid page-body-wrapper">
            <Sidemenubar />
                <div className="main-panel">
                    <ProvinceCreate />
                    <Footer/>
                </div>
            </div>
        </div>
    );
}

export default ProaddLayouts;