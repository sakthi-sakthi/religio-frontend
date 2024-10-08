import Navbar from "./includes/Navbar";
import Sidemenubar from "./includes/Sidemenubar";
import Footer from "./includes/Footer";

import "./scss/style.scss";
import ProvinceView from "./pages/Province/ProvinceView";

function ProViewLayouts() {
    return (
        <div className="container-scroller">
            <Navbar />
            <div className="container-fluid page-body-wrapper">
            <Sidemenubar />
                <div className="main-panel">
                  <ProvinceView />
                    <Footer/>
                </div>
            </div>
        </div>
    );
}

export default ProViewLayouts;