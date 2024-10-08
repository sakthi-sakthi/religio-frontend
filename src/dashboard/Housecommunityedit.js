import Navbar from "./includes/Navbar";
import Sidemenubar from "./includes/Sidemenubar";
import Footer from "./includes/Footer";

import "./scss/style.scss";

import HousecommunityEdit from "./pages/Housecommunity/HousecommunityEdit";

function Housecommunityedit() {
    return (
        <div className="container-scroller">
            <Navbar />
            <div className="container-fluid page-body-wrapper">
            <Sidemenubar />
                <div className="main-panel">
                    <HousecommunityEdit/>
                    <Footer/>
                </div>
            </div>
        </div>
    );
}

export default Housecommunityedit;