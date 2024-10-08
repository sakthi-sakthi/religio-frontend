import Navbar from "./includes/Navbar";
import Sidemenubar from "./includes/Sidemenubar";
import Footer from "./includes/Footer";

import "./scss/style.scss";

import IosdataEdit from "./pages/Ios/IosEdit";

function Iosedit() {
    return (
        <div className="container-scroller">
            <Navbar />
            <div className="container-fluid page-body-wrapper">
            <Sidemenubar />
                <div className="main-panel">
                    <IosdataEdit/>
                    <Footer/>
                </div>
            </div>
        </div>
    );
}

export default Iosedit;