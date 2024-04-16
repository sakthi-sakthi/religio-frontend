import Navbar from "./includes/Navbar";
import Sidemenubar from "./includes/Sidemenubar";
import Footer from "./includes/Footer";

import "./scss/style.scss";
import MemberdataEdit from "./pages/Memberdata/MemberdataEdit";

function Memberdataedit() {
    return (
        <div className="container-scroller">
            <Navbar />
            <div className="container-fluid page-body-wrapper">
            <Sidemenubar />
                <div className="main-panel">
                    <MemberdataEdit/>
                    <Footer/>
                </div>
            </div>
        </div>
    );
}

export default Memberdataedit;