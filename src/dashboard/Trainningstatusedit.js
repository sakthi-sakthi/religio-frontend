import Navbar from "./includes/Navbar";
import Sidemenubar from "./includes/Sidemenubar";

import Footer from "./includes/Footer";

import "./scss/style.scss";


import OnliedataEdit from "./pages/Trainningstatus/OnlineEdit";

function Onlineedit() {
    return (
        <div className="container-scroller">
            <Navbar />
            <div className="container-fluid page-body-wrapper">
            <Sidemenubar />
                <div className="main-panel">
                    <OnliedataEdit/>
                    <Footer/>
                </div>
            </div>
        </div>
    );
}

export default Onlineedit;